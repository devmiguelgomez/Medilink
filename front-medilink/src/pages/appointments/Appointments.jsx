import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';

const Appointments = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctor: '',
    date: new Date(),
    reason: '',
    type: 'presencial',
  });

  useEffect(() => {
    fetchAppointments();
    if (user.role === 'patient') {
      fetchDoctors();
    }
  }, []);

  const fetchAppointments = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/appointments`, config);
      setAppointments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error(error.response?.data?.message || 'Error al cargar las citas');
      setAppointments([]);
    }
  };

  const fetchDoctors = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/doctors`, config);
      setDoctors(response.data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Error fetching doctors');
      setDoctors([]);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      doctor: '',
      date: new Date(),
      reason: '',
      type: 'presencial',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      date: newDate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const appointmentData = {
        doctorId: formData.doctor,
        date: formData.date,
        type: formData.type,
        reason: formData.reason
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/appointments/create`,
        appointmentData,
        config
      );

      if (response.data) {
        toast.success('Cita agendada exitosamente');
        handleClose();
        fetchAppointments();
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast.error(error.response?.data?.message || 'Error al agendar la cita');
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/appointments/${appointmentId}/cancel`,
        {},
        config
      );

      if (response.data) {
        toast.success('Cita cancelada exitosamente');
        fetchAppointments();
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
      toast.error(error.response?.data?.message || 'Error al cancelar la cita');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Citas Médicas</Typography>
        {user.role === 'patient' && (
          <Button variant="contained" onClick={handleOpen}>
            Agendar Cita
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Paciente</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Motivo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>
                    {new Date(appointment.date).toLocaleString()}
                  </TableCell>
                  <TableCell>{appointment.patient?.name}</TableCell>
                  <TableCell>{appointment.doctor?.name}</TableCell>
                  <TableCell>
                    {appointment.type === 'presencial' ? 'Presencial' : 'Remota'}
                  </TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        appointment.status === 'pendiente'
                          ? 'Pendiente'
                          : appointment.status === 'confirmada'
                          ? 'Confirmada'
                          : appointment.status === 'completada'
                          ? 'Completada'
                          : 'Cancelada'
                      }
                      color={
                        appointment.status === 'pendiente'
                          ? 'warning'
                          : appointment.status === 'confirmada'
                          ? 'info'
                          : appointment.status === 'completada'
                          ? 'success'
                          : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {appointment.status !== 'cancelada' && (
                      <IconButton
                        onClick={() => handleCancel(appointment._id)}
                        disabled={appointment.status === 'completada'}
                      >
                        <CancelIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No hay citas programadas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agendar Nueva Cita</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              select
              fullWidth
              label="Doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor._id} value={doctor._id}>
                  {doctor.name} - {doctor.specialty}
                </MenuItem>
              ))}
            </TextField>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Fecha y Hora"
                value={formData.date}
                onChange={handleDateChange}
                slotProps={(params) => (
                  <TextField {...params} fullWidth sx={{ mb: 2 }} />
                )}
              />
            </LocalizationProvider>

            <TextField
              select
              fullWidth
              label="Tipo de Consulta"
              name="type"
              value={formData.type}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value="presencial">Presencial</MenuItem>
              <MenuItem value="remota">Remota</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Motivo de la Consulta"
              name="reason"
              multiline
              rows={4}
              value={formData.reason}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Agendar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Appointments; 