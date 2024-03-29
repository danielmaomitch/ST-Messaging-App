export interface IPreviews {
    "GroupID": number,
    "LAST": string,
    "Time": string
}

export interface IMessages {
    "Sender": string | undefined,
    "Message": string,
    "Time": string
}

export async function callAPIPreview(user: string | undefined): Promise<IPreviews[]> {
    var myHeaders = new Headers();
    var previews: IPreviews[] = [];
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    
    await fetch(`https://3aw30oh845.execute-api.us-east-2.amazonaws.com/dev/?reqType=GET_PREV&userid=${user}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        let body: IPreviews[] = JSON.parse(result).body
        if (body !== undefined) {
            if (body.length === 0) {
                //console.log('isnide loop', body)
                var emptyPrev: IPreviews[] = [{
                    "GroupID": 0,
                    "LAST": '',
                    "Time": ''
                }]
                previews = emptyPrev
            }
            else {
                let stack: IPreviews[] = []
                body.forEach(obj => {
                    const cur: IPreviews = {
                        GroupID: obj["GroupID"],
                        LAST: obj["LAST"],
                        Time: obj["Time"]
                    }
                    stack.push(cur)
                    ////console.log('cur', cur)
                });
                ////console.log('stack', stack)
                previews = stack;
            }
        }
        else {
            var emptyPrev: IPreviews[] = [{
                "GroupID": 0,
                "LAST": '',
                "Time": ''
            }]
            previews = emptyPrev
        }
    })
    .catch(error => console.log('callAPIPreview Error', error, previews));
    ////console.log('previews post', previews)
    return previews;
}

export async function callAPIMessages(groupid: number): Promise<IMessages[]> {
    var myHeaders = new Headers();
    var messages: IMessages[] = [];
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    
    await fetch(`https://3aw30oh845.execute-api.us-east-2.amazonaws.com/dev/?reqType=GET_MSGS&groupid=${groupid}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        let body: IMessages[] = JSON.parse(result).body
        if (body !== undefined) {
            if (body.length === 0) {
                const emptyMsg: IMessages[] = [{
                    "Sender": '',
                    "Message": '',
                    "Time": ''
                }]
                messages = emptyMsg
            }
            else {
                ////console.log('body', body)
                let stack: IMessages[] = []
                body.forEach(obj => {
                    const cur: IMessages = {
                        Sender: obj["Sender"],
                        Message: obj["Message"],
                        Time: obj["Time"]
                    }
                    stack.push(cur)
                    ////console.log('cur', cur)
                });
                ////console.log('stack', stack)
                messages = stack;
            }
        }
        else {
            const emptyMsg: IMessages[] = [{
                "Sender": '',
                "Message": '',
                "Time": ''
            }]
            messages = emptyMsg
        }
    })
    .catch(error => console.log('callAPIMessages Error', error));
    ////console.log('previews post', previews)
    return messages;
} 

export async function callAPIPOSTMsg(groupid: number, uid: string | undefined, msg: string) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "message": msg });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };
    await fetch(`https://3aw30oh845.execute-api.us-east-2.amazonaws.com/dev/?reqType=POST_MSG&groupid=${groupid}&userid=${uid}`, requestOptions)
    // .then(response => response.text())
    // .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('callAPIPOSTMsg Error', error));
}

export async function callAPIPOSTGroup(groupName: string, uid: string[] | undefined, msg: string) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
    };
    var groupid = Math.floor(Math.random() * (10000 + 1));
    await fetch(`https://3aw30oh845.execute-api.us-east-2.amazonaws.com/dev/?reqType=POST_GROUP&groupid=${groupid}&userid=${uid}&groupName=${groupName}`, requestOptions)
    // .then(response => response.text())
    // .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('callAPIPOSTGroup Error', error));
}