const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const connectDb = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// ✅ Connect DB
connectDb();

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://saasmangement.netlify.app",   // ✅ your Netlify URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
    res.send("API is running");
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/users', userRoutes);

// ✅ Port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
