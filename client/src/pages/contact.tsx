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
                Liên Hệ Chúng Tôi
              </Typography>
            </Stack>
            <div className="flex justify-center items-center">
          <img src="/contact.png" alt="contact" className="w-3/4 h-auto" />
            </div>              
            <Typography
              sx={{ mb: 3, mt: 3 }}
              variant="h6"
              style={{ color: '#333' }} // Soft black for body text
            >
              Nếu có thắc mắc nào hãy điền vào form kế bên, chúng tôi sẽ trả lời bạn trong thời gian sớm nhất.
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
              Điền vào form bên dưới
            </Typography>
            <ContactForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
