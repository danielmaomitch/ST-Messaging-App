import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from './logo192.png';
import { AccountIcon } from './Icons';
import { SendIcon } from './Icons';
import './App.css';
import Button from '@mui/material/Button';
import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";
import awsConfig from './amplifyconfiguration.json'
import '@aws-amplify/ui-react/styles.css';
import { callAPIPreview, callAPIMessages, IPreviews, IMessages, callAPIPOST } from './APICalls';

const URL = 'wss://0d08av32n4.execute-api.us-east-2.amazonaws.com/production/'

type AppProps = {

    signOut?: UseAuthenticator["signOut"];
    user?: AuthUser;

};

Amplify.configure(awsConfig)
const Appv2:React.FC<AppProps>=({signOut, user})=> {
    const socket = useRef<WebSocket | null>(null)

    const[inputText, setInputText] = useState('')
    const[prevFetched, setPrevFetched] = useState(false)
    const[msgsFetched, setMsgsFetched] = useState(false)
    const [previews, setPreviews] = useState<IPreviews[]>([])
    const [messages, setMessages] = useState<IMessages[]>([])

    const [isConnected, setIsConnected] = useState(false)

    const onSocketOpen = useCallback(() => {
        setIsConnected(true)
        var name = user?.username
        //const name = prompt('Enter your name')
        socket.current?.send(JSON.stringify({ action: 'setName', name }))
        console.log('set the name')
    }, [])

    const onSocketClose = useCallback(() => {
        setIsConnected(false)
        console.log('closed the socket')
    }, [])

    const onSocketMessage = useCallback((data: {}) => {
        console.log('messaging', { data })
    }, [])

    const onConnect = useCallback(() => {
        if (socket.current?.readyState !== WebSocket.OPEN) {
            socket.current = new WebSocket(URL)
            socket.current.addEventListener('open', onSocketOpen)
            socket.current.addEventListener('close', onSocketClose)
            socket.current.addEventListener('message', (event) => {
                onSocketMessage(event.data)
                console.log('received a message')
            })

        }
    }, [])

    useEffect(() => {
        return () => {
            socket.current?.close();
            console.log('closing the socket')
        };
    }, [])

    const onSendPublicMessage = useCallback(() => {
        const message = prompt('Enter public message');
        console.log({ message })
    }, [])

    callAPIPreview(user?.username)
        .then(data => {
            console.log('fetchPreview', data)
            if(!prevFetched) {
                setPrevFetched(true)
                setPreviews(data)
            }
        })
    if(prevFetched) {
        callAPIMessages(previews[0]['GroupID'])
            .then(data => {
                console.log('fetchMessages', data)
                if(!msgsFetched) {
                    setMsgsFetched(true)
                    setMessages(data)
                }
            })
    }
    
    console.log('previews', previews)
    const [groupID, setGroupID] = useState('')

    function updateMessages(msg: string, uid: string | undefined, groupid: number): void {
        var temp: IMessages[] = messages
        temp.push({
            "Sender": uid,
            "Message": msg,
            "Time": new Date().toISOString().substring(0, 10)
        })
        setMessages(temp)
        setInputText('')
        callAPIPOST(groupid, uid, msg)
    }

    return (
        <Authenticator>
            <div className="h-screen bg-sky-950 py-12">
                {/* Testing commit v2*/}
                {/* TODO: Replicate normal mode to look like dark mode colours */}
                <img src={logo} height={48} width={48} className='ml-auto mr-12'/>
                <center className="text-4xl text-green-500 -mt-12"> 
                    <b>ST Messaging App</b> 
                </center>
                {/* TODO: Change sign out button icon */}
                {/* <a href='https://st-msg-app.auth.us-east-2.amazoncognito.com/logout?client_id=u5bjt642ohj74nabkv4jp0ion&logout_uri=https%3A%2F%2Fmaster.d3s8cuax6od5me.amplifyapp.com/'> */}
                <Button onClick={signOut} variant="contained" startIcon={<SendIcon />}>Sign Out</Button>
                {/* </a> */}
                <div className="flex items-center justify-center mt-8">
                    <div className="grid grid-rows-1 grid-cols-5">
                        <div className="h-[80vh] px-0 flex flex-col col-span-1 bg-white ml-auto rounded-r-none rounded-lg shadow overflow-y-scroll">
                            {previews.map((v, index) => 
                                <> 
                                    <div className={`pl-2 pt-2 flex flex-col border-b-2 border-dashed pb-2 hover:bg-gray-300 ${index === 0  && 'rounded-tl-lg'} ${index !== previews.length-1 && 'border-green-500'}`}>
                                        <div className='flex flex-row'>
                                            <AccountIcon />
                                            {/* <span className='font-bold ml-2'>{v.name.length > 15 ? v.name.substring(0, 15).concat("...") : v.name}</span> */}
                                            {/* Above is to be used when length parsing is needed, i.e. group id is a user given name and not an ID  */}
                                            <span className='font-bold ml-2'>{v.GroupID === 0 ? '' : v.GroupID}</span>
                                            <span className='font-light ml-5'>{v.Time}</span>
                                        </div>
                                        <div>
                                            {/* <span className='text-gray-400'>{v.msg.length > 40 ? v.msg.substring(0, 40).concat("...") : v.msg}</span> */}
                                            {/* Above is to be used when length parsing is needed, i.e. group id is a user given name and not an ID  */}
                                            <span className='text-gray-400'>{v.LAST.length > 40 ? v.LAST.substring(0, 40).concat("...") : v.LAST}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>  
                        {/* justify-center items-center p-4*/}
                        <div className="h-[80vh]  bg-zinc-700 flex col-span-4 rounded-l-none rounded-lg shadow">
                            <Button onClick={onConnect} variant="contained" startIcon={<SendIcon />}>Connect</Button>
                            {/* <span>{user?.username}</span> */}
                            {/* MAKE ANOTHER GRID TO DIVIDE UP THE RIGHT SIDE GREY PART MAYBE 5 TOTAL ROWS AND 4 ROW SPAN FOR MSGS*/}
                            <ul className='mt-auto'>
                                {
                                    messages.map((v)=>
                                        <li className={`${v.Sender === user?.username  && 'text-violet-600'}`}>{v.Message}</li>
                                    )
                                }
                            </ul>
                            <textarea onChange={(v) => setInputText(v.target.value)} value={inputText} placeholder='Send a Message...' name="text" rows={4} wrap="soft" cols={90} className="rounded-lg min-h-16 max-h-16 mt-auto mr-3 overflow-y-scroll">
                            </textarea>
                            <div className='mt-auto pb-4'>
                                {/* <Button onClick={onSocketOpen} variant="contained" startIcon={<SendIcon />}>Test Websocket</Button> */}
                                <Button onClick={(v) => updateMessages(inputText, user?.username, 126)} variant="contained" startIcon={<SendIcon />}>Send</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticator>
    );
}

export default withAuthenticator(Appv2);

// > npm start   --> to run
// remember to add @material imports from MsgAppEx and change dependinces in package.JSON
// add this: "@material-ui/core": "^4.11.4" in dependencies
