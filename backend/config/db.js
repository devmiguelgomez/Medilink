const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Verificar que MONGO_URI esté definido para evitar errores innecesarios
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI no está definida en las variables de entorno');
      if (process.env.NODE_ENV === 'production') {
        // En producción, registramos sin detener
        return;
      } else {
        // En desarrollo, detenemos el proceso
        process.exit(1);
      }
    }
    
    // Configuración básica para conectar a MongoDB Atlas
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    
    // En producción, registramos el error pero continuamos
    if (process.env.NODE_ENV === 'production') {
      console.error('Error completo de MongoDB:', error);
    } else {
      // En desarrollo, detenemos el proceso
      process.exit(1);
    }
  }
};

module.exports = connectDB;