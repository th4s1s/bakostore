import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Pagination, Box, Rating } from '@mui/material';
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


const itemsPerPage = 15;

const Shop: React.FC = () => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      fetch('/api/server/product/list.php')
        .then(response => response.json())
        .then(data => {
          const updatedProducts = data.map((product: Product) => ({
            ...product,
            rating: product.rating === null ? 0 : product.rating
          }));
          setProducts(updatedProducts);
        });
    }, []);
    

    const pageCount = Math.ceil(products.length / itemsPerPage);
    const itemsOffset = (page - 1) * itemsPerPage;
    const endOffset = itemsOffset + itemsPerPage;
    const currentItems = products.slice(itemsOffset, endOffset);
    return (
      <Box sx={{ backgroundColor: pink[50], py: 8, minHeight: '100vh' }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center" color={pink[300]}>
          Truyện mới cập nhật
        </Typography>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, mt: '50px' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 2 }}>
            {currentItems.map((product) => (
              <Card key={product.id} sx={{ transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 }, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontWeight: 'medium', color: pink[600] }}>
                    {product.name}
                  </Typography>
                  <Typography component="div" sx={{ fontWeight: 'bold', color: pink[400] }}>
                    {product.price} đ
                  </Typography>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                  <Rating
                    readOnly
                    value={product.rating}
                    precision={0.1}
                    max={5}
                />                  
                 </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
            color="secondary"
          />
        </Box>
      </Box>
    );
  };
 
  export default Shop;
  
