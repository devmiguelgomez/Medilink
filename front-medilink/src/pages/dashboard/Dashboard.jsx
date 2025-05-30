import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import {
  Event as EventIcon,
  MedicalServices as MedicalIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    appointments: 0,
    medicalRecords: 0,
    prescriptions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const requests = [
          axios.get(`${import.meta.env.VITE_API_URL}/api/appointments`, config),
          axios.get(`${import.meta.env.VITE_API_URL}/api/medical-records`, config),
        ];

        // Solo agregar la petición de prescripciones si el usuario no es paciente
        if (user.role !== 'patient') {
          requests.push(axios.get(`${import.meta.env.VITE_API_URL}/api/prescriptions`, config));
        }

        const responses = await Promise.all(requests);

        setStats({
          appointments: responses[0].data.length,
          medicalRecords: responses[1].data.length,
          prescriptions: user.role !== 'patient' ? responses[2].data.length : 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [user]);

  const StatCard = ({ title, value, icon }) => (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Box>
          <Box sx={{ color: 'primary.main' }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 4}}>
          <StatCard
            title="Appointments"
            value={stats.appointments}
            icon={<EventIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4}}>
          <StatCard
            title="Medical Records"
            value={stats.medicalRecords}
            icon={<MedicalIcon />}
          />
        </Grid>
        {user.role !== 'patient' && (
          <Grid size={{ xs: 12, sm: 6, md: 4}}>
            <StatCard
              title="Prescriptions"
              value={stats.prescriptions}
              icon={<DescriptionIcon />}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard; 