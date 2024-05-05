/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, TextField, CardMedia, CardContent, Typography, Box, Rating, Grid, Pagination, CircularProgress } from '@mui/material';
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


const CustomSearch = styled(TextField)({
  '& label.Mui-focused': {
    color: 'pink',  // Soft pink color for focus
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'pink',  // Soft pink border for focus
    },
    '&:hover fieldset': {
      borderColor: 'lightpink',  // Lighter pink on hover
    },
    '& fieldset': {
      borderRadius: 15, // Rounded corners for a soft look
      borderColor: 'lightpink',
    },
    '& input': {
      color: '#ff69b4', // Text color
    }
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 14px', // Padding for a plump look
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: '#ff69b4',  // Icon color
  }
});



const Shop: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialMangaPage = Number(queryParams.get('mangaPage')) || 1;
  const initialNovelPage = Number(queryParams.get('novelPage')) || 1;
  const initialActiveTab = queryParams.has('mangaPage') ? 'manga' : 'novel';
  const [products, setProducts] = useState<Product[]>([]);
  const [value, setValue] = useState(initialActiveTab);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  // State to track loading data
  const [mangaPage, setMangaPage] = useState(initialMangaPage);
  const [novelPage, setNovelPage] = useState(initialNovelPage);
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [mangaSearch, setMangaSearch] = useState('');
  const [novelSearch, setNovelSearch] = useState('');
  const itemsPerPage = 15;

  
  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };
  
  const filteredMangaProducts = products.filter(product => 
    product.type === 'manga' && normalizeText(product.name).includes(normalizeText(mangaSearch))
  );
  
  const filteredNovelProducts = products.filter(product =>
    product.type === 'novel' && normalizeText(product.name).includes(normalizeText(novelSearch))
  );
    
  const countMangaPages = Math.ceil(filteredMangaProducts.length / itemsPerPage);
  const countNovelPages = Math.ceil(filteredNovelProducts.length / itemsPerPage);
  
  const currentMangaItems = filteredMangaProducts.slice((mangaPage - 1) * itemsPerPage, mangaPage * itemsPerPage);
  const currentNovelItems = filteredNovelProducts.slice((novelPage - 1) * itemsPerPage, novelPage * itemsPerPage);


  useEffect(() => {
    setMangaPage(1);
  }, [mangaSearch]);
  
  useEffect(() => {
    setNovelPage(1);
  }, [novelSearch]);
  
  
  useEffect(() => {
    setLoading(true); 
    fetch('https://bakobackend.azurewebsites.net/product/list.php')
      .then(response => response.json())
      .then(data => {
        setProducts(data.map((product: Product) => ({
          ...product,
          rating: product.rating || 0
        })));
        setLoading(false); 
      });
  }, []);

useEffect(() => {
  if (activeTab === 'manga') {
    navigate(`?mangaPage=${mangaPage}`);
  } else if (activeTab === 'novel') {
    navigate(`?novelPage=${novelPage}`);
  }
}, [mangaPage, novelPage, activeTab, navigate]);





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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has('mangaPage')) {
      setActiveTab('manga');
    } else if (queryParams.has('novelPage')) {
      setActiveTab('novel');
    }
  }, [location.search]);

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
            <CustomTab onClick={() => setActiveTab('manga')} label="Manga" value="manga" />
            <CustomTab onClick={() => setActiveTab('novel')} label="Novel" value="novel" />
          </TabList>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
            <CircularProgress />  {/* Loading spinner */}
          </Box>
        ) : (
          <>

        <TabPanel value="manga">
        <Box sx={{ marginBottom: 2 }}>
          <CustomSearch
            fullWidth
            label="Tìm Manga"
            variant="outlined"
            value={mangaSearch}
            onChange={(e) => setMangaSearch(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>
              {currentMangaItems.length > 0 ? (
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
           ) : (
            <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 4 }}>
              Không tìm thấy kết quả
            </Typography>
          )}
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
        <Box sx={{ marginBottom: 2 }}>
          <CustomSearch
            fullWidth
            label="Tìm Novel"
            variant="outlined"
            value={novelSearch}
            onChange={(e) => setNovelSearch(e.target.value)}
            sx={{ mb: 2 }}
            />
          </Box>
          {currentNovelItems.length > 0 ? (
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
            ) : (
          <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 4 }}>
            Không tìm thấy kết quả
          </Typography>
        )}
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
        </>
        )}
      </TabContext>
    </Box>
  );
};

export default Shop;
