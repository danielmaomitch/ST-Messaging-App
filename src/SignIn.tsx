import React, { useState } from 'react';
import logo from './logo192.png';
import { AccountIcon } from './Icons';
import { SendIcon } from './Icons';
import './App.css';
import Button from '@mui/material/Button';
import { Messages } from './Messages';

function SignIn() {
    Messages.sort((a, b) => a.date.localeCompare(b.date))

    const[inputText, setInputText] = useState('')

    return (
        <div className="h-screen bg-sky-950 py-12">
            {/* TODO: Replicate normal mode to look like dark mode colours */}
            <img src={logo} height={48} width={48} className='ml-auto mr-12'/>
            <center className="text-4xl text-green-500 -mt-12"> 
                <b>ST Messaging App</b> 
            </center>
            <div className='mt-auto pb-4'>
                <a href='https://st-msg-app.auth.us-east-2.amazoncognito.com/login?client_id=u5bjt642ohj74nabkv4jp0ion&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fmaster.d3s8cuax6od5me.amplifyapp.com%2Fappv2'>
                    <Button variant="contained" startIcon={<SendIcon />}>Sign In</Button>
                </a>
            </div>
        </div>
    );
}

export default SignIn;

// > npm start   --> to run
// remember to add @material imports from MsgAppEx and change dependinces in package.JSON
// add this: "@material-ui/core": "^4.11.4" in dependencies
