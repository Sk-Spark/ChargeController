import express from 'express';
import axios from 'axios';

export const ESwitchRouter = express.Router();
const MIN_BTRY = 10;
const MAX_BTRY = 99;

let ESwitch = {
    url:"http://localhost:3030/api/nodemcu",
    minBtryLevel:20,
    maxBtryLevel:99,
    status:false
};

// Get status of Nodemcu realy
const getNodeStatus = async ()=>{
  console.log(ESwitch.url+'/status');
  return axios.get(ESwitch.url+'/status')
  .then((res)=>{
    console.log('Node:',res.data);
    ESwitch.status = res.data.relay;
    return res.data;
  })
  .catch((err)=>{
    console.error(err.message);
    return Promise.reject(err);
  });
}

//Update Node relay status
const setNodeSatus = async (status:boolean)=>{
  const url = `${ESwitch.url}/${ status? 'on':'off' }`
  return axios.get(url)
  .then((res)=>{
    ESwitch.status = status;
    return res.data;
  })
  .catch((err)=>{
    return Promise.reject(err);
  })
}

// To Get Switch Status
ESwitchRouter.get("/", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  

    getNodeStatus().then((data)=>{
      console.log('Status Data:',data);

      res.status(200).send(ESwitch);
    })
    .catch((err)=>{
      console.log(err.message);

      res.status(404).send(err);
    });
    
});

const vlidateAllBody = (body) =>{

  if(!body.url || !body.min || !body.max || !validateBtryLevel(body.min) || !validateBtryLevel(body.max)  )
    return false;
  else
    return true;

}

//Update All properties of switch
ESwitchRouter.put("/", (req,res)=>{
  console.log(req.body);
  console.log(vlidateAllBody(req.body));
  const { url, min, max } = req.body;
  if(vlidateAllBody(req.body))
  {
    ESwitch.url = url;
    ESwitch.maxBtryLevel = max;
    ESwitch.minBtryLevel = min;
    res.status(200).send(ESwitch);
  }
  else{
    res.status(400).send("Bad Request !!!");
  }

})

// Update Switch url 
ESwitchRouter.put("/url", (req,res)=>{
  console.log('Put URL: \n',req.body,'\n');

  if(!req.body || !req.body.url){
    res.status(400).send('Bad Request !!!');
  }
  else{
    ESwitch.url = req.body.url;
    res.status(200).send(ESwitch);
  }

});

const validateBtryLevel = (min) =>{
  if(typeof(min) !== 'number' || min < 0 || min > MAX_BTRY ){
    console.error('validateBtryLevel Error: ',typeof(min),':',min);
    return false;
  }
  else
    return true;

}

// Update Switch Min Battery Level
ESwitchRouter.put("/min", (req,res)=>{
  console.log('Put Min battery Level: ',req.body,'\n');

  if(!req.body || !req.body.min || !validateBtryLevel(req.body.min)){
    res.status(400).send('Bad Request !!!');
  }
  else{
    ESwitch.minBtryLevel = req.body.min;
    res.status(200).send(ESwitch);
  }
});

// Update Switch MAX Battery Level
ESwitchRouter.put("/max", (req,res)=>{
  console.log('Put Max battery Level: ',req.body,'\n');

  if(!req.body || !req.body.max || !validateBtryLevel(req.body.max)){
    res.status(400).send('Bad Request !!!');
  }
  else{
    ESwitch.maxBtryLevel = req.body.max;
    res.status(200).send(ESwitch);
  }
});

// Update Switch Status
ESwitchRouter.put("/status", (req,res)=>{
  console.log('Put Switch status: ',req.body,'\n');

  if(!req.body || typeof(req.body.status) !== 'boolean' ){
    res.status(400).send('Bad Request !!!');
  }
  else{
    setNodeSatus(req.body.status)
    .then(()=>{
      res.status(200).send(ESwitch);
    })
    .catch((err)=>{
      res.status(400).send(err);
    })

  }
});

