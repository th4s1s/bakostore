import { FC, FormEvent, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  OutlinedInput,
  Unstable_Grid2 as Grid,
  CssBaseline
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f06ec2' //
    }
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#f06ec2'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f06ec2'
          }
        }
      }
    }
  }
});

export const ContactForm: FC = () => {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
    },
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent baseline styles */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel>Họ Và Tên *</FormLabel>
              <OutlinedInput name="name" required />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel>Email *</FormLabel>
              <OutlinedInput name="email" type="email" required />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl fullWidth>
              <FormLabel>Chủ Đề *</FormLabel>
              <OutlinedInput name="subject" required />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl fullWidth>
              <FormLabel>Tin Nhắn *</FormLabel>
              <OutlinedInput name="message" required multiline rows={6} />
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
        variant="contained"
        sx={{
          backgroundColor: '#ff77aa', 
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
          '&:hover': {
            backgroundColor: '#ff99cc', 
          },
          borderRadius: '20px', 
          padding: '10px 20px', 
          fontSize: '16px' 
        }}
      >
    Gửi Tin Nhắn
    </Button>
        </Box>
      </form>
    </ThemeProvider>
  );
};
