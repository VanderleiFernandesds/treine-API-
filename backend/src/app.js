import cors from 'cors';
import express from 'express';
import productRoutes from './routes/productRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import passport from "./config/passport.js";
import path from "path";
import uploadRoutes from "./routes/uploadRoutes.js";



const app = express();

// Libera requisições de outros domínios, como o frontend rodando separado.
app.use(cors());

// Faz o Express entender JSON enviado no corpo das requisições.
app.use(express.json());

// Todas as rotas desse arquivo passam a começar com /api.
app.use('/api', productRoutes);

app.use("/api/auth", authRoutes);

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api/upload", uploadRoutes);

export default app;
