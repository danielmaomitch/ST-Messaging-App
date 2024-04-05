import { Link, Navigate, Outlet } from "react-router-dom";
import logo from './logo192.png';
import React, { useState } from 'react';
import { Button } from "@mui/material";
import { SendIcon } from "./Icons";
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";
import awsConfig from './amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';
import { callAPIPOSTGroup } from "./APICalls";

type AppProps = {

    signOut?: UseAuthenticator["signOut"];
    user?: AuthUser;

};

Amplify.configure(awsConfig)
const CreateGroup:React.FC<AppProps>=({signOut, user})=> {
    const[users, setUsers] = useState<string[]>([])
    const[inputText, setInputText] = useState<string>('')
    const[groupName, setGroupName] = useState<string>('')

    function addUser(): void {
        if (users.length < 3) {
            users.push(inputText)
            setInputText('')
        }
        else {
            alert('You may only add 3 users to a group')
        }
    }

    function addGroup(): void {
        users.push(String(user?.username))
        callAPIPOSTGroup(groupName, users)
    }
    return (
        <Authenticator>
            <div className="h-screen bg-sky-950 py-12">
                <img src={logo} height={48} width={48} className='ml-auto mr-12'/>
                <center className="text-4xl text-green-500 -mt-12"> 
                    <b>Create A Group</b> 
                </center>
                <div className="grid grid-rows-5 w-1/5 space-y-3">
                    <div className="grid grid-cols-2 mt-auto">
                        <span>Group Name: </span>
                        <input onChange={(v) => setGroupName(v.target.value)} value={groupName}></input>
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Username: </span>
                        <input onChange={(v) => setInputText(v.target.value)} value={inputText}></input>
                    </div>
                </div>
                <div className="font-bold">If the group does not appear on the left after creating, please refresh the page</div>
                <Button onClick={(v) => addUser()} variant="contained" startIcon={<SendIcon />}>Add User</Button>
                <div>
                    <h1 className="font-bold text-lg text-green-500">{users.length > 0 ? 'Users Added' : ''}</h1>
                    <ul className='flex flex-col-reverse h-auto row-span-3 overflow-y-scroll'>
                        {
                            users.map((v)=>
                                <li>{v}</li>
                            )
                        }
                    </ul>
                </div>
                <Link to='/'>
                    <Button onClick={(v) => addGroup()}variant="contained" startIcon={<SendIcon />}>Create Group</Button>
                </Link>



                {/* <div className="grid grid-rows-5 w-1/5 space-y-3">
                    <div className="grid grid-cols-2 mt-auto">
                        <span>Group Name: </span>
                        <input onChange={(v) => setInputText(v.target.value)}></input>
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Username 1: </span>
                        <input></input>
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Username 2: </span>
                        <input></input>
                    </div>
                    <div className="grid grid-cols-2">
                        <span>Username 3: </span>
                        <input></input>
                    </div>
                </div> */}
            </div>
        </Authenticator>

    )
}
export default withAuthenticator(CreateGroup);