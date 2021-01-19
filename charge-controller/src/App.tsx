import React from "react";
import { Battery } from "./components/battery";
import { Switch } from "./components/switch";
import "./App.css";
import "./components/comp.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Laptop Battery Controller
      </header>
      <div className="App-body">
        <Battery />
        <Switch />
      </div>
    </div>
  );
}

export default App;
