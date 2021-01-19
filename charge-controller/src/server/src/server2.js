const express = require("express");
// const btry = require("battery-level");
const execa = require("execa");
const PORT = 3030;
const app = express();
app.use(express.json());

let btry = {
  ChargeLevel:"",
  BatteryStatus:""
}

let Switch = {
  url:"test",
  minBtryLevel:20,
  maxBtryLevel:99,
  status:false
};

// Get Current battery [For Windows]
const getBtryData = async () => {
  let data;
  await execa("powershell", [
    "Get-WmiObject -Class Win32_Battery | select EstimatedChargeRemaining,BatteryStatus | ConvertTo-Json",
  ])
    .then((e) => {
      resData = JSON.parse(e.stdout);
      console.log('resData',resData);
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
app.get("/api/battery", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  let data;
  await getBtryData().then((d) => {
    data = d;
    console.log(data);
  })
  .catch(err =>{
    data = err;
  })

  res.send(200, data);
});

app.get("/api/switch", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );  

  res.send(200, Switch);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
