import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  IconButton,
  Grid,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const Prescriptions = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
    instructions: '',
  });

  useEffect(() => {
    // Verificar si el usuario tiene permiso para ver prescripciones
    if (user.role === 'patient') {
      toast.error('No tienes permiso para acceder a esta sección');
      navigate('/dashboard');
      return;
    }
    fetchPrescriptions();
  }, [user, navigate]);

  const fetchPrescriptions = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/prescriptions`,
        config
      );
      setPrescriptions(response.data || []);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      toast.error('Error al cargar las prescripciones');
      setPrescriptions([]);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
      instructions: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      medications: updatedMedications,
    });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        { name: '', dosage: '', frequency: '', duration: '' },
      ],
    });
  };

  const removeMedication = (index) => {
    const updatedMedications = formData.medications.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      medications: updatedMedications,
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

      const prescriptionData = {
        ...formData,
        patientId: user._id,
        instructions: formData.instructions || 'Sin instrucciones específicas'
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/prescriptions`,
        prescriptionData,
        config
      );

      if (response.data) {
        toast.success('Prescripción creada exitosamente');
        handleClose();
        fetchPrescriptions();
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
    } catch (error) {
      console.error('Error creating prescription:', error);
      toast.error(error.response?.data?.message || 'Error al crear la prescripción');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Prescripciones Médicas</Typography>
        {user.role === 'doctor' && (
          <Button variant="contained" onClick={handleOpen}>
            Nueva Prescripción
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Doctor</TableCell>
              {user.role === 'admin' && <TableCell>Paciente</TableCell>}
              <TableCell>Medicamentos</TableCell>
              <TableCell>Instrucciones</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptions.length > 0 ? (
              prescriptions.map((prescription) => (
                <TableRow key={prescription._id}>
                  <TableCell>
                    {new Date(prescription.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {prescription.doctor?.name || 'No doctor asignado'}
                  </TableCell>
                  {user.role === 'admin' && (
                    <TableCell>{prescription.patient?.name || 'Paciente no disponible'}</TableCell>
                  )}
                  <TableCell>
                    {prescription.medications.map((med, index) => (
                      <div key={index}>
                        {med.name} - {med.dosage} - {med.frequency} - {med.duration}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{prescription.instructions}</TableCell>
                  <TableCell>{prescription.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={user.role === 'admin' ? 6 : 5} align="center">
                  No hay prescripciones disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Nueva Prescripción</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            {formData.medications.map((medication, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1">Medicamento {index + 1}</Typography>
                  {index > 0 && (
                    <IconButton
                      color="error"
                      onClick={() => removeMedication(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
                <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6}}>
                    <TextField
                      fullWidth
                      label="Nombre del Medicamento"
                      value={medication.name}
                      onChange={(e) =>
                        handleMedicationChange(index, 'name', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid size={{xs: 12, sm: 6}}>
                    <TextField
                      fullWidth
                      label="Dosis"
                      value={medication.dosage}
                      onChange={(e) =>
                        handleMedicationChange(index, 'dosage', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid size={{xs: 12, sm: 6}}>
                    <TextField
                      fullWidth
                      label="Frecuencia"
                      value={medication.frequency}
                      onChange={(e) =>
                        handleMedicationChange(index, 'frequency', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid size={{xs: 12, sm: 6}}>
                    <TextField
                      fullWidth
                      label="Duración"
                      value={medication.duration}
                      onChange={(e) =>
                        handleMedicationChange(index, 'duration', e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addMedication}
              sx={{ mb: 2 }}
            >
              Agregar Medicamento
            </Button>
            <TextField
              fullWidth
              label="Instrucciones"
              name="instructions"
              multiline
              rows={4}
              value={formData.instructions}
              onChange={handleChange}
            />
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

export default Prescriptions; 