import React from 'react';
import logo from './logo192.png';
import { AccountIcon } from './Icons';
import './App.css';
import Button from '@mui/material/Button';
import { AccountBox } from '@mui/icons-material';

function App() {
  return (

    <div className="h-full bg-sky-950 py-12"> 
      <img src={logo} height={48} width={48} className='ml-auto  mr-12'/>
      <center className="text-4xl text-green-500 -mt-12"> 
            <b>ST Messaging App</b> 
      </center>
      <div className="min-w-screen h-screen flex justify-center items-center pb-32">
        <div className="bg-white w-2/12 h-96 py-80 rounded-lg shadow">
            {/* <span className="w-full h-full flex justify-center items-center text-3xl font-black">Friends Part</span> */}
            <div className='py-0'>
              <AccountIcon />
            </div>
        </div>

        <div className="bg-zinc-700 w-7/12 h-96 py-80 rounded-lg shadow">
          <span className="w-full h-full flex justify-center items-center text-5xl font-black">Msging Part</span>
          <div className="text-center mt-52"> 
            <textarea name="text" rows={4} wrap="soft" cols={90} className="rounded-lg">
              <input className="overflow-y-scroll"></input>
            </textarea>
            <Button variant="outlined" startIcon={<AccountBox />}>
              Delete
            </Button>
          </div>
            
        </div>
        
      </div>
        
    </div>

    // <GroupIndex />

  );
}

export default App;

// > npm start   --> to run
// remember to add @material imports from MsgAppEx and change dependinces in package.JSON
// add this: "@material-ui/core": "^4.11.4" in dependencies