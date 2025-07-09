// backend/src/index.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// Rutas
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';


// Middleware
import { protect } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
  })
  .then(() => {
    console.log('✔️ MongoDB conectado');
    
    // Rutas de autenticación (login / logout)
    app.use('/api/auth', authRoutes);
    
    // Rutas de usuario protegidas por JWT
    app.use('/api/users', protect, userRoutes);
    app.use('/api/categorias', protect, categoriaRoutes); // protegidas con JWT
    app.use('/api/categorias', protect, categoriaRoutes);

    // Si sirves el build de React desde Node:
    // const __dirname = path.resolve();
    // app.use(express.static(path.join(__dirname, '../frontend/dist')));
    // app.get('*', (req, res) => {
    //   res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    // });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar con MongoDB:', err);
    process.exit(1);
  });
