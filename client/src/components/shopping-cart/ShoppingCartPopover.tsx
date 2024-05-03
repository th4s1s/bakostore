import { Popover, Box, Typography, Button, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CartItem {
    pid: string;
    name: string;
    amount: number; 
    price: number;
    image: string;  
}

interface ShoppingCartPopoverProps {
    anchorEl: null | Element;
    onClose: () => void;
    open: boolean;
    items: CartItem[];
}

export const ShoppingCartPopover = ({ anchorEl, onClose, open, items }: ShoppingCartPopoverProps) => {
  const navigate = useNavigate();

  const viewCartDetails = () => {
    navigate('/cart');
    onClose();
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300, maxWidth: '100%' } }}
    >
      <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
        Giỏ hàng
      </Typography>
      <Divider />
      <List dense>
        {items.map(item => (
          <ListItem key={item.pid} sx={{ alignItems: 'center' }}>
            <ListItemIcon>
              <img src={item.image} alt={item.name} style={{ width: 50, height: 50, marginRight: 10 }} />
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              secondary={`${item.price.toLocaleString()}₫`}
              primaryTypographyProps={{ noWrap: true }}
              secondaryTypographyProps={{ noWrap: true, style: { fontSize: '1rem' } }}
            />
          </ListItem>
        ))}
      </List>
      {items.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Button onClick={viewCartDetails} color="secondary" variant="contained">
            Xem chi tiết
          </Button>
        </Box>
      )}
    </Popover>
  );
};
