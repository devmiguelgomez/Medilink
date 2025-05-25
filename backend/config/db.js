const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Ya no son necesarias estas opciones en versiones recientes de Mongoose
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    
    // En producción, registramos el error pero no detenemos el servidor
    if (process.env.NODE_ENV === 'production') {
      console.error('Error completo:', error);
    } else {
      // En desarrollo, detenemos el proceso
      process.exit(1);
    }
  }
};

module.exports = connectDB;