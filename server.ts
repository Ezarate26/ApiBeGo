require('dotenv').config()
import express, { Express } from 'express';
import routesAuth from './routes/routesAuth';
import routesOrder from './routes/routesOrder'
import routesDelivery from './routes/routesDelivery'
import authMiddleware from './middlewares/authMiddleware';
import mongoose from 'mongoose';


const app: Express = express();

// Configuración del middleware
app.use(express.json());

// Configuración de las rutas
app.use('/api', routesAuth);

app.use('/orders', authMiddleware, routesOrder)

app.use('/routes', authMiddleware, routesDelivery)

const dbUrl = process.env.MONGODB_URL;

mongoose.connect(dbUrl!)
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    // Iniciar el servidor Express
    app.listen(3000, () => {
      console.log('Servidor en funcionamiento en el puerto 3000');
    });
  
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });




