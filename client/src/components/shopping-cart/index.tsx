import React, { useEffect } from 'react';
import { ButtonBase, Box, Typography, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { usePopover } from '../../hooks/use-popover';
import { ShoppingCartPopover } from './ShoppingCartPopover';
import { useCartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { pink } from '@mui/material/colors';


export const ShoppingCartButton: React.FC = () => {
  const { user } = useAuth(); 
  const { cartItems, refreshCart } = useCartContext();
  const popover = usePopover<HTMLButtonElement>();
  const totalItems = cartItems.reduce((acc, item) => acc + item.amount, 0);

  useEffect(() => {
    if (user?.username) {
      refreshCart();
    }
  }, [user?.username, refreshCart]);

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column', 
          height: 85,
          width: 85,
          borderRadius: '50%',
          overflow: 'hidden',
          color: pink[300],  // Setting the icon color to pink
          '&:hover': {    // Optional: change color on hover
            color: 'deepPink',
          }
        }}
      >
        <Badge badgeContent={totalItems} color="error">
        <ShoppingCartIcon sx={{ fontSize: 42 }} />   
        {/* <Typography>Giỏ hàng</Typography>    */}
        </Badge>
      </Box>
      <ShoppingCartPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
        items={cartItems}
      />
    </>
  );
};
