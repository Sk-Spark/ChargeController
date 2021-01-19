import express from 'express';

export const MockRouter = express.Router();

const NetworkDelay = 1000;
let relay = false;

MockRouter.get('/', (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );  
    res.status(200).send('Mock server');
});

MockRouter.get('/on',(req,res)=>{
    relay=true;
    res.status(200).send({relay});
})

MockRouter.get('/off',(req,res)=>{
    relay=false;
    res.status(200).send({relay});
})

MockRouter.get('/status',(req,res)=>{
    setTimeout(() => {
        res.status(200).send({relay});
    }, NetworkDelay);
})

MockRouter.get('/toggle',(req,res)=>{
    relay=!relay;
    res.status(200).send({relay});
})
