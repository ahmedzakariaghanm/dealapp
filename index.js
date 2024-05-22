const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const authRoutes = require("./routes/authRoutes")
const requestRoutes = require("./routes/requestRoutes")
const adsRoutes = require("./routes/adsRoutes")
const adminRoutes = require("./routes/adminRoutes")
const propertyRoutes = require("./routes/propertyRoutes")
const app = express()
const { requireAuth } = require('./middleware/authMiddleware')
const cors = require('cors')
mongoose.connect('mongodb://127.0.0.1/mydb')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes)
app.use(requireAuth)
app.use(requestRoutes)
app.use(adsRoutes)
app.use(adminRoutes)
app.use(propertyRoutes)

const port = 3000
app.listen(port, () => {
    console.log("Server Starts on port : " + port)
})