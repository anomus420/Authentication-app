const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter')

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.get('/ping' , (req , res) =>{
    console.log("hello from server");
    res.send('PONG');
})

app.use(bodyParser.json());
app.use(cors()); // make the server capable to receive the requests coming from any frontend ( client side)
app.use('/auth' , AuthRouter );
app.use('/products' , ProductRouter );

app.listen(PORT,()=>{
    console.log(`server is running on  port ${PORT}`)
})
