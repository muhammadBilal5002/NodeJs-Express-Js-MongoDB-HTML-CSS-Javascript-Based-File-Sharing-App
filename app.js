require("dotenv").config()
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const Port = process.env.Port | 80
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
app.use(cors(corsOpts));

app.listen(Port,()=>{
    console.log(`Server is Running on Port ${Port}`)
})

app.set('views', path.join(__dirname,'/view'));
app.set("view engine","ejs")

require("./config/db")()

app.use('/api/file',require("./Router/File"));
app.use('/download',require("./Router/Download"));
app.use('/myfile',require("./Router/download_page"));