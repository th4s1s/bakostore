import Mail01Icon from '@untitled-ui/icons-react/build/esm/Mail01';
import { Avatar, Box, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { ContactForm } from '../components/contact-form';

const Contact: React.FC = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(2, 1fr)',
            xs: 'repeat(1, 1fr)'
          },
          flexGrow: 1,
          backgroundColor: '#f9f1f1',
        }}
      >
        <Box>
          <Container
            maxWidth="md"
            sx={{ pl: { lg: 15 }, color: '#f06ec2' }} // Using a vivid pink for text
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                mb: 6,
                mt: 8
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: '#fabea7', // Light coral for icons
                  color: 'primary.contrastText'
                }}
                variant="rounded"
              >
                <SvgIcon>
                  <Mail01Icon />
                </SvgIcon>
              </Avatar>
              <Typography variant="overline" style={{ color: '#ff79b0' }}> 
                Contact us
              </Typography>
            </Stack>
            <Typography
              sx={{ mb: 3 }}
              variant="h1"
              style={{ color: '#6a1b9a' }} // Deep purple for major headings
            >
              Have a question for us?
            </Typography>
            <Typography
              sx={{ mb: 3 }}
              variant="body1"
              style={{ color: '#333' }} // Soft black for body text
            >
              Have question about our manga or LN? Feel free to contact us. We will get back to you as soon as possible.
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              gap={4}
              sx={{
                color: 'text.primary',
                '& > *': {
                  flex: '0 0 auto'
                }
              }}
            >
            </Stack>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: '#fce4ec', // Pale pink, complementing the overall theme
            px: 6,
            py: 15
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15
              }
            }}
          >
            <Typography
              sx={{ pb: 3 }}
              variant="h6"
              style={{ color: '#f48fb1' }} // Lighter pink for secondary text
            >
              Fill the form below
            </Typography>
            <ContactForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
