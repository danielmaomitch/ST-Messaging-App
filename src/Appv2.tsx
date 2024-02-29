import React, { useState } from 'react';
import logo from './logo192.png';
import { AccountIcon } from './Icons';
import { SendIcon } from './Icons';
import './App.css';
import Button from '@mui/material/Button';
import { Messages } from './Messages';

function Appv2() {
    Messages.sort((a, b) => a.date.localeCompare(b.date))

    const[inputText, setInputText] = useState('')

    return (
        <div className="h-screen bg-sky-950 py-12">
            {/* Testing commit v2*/}
            {/* TODO: Replicate normal mode to look like dark mode colours */}
            <img src={logo} height={48} width={48} className='ml-auto mr-12'/>
            <center className="text-4xl text-green-500 -mt-12"> 
                <b>ST Messaging App</b> 
            </center>
            <div className="flex items-center justify-center mt-8">
                <div className="grid grid-rows-1 grid-cols-5">
                    <div className="h-[80vh] px-0 flex flex-col col-span-1 bg-white ml-auto rounded-r-none rounded-lg shadow overflow-y-scroll">
                        {Messages.map((v, index) => 
                            <> 
                                <div className={`pl-2 pt-2 flex flex-col border-b-2 border-dashed pb-2 hover:bg-gray-300 ${index === 0  && 'rounded-tl-lg'} ${index !== Messages.length-1 && 'border-green-500'}`}>
                                    <div className='flex flex-row'>
                                        <AccountIcon />
                                        <span className='font-bold ml-2'>{v.name.length > 15 ? v.name.substring(0, 15).concat("...") : v.name}</span>
                                        <span className='font-light ml-5'>{v.date}</span>
                                    </div>
                                    <div>
                                        <span className='text-gray-400'>{v.msg.length > 40 ? v.msg.substring(0, 40).concat("...") : v.msg}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className=" h-[80vh] p-4 bg-zinc-700 flex items-center justify-center col-span-4 rounded-l-none rounded-lg shadow">
                        <textarea onChange={(v) => setInputText(v.target.value)} value={inputText} placeholder='Send a Message...' name="text" rows={4} wrap="soft" cols={90} className="rounded-lg min-h-16 max-h-16 mt-auto mr-3 overflow-y-scroll">
                        </textarea>
                        <div className='mt-auto pb-4'>
                            <Button variant="contained" startIcon={<SendIcon />}>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appv2;

// > npm start   --> to run
// remember to add @material imports from MsgAppEx and change dependinces in package.JSON
// add this: "@material-ui/core": "^4.11.4" in dependencies
