import express from "express";
import { BtryRouter } from './api/Battery/Battery';
import { ESwitchRouter } from './api/ESwitch/ESwitch';
import { MockRouter } from './api/mock/mock';

const app = express();
const PORT = 3030;
const mockNodeMCU = true;

app.use(express.json());
app.use('/api/battery',BtryRouter);
app.use('/api/switch', ESwitchRouter);

if(mockNodeMCU){
    app.use('/api/nodeMcu',MockRouter);
}

app.get('/',(req,res)=>{
    res.send('ESwitch Server is running....');
})


app.listen(3030, ()=>{
    console.log('Server is running on 3030..');
});