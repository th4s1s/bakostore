import { FC } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Divider, ListItemButton, ListItemIcon,
  ListItemText, Popover, SvgIcon, Typography
} from '@mui/material';
import { RouterLink } from '../router-link';
import { useAuth } from '../../context/AuthContext';
import User03Icon from '@untitled-ui/icons-react/build/esm/User03';
import Container from '@untitled-ui/icons-react/build/esm/Container';
import { useNavigate } from 'react-router-dom';

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = ({ anchorEl, onClose, open, ...other }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    if (onClose) onClose(); 
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 200 } }}
      {...other}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">{user.name}</Typography>
        <Typography color="text.secondary" variant="body2">{user.username}</Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        <ListItemButton
          component={RouterLink}
          href="/profile"
          onClick={onClose}
          sx={{ borderRadius: 1, px: 1, py: 0.5 }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small"><User03Icon /></SvgIcon>
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">Hồ sơ</Typography>} />
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          href="/order"
          onClick={onClose}
          sx={{ borderRadius: 1, px: 1, py: 0.5 }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small"><Container /></SvgIcon>
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">Đơn hàng</Typography>} />
        </ListItemButton>
      </Box>
      <Divider sx={{ my: '0 !important' }} />
      <Box sx={{ display: 'flex', p: 1, justifyContent: 'center' }}>
        <Button
          color="inherit"
          onClick={handleLogout}
          size="small"
        >
          Đăng xuất
        </Button>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
