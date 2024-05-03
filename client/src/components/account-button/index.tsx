import type { FC } from 'react';
import { Avatar, Box, ButtonBase } from '@mui/material';
import { usePopover } from '../../hooks/use-popover';
import { AccountPopover } from './account-popover';
import { useAuth } from '../../context/AuthContext';

export const AccountButton: FC = () => {
  const { user } = useAuth();
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
          // borderWidth: 2,
          // borderStyle: 'solid',
          // borderColor: 'divider',
          height: 60,
          width: 60,
          borderRadius: '50%'
        }}
      >
        <Avatar
          sx={{
            height: 60,
            width: 60
          }}
          src={user.avatar}
        >
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
