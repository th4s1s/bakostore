import React from 'react';
import { ButtonBase, SvgIcon, Box, Avatar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { usePopover } from '../../hooks/use-popover';
import { ShoppingCartPopover } from './ShoppingCartPopover';
import { useCart } from '../../hooks/use-cart'; 
import { useAuth } from '../../context/AuthContext';


export const ShoppingCartButton: React.FC = () => {
  const { user } = useAuth(); 
  const { cartItems } = useCart(user?.username); // Corrected from items to cartItems
  const popover = usePopover<HTMLButtonElement>();

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'divider',
          height: 40,
          width: 40,
          borderRadius: '50%',
          overflow: 'hidden'
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32,
            backgroundColor: 'transparent'
          }}
        >
          <SvgIcon>
            <ShoppingCartIcon />
          </SvgIcon>
        </Avatar>
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
