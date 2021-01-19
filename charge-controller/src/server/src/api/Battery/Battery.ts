import express from 'express';
import execa from 'execa';

export const BtryRouter = express.Router();

let btry = {
    ChargeLevel:"",
    BatteryStatus:""
}

// Get Current battery [For Windows]
const getBtryData = async () => {
    let data;
    await execa("powershell", [
      "Get-WmiObject -Class Win32_Battery | select EstimatedChargeRemaining,BatteryStatus | ConvertTo-Json",
    ])
      .then((e) => {
        let resData = JSON.parse(e.stdout);
        // console.log('resData',resData);
        btry.ChargeLevel = resData.EstimatedChargeRemaining;
        btry.BatteryStatus = resData.BatteryStatus;
        data = btry;
      })
      .catch((err) => {
        console.log(err);
        data = err;
      });
  
    return data;
  };
  
  //Get Battery Status Rout
  BtryRouter.get("/", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  
    let data;
    await getBtryData().then((d) => {
      data = d;
      console.log('GET /api/battery/ \n Data:',data,'\n');
    })
    .catch(err =>{
      data = err;
      console.log('GET /api/battery/ \n Error:',data,'\n');
    })
  
    res.status(200).send(data);
  });
