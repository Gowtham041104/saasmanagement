const express = require('express');
const dotenv = require('dotenv');
const connectDb=require('./config/db')
const authRoutes=require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
dotenv.config();
const app = express();
connectDb();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send('API is running')
})
app.use('/api/auth',authRoutes)
app.use('/api/products', productRoutes);
app.use('/api/tenants', tenantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log("server is running at the PORT",PORT))