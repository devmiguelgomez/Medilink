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
  Box,
  MenuItem,
  Chip,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { toast } from 'react-toastify';

const MedicalRecords = () => {
  const { user } = useSelector((state) => state.auth);
  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    appointmentId: '',
    diagnosis: '',
    treatment: '',
    notes: '',
    followUpDate: null,
  });

  useEffect(() => {
    fetchRecords();
    if (user.role === 'doctor') {
      fetchCompletedAppointments();
    }
  }, []);

  const fetchRecords = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/medical-records`, config);
      setRecords(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching medical records:', error);
      toast.error(error.response?.data?.message || 'Error al cargar los registros médicos');
      setRecords([]);
    }
  };

  const fetchCompletedAppointments = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/appointments/completed`,
        config
      );
      setAppointments(response.data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Error al cargar las citas completadas');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      appointmentId: '',
      diagnosis: '',
      treatment: '',
      notes: '',
      followUpDate: null,
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
      followUpDate: newDate,
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

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/medical-records`,
        formData,
        config
      );

      if (response.data) {
        toast.success('Registro médico creado exitosamente');
        handleClose();
        fetchRecords();
        fetchCompletedAppointments();
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
    } catch (error) {
      console.error('Error creating medical record:', error);
      toast.error(error.response?.data?.message || 'Error al crear el registro médico');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Registros Médicos</Typography>
        {user.role === 'doctor' && (
          <Button variant="contained" onClick={handleOpen}>
            Crear Registro
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha de Cita</TableCell>
              <TableCell>Paciente</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Diagnóstico</TableCell>
              <TableCell>Tratamiento</TableCell>
              <TableCell>Notas</TableCell>
              <TableCell>Próxima Cita</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length > 0 ? (
              records.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>
                    {new Date(record.appointment?.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{record.patient?.name}</TableCell>
                  <TableCell>{record.doctor?.name}</TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>{record.treatment}</TableCell>
                  <TableCell>{record.notes}</TableCell>
                  <TableCell>
                    {record.followUpDate
                      ? new Date(record.followUpDate).toLocaleDateString()
                      : 'No programada'}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        record.status === 'active'
                          ? 'Activo'
                          : record.status === 'completed'
                          ? 'Completado'
                          : 'Cancelado'
                      }
                      color={
                        record.status === 'active'
                          ? 'primary'
                          : record.status === 'completed'
                          ? 'success'
                          : 'error'
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay registros médicos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Crear Registro Médico</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              select
              fullWidth
              label="Cita"
              name="appointmentId"
              value={formData.appointmentId}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              {appointments.map((appointment) => (
                <MenuItem key={appointment._id} value={appointment._id}>
                  {new Date(appointment.date).toLocaleString()} - {appointment.patient?.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Diagnóstico"
              name="diagnosis"
              multiline
              rows={2}
              value={formData.diagnosis}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Tratamiento"
              name="treatment"
              multiline
              rows={2}
              value={formData.treatment}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Notas"
              name="notes"
              multiline
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha de Seguimiento"
                value={formData.followUpDate}
                onChange={handleDateChange}
                slotProps={(params) => (
                  <TextField {...params} fullWidth />
                )}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MedicalRecords; 