import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  Event as EventIcon,
  MedicalServices as MedicalIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      title: 'Easy Appointment Scheduling',
      description:
        'Book your medical appointments online with our user-friendly scheduling system.',
      icon: <EventIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Digital Medical Records',
      description:
        'Access your complete medical history and records securely online.',
      icon: <MedicalIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Electronic Prescriptions',
      description:
        'Receive and manage your prescriptions digitally with our secure system.',
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6}}>
              <Typography variant="h2" component="h1" gutterBottom>
                Welcome to MediLink
              </Typography>
              <Typography variant="h5" paragraph>
                Your comprehensive healthcare management platform
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ mr: 2 }}
                >
                  Get Started
                </Button>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  color="inherit"
                  size="large"
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
              <Box
                component="img"
                src="/medical-illustration.svg"
                alt="Medical Illustration"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Our Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4}} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              bgcolor: 'primary.main',
              color: 'white',
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" paragraph>
              Join thousands of patients and healthcare providers using MediLink
            </Typography>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="secondary"
              size="large"
            >
              Create Your Account
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 