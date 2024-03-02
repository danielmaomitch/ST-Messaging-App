import React from 'react';
import logo from './logo192.png';
import { AccountIcon } from './Icons';
import './App.css';
import Button from '@mui/material/Button';
import { AccountBox } from '@mui/icons-material';
import { Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import Appv2 from './Appv2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/Appv2" element={<Appv2 />} />
    </Routes>

  );
}

export default App;

// > npm start   --> to run
// remember to add @material imports from MsgAppEx and change dependinces in package.JSON
// add this: "@material-ui/core": "^4.11.4" in dependencies