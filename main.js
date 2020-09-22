const express   = require('express');
const mongoose  = require('mongoose');
const connectDB = require('./config/db.js');
const dotenv    = require('dotenv');
const bodyParser = require('body-parser');
const app     = express();
const PORT    = 3000 || process.env.PORT;

//Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();
//Routes
const authRoutes = require('./routes/auth.js');
const testRoutes = require('./test/routes/post.js');

connectDB();

//Router
app.use('/api/user' , authRoutes);
app.use('/post' , testRoutes);




app.listen(PORT , () => console.log(`Server runnig on port ${PORT}`))
