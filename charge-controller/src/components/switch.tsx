import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import axios from "axios";
import { ESwitch_t, Error } from "./types";
import { VscSync } from "react-icons/vsc";

export const Switch = () => {
  const [ESwitch, setESwitch] = useState(new ESwitch_t());
  const [error, setError] = useState(new Error());
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:3030/api/switch";

  console.log("ESwitch:", ESwitch);

  // api call to get switch status
  const getESwitch = async () => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        console.log("ES Data:", res);
        let data = res.data;
        // console.log('data:',data);
        setESwitch(data);
      })
      .catch((err) => {
        let nError = cloneDeep(error);
        nError.flag = true;
        nError.msg = err.message;
        console.log(nError);
        setError(nError);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getESwitch();
  }, []);

  const testNodeMCUConnection = async (url: string) => {
    await axios
      .get(url)
      .then(() => {
        return { data: true };
      })
      .catch(() => {
        return { data: false };
      });
  };

  const OK = !loading && !error.flag;

  return (
    <>
      <div className="div-switch">
        <label className="switch-header"> Charger Switch </label>
        <br />
        {OK && (
          <>
            <div>
              <label>Url : </label>
              <input
                style={{width:"17em"}}
                placeholder="Switch url"
                value={ESwitch.url}
                type="text"
                onChange={(url) => {
                  ESwitch.url = url.target.value;
                  setESwitch(cloneDeep(ESwitch));
                }}
              />
              <button
                style={{ marginLeft: "1em" }}
                onClick={() => {
                  testNodeMCUConnection(ESwitch.url);
                }}
                title="title"
              > Test Connection </button>
              <VscSync className="Icon-loading" />
            </div>
            <label>
              Status : {ESwitch.status ? "Connected" : "NOT Connected"}{" "}
            </label>
            <div>
              <label>Min Battery Level : </label>
              <input
                className="input-btry"
                value={ESwitch.minBtryLevel ? ESwitch.minBtryLevel : "-N/A-"}
                onChange={() => {
                  console.log("minBatteryLevel Changes");
                }}
                maxLength={3}
              />
            </div>
            <div>
              <label>Max Battery Level : </label>
              <input
                className="input-btry"
                value={ESwitch.maxBtryLevel ? ESwitch.maxBtryLevel : "-N/A-"}
                onChange={() => {
                  console.log("maxBatteryLevel Changes");
                }}
              />
            </div>
            <button> Save </button>
          </>
        )}
        {loading && <label>Loading...</label>}
        {error.flag && <label>{`Error : ${error.msg}`}</label>}
      </div>
    </>
  );
};
