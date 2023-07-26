const express=require('express');
const cors=require('cors');

const db=require('./utils/database');
const adminRouter=require('./routes/admin');


const app=express();
app.use(cors())
app.use(adminRouter);

app.listen(3000)