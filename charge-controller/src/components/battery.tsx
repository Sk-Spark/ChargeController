import React, { useEffect, useState } from "react";
import axios from "axios";

export const Battery = () => {
  const [btryLevel, setBatryLevel] = useState(-1);
  const [btryStatus, setBtryStatus] = useState(-1);
  const [flag, setFlag] = useState(true);
  const [error, setError] = useState('');
  const url = "http://localhost:3030/api/battery"; 

  const getBatteryLevel = async () => {
    axios
      .get(url)
      .then((res) => {
        // console.log(res);
        setBatryLevel(res.data.ChargeLevel);
        setBtryStatus(res.data.BatteryStatus);
      })
      .catch((err) => {
        setError(err.message);
        setBatryLevel(-2);
      });
  };

  useEffect(() => {
    getBatteryLevel();
  },[flag]);

  setTimeout( ()=>{setFlag(!flag)}, 10000 );

  const prsBtryStatus = (btryStatus: Number) => {
    let status = "";
    switch (btryStatus) {
      case 1:
        status = "Battery is discharging";
        break;
      case 2:
        status =
          "The system has access to AC so no battery is being discharged. However, the battery is not necessarily charging.";
        break;
      case 3:
        status = "Fully Charged";
        break;
      case 4:
        status = "Low";
        break;
      case 5:
        status = "Critical";
        break;
      case 6:
        status = "Charging";
        break;
      case 7:
        status = "Charging and High";
        break;
      case 8:
        status = "Charging and Low";
        break;
      case 9:
        status = "Charging and Critical ";
        break;
      case 10:
        status = "Unknown State";
        break;
      case 11:
        status = "Partially Charged";
    }

    return status;
  };

  const prsBtryLevel = (level: Number) => {
    if (level === -1) {
      return "Loading...";
    } else if (level === -2) {
      return ('Error: '+error);
    } else {
      return ('Level: '+level + "%" );
    }
  };

  return (
    <>
      <div className='div-btry'>
        <label className='btry-header'> Battery </label><br/>
        <label>{prsBtryLevel(btryLevel)}</label><br/>
        <label>{prsBtryStatus(btryStatus)}</label>
      </div>
    </>
  );
};
