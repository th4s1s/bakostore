import React, { useState } from 'react';

import { Card, CardMedia, CardContent, Typography, Pagination, Box, Rating } from '@mui/material';
import { pink } from '@mui/material/colors';

const products = [
  { id: 1, name: 'Hành Trình Của Elaina - Tập 1', description: 'Mô tả gì đó', price: '100000 VND', image: 'https://upload.wikimedia.org/wikipedia/vi/9/9b/Hanh_trinh_cua_Elaina_quyen_1.png', rating: 3.5, type: 'novel'},
  { id: 2, name: 'Hành Trình Của Elaina - Tập 2', description: 'This is product 2', price: '200000 VND', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ljV_EpQefXyXZXJSFd0aFZD1EcZGnJkCqysNSUTL1w&s', rating: 4.6, type: "novel"},
  { id: 2, name: 'Hành Trình Của Elaina - Tập 2', description: 'This is product 2', price: '200000 VND', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ljV_EpQefXyXZXJSFd0aFZD1EcZGnJkCqysNSUTL1w&s', rating: 5, type: "novel"},
];

const itemsPerPage = 8;

const Shop: React.FC = () => {
    const [page, setPage] = useState(1);
    const pageCount = Math.ceil(products.length / itemsPerPage);
    const itemsOffset = (page - 1) * itemsPerPage;
    const endOffset = itemsOffset + itemsPerPage;
    const currentItems = products.slice(itemsOffset, endOffset);
    return (
      <Box sx={{ backgroundColor: pink[50], py: 8, minHeight: '100vh' }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center" color={pink[300]}>
          Truyện mới cập nhật
        </Typography>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4 }}>
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
                    {product.price}
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
            color="primary"
          />
        </Box>
      </Box>
    );
  };
 
  export default Shop;
  
