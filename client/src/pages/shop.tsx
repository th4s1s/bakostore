import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, Rating, Grid, Pagination } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { pink } from '@mui/material/colors';

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
  const [value, setValue] = useState('manga');  // Default tab set to 'manga'
  const navigate = useNavigate();
  const [mangaPage, setMangaPage] = useState(1);
  const [novelPage, setNovelPage] = useState(1);
  const itemsPerPage = 15;  // Adjust number of items per page as needed

  const filteredMangaProducts = products.filter(product => product.type === 'manga');
  const filteredNovelProducts = products.filter(product => product.type === 'novel');

  const countMangaPages = Math.ceil(filteredMangaProducts.length / itemsPerPage);
  const countNovelPages = Math.ceil(filteredNovelProducts.length / itemsPerPage);

  // Calculate current items for each tab
  const currentMangaItems = filteredMangaProducts.slice((mangaPage - 1) * itemsPerPage, mangaPage * itemsPerPage);
  const currentNovelItems = filteredNovelProducts.slice((novelPage - 1) * itemsPerPage, novelPage * itemsPerPage);

  useEffect(() => {
    fetch('/api/product/list.php')
      .then(response => response.json())
      .then(data => {
        const updatedProducts = data.map((product: Product) => ({
          ...product,
          rating: product.rating === null ? 0 : product.rating
        }));
        setProducts(updatedProducts);
      });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleCardClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleMangaPageChange = (event, value) => {
    setMangaPage(value);
  };
  
  const handleNovelPageChange = (event, value) => {
    setNovelPage(value);
  };
  

  return (
    <Box sx={{ backgroundColor: pink[50], py: 8, minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center" color={pink[300]}>
        Truyện mới cập nhật
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <TabList onChange={handleChange} aria-label="product category tabs">
            <Tab label="Manga" value="manga" />
            <Tab label="Novel" value="novel" />
          </TabList>
        </Box>
        <TabPanel value="manga">
      <Grid container spacing={2}>
        {currentMangaItems.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
                <Card onClick={() => handleCardClick(product.id)} sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 }, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 'medium', color: pink[600] }}>
                      {product.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', color: pink[400] }}>
                      {product.price} đ
                    </Typography>
                    <Rating
                      readOnly
                      value={product.rating}
                      precision={0.1}
                      max={5}
                    />
                  </CardContent>
                </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={countMangaPages}
        page={mangaPage}
        onChange={handleMangaPageChange}
        color="primary"
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />
    </TabPanel>
    <TabPanel value="novel">
      <Grid container spacing={2}>
        {currentNovelItems.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
                <Card onClick={() => handleCardClick(product.id)} sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 }, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 'medium', color: pink[600] }}>
                      {product.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', color: pink[400] }}>
                      {product.price} đ
                    </Typography>
                    <Rating
                      readOnly
                      value={product.rating}
                      precision={0.1}
                      max={5}
                    />
                  </CardContent>
                </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={countNovelPages}
        page={novelPage}
        onChange={handleNovelPageChange}
        color="primary"
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />
    </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Shop;
