const app = express()

import express from 'express';
import mongoose from 'mongoose';
import users from './routes/AppUsers.js'

// dotenv.config();
mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use('/users', users)

app.listen(8081, () => console.log('Server is running'))