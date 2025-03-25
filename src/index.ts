import express from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import dotenv from 'dotenv';
import useragent from "express-useragent";
import { adminChecker } from "./middleware";
import { authenticator } from "./controllers/authController";


dotenv.config();
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(useragent.express());
app.use('/auth', authRoutes);
app.use('/url', authenticator, userRoutes);
app.use('/analytics', authenticator, adminChecker, adminRoutes);

app.listen(PORT,
    () => {
        console.log(`server running on http://localhost:${PORT}`);
    }
);
