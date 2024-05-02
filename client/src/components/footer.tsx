import { Box, Typography, Link } from '@mui/material';
import { Instagram, Twitter, Facebook } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{
      backgroundColor: 'rgb(251, 207, 232)',
      color: '#333', 
      padding: '20px 0',
      marginTop: 'auto',
      textAlign: 'center'
    }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Bako Manga Store
      </Typography>
      <Typography variant="body2" sx={{ marginY: '10px' }}>
        Mua Manga/LN yêu thích của bạn tại nhà
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '10px'
      }}>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" sx={{ color: 'inherit' }}><Instagram /></Link>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" sx={{ color: 'inherit' }}><Twitter /></Link>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" sx={{ color: 'inherit' }}><Facebook /></Link>
      </Box>
      <Typography variant="body2">
        © 2024 Bako Manga Store. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
