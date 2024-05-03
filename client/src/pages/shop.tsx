import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, Rating, Grid, Pagination } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { pink } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const CustomCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  borderRadius: theme.spacing(2),
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10]
  },
  display: 'flex', 
  flexDirection: 'column', 
  height: '100%',
  justifyContent: 'space-between'
}));

const CustomCardContent = styled(CardContent)({
  flex: '1 0 auto', // Takes up only necessary space, pushing the price and rating to the bottom
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});



const CustomTab = styled(Tab)(({ theme }) => ({
  fontWeight: 600,
  color: pink[300],
  '&.Mui-selected': {
    color: pink[600],
    fontWeight: 'bold',
  },
}));

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  type: string;
  rating: number;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [value, setValue] = useState('manga');
  const navigate = useNavigate();
  const [mangaPage, setMangaPage] = useState(1);
  const [novelPage, setNovelPage] = useState(1);
  const itemsPerPage = 15;

  const filteredMangaProducts = products.filter(product => product.type === 'manga');
  const filteredNovelProducts = products.filter(product => product.type === 'novel');

  const countMangaPages = Math.ceil(filteredMangaProducts.length / itemsPerPage);
  const countNovelPages = Math.ceil(filteredNovelProducts.length / itemsPerPage);

  const currentMangaItems = filteredMangaProducts.slice((mangaPage - 1) * itemsPerPage, mangaPage * itemsPerPage);
  const currentNovelItems = filteredNovelProducts.slice((novelPage - 1) * itemsPerPage, novelPage * itemsPerPage);


  useEffect(() => {
    fetch('/api/product/list.php')
      .then(response => response.json())
      .then(data => setProducts(data.map((product: Product) => ({
        ...product,
        rating: product.rating || 0
      }))));
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleCardClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleMangaPageChange = (event: any, value: number) => {
    setMangaPage(value);
    window.scrollTo(0, 0);

  };

  const handleNovelPageChange = (event: any, value: number) => {
    setNovelPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ bgcolor: pink[50], py: 8, minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom textAlign="center" color={pink[300]} sx={{ fontWeight: 'bold' }}>
        Truyện mới cập nhật
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <TabList onChange={handleChange} aria-label="product category tabs" textColor="inherit" indicatorColor="secondary">
            <CustomTab label="Manga" value="manga" />
            <CustomTab label="Novel" value="novel" />
          </TabList>
        </Box>
        <TabPanel value="manga">
          <Grid container spacing={2}>
            {currentMangaItems.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
                <CustomCard onClick={() => handleCardClick(product.id)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ borderRadius: 2 }}
                  />
                  <CustomCardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'medium', color: pink[800] }}>
                      {product.name}
                    </Typography>
                    <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="h5" color="error">
                      {product.price.toLocaleString()}đ
                    </Typography>
                    <Rating readOnly value={product.rating} precision={0.1} size="medium" />
                  </Box>
                  </CustomCardContent>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={countMangaPages}
            page={mangaPage}
            onChange={handleMangaPageChange}
            color="primary"
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'center',
              '& .MuiPaginationItem-page.Mui-selected': {
                backgroundColor: '#FFB6C1',
                color: '#FFFFFF',
              },
              '& .MuiPaginationItem-page:hover': {
                backgroundColor: '#FF69B4', 
                color: '#FFFFFF', 
              }
            }}          
            />
        </TabPanel>
        <TabPanel value="novel">
          <Grid container spacing={2}>
            {currentNovelItems.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
                <CustomCard onClick={() => handleCardClick(product.id)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ borderRadius: 2 }}
                  />
                  <CustomCardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'medium', color: pink[800] }}>
                      {product.name}
                    </Typography>
                    <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="h5" color="error">
                      {product.price.toLocaleString()}đ
                    </Typography>
                    <Rating readOnly value={product.rating} precision={0.1} size="medium" />
                  </Box>
                  </CustomCardContent>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={countNovelPages}
            page={novelPage}
            onChange={handleNovelPageChange}
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'center',
              '& .MuiPaginationItem-page.Mui-selected': {
                backgroundColor: '#FFB6C1',
                color: '#FFFFFF',
              },
              '& .MuiPaginationItem-page:hover': {
                backgroundColor: '#FF69B4', 
                color: '#FFFFFF', 
              }
            }}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Shop;
