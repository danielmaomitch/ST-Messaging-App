// export interface IGroups {
//     "SK": string,
//     "GroupID": number
// }

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

// export function callAPI(): IGroups[] {
//     // instantiate a headers object
//     var myHeaders = new Headers();
//     // add content type header to object
//     myHeaders.append("Content-Type", "application/json");
//     // using built in JSON utility package turn object to string and store in a variable
//     //var raw = JSON.stringify({"GroupID":123});
//     // create a JSON object with parameters for API call and store in a variable
//     var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         // body: raw
//         // redirect: 'follow'
//     };
//     // make API call with parameters and use promises to get response
//     fetch(`https://3aw30oh845.execute-api.us-east-2.amazonaws.com/dev/?groupid=124`, requestOptions)
//     .then(response => response.text())
//     .then(result => {
//         //setGroups(JSON.parse(result).body)
//         let body: IGroups[] = JSON.parse(result).body
//         let grouping: IGroups[] = []
//         body.forEach(obj => {
//             const cur: IGroups = {
//                 SK: obj["SK"],
//                 GroupID: obj["GroupID"]
//             }
//             grouping.push(cur)
//         });
//         groups = grouping;
//     })
//     .catch(error => console.log('error', error));

//     return groups;
// }

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
        if (body.length === 0) {
            console.log('isnide loop', body)
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
                //console.log('cur', cur)
            });
            //console.log('stack', stack)
            previews = stack;
        }
    })
    .catch(error => console.log('callAPIPreview Error', error));
    //console.log('previews post', previews)
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
        if (body.length === 0) {
            const cur: IMessages = {
                "Sender": '',
                "Message": '',
                "Time": ''
            }
        }
        else {
            //console.log('body', body)
            let stack: IMessages[] = []
            body.forEach(obj => {
                const cur: IMessages = {
                    Sender: obj["Sender"],
                    Message: obj["Message"],
                    Time: obj["Time"]
                }
                stack.push(cur)
                //console.log('cur', cur)
            });
            //console.log('stack', stack)
            messages = stack;
        }
    })
    .catch(error => console.log('callAPIMessages Error', error));
    //console.log('previews post', previews)
    return messages;
} 

export async function callAPIPOST(groupid: number, uid: string | undefined, msg: string) {
    // callAPI function that takes the base and exponent numbers as parameters
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"message":msg});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };
    // make API call with parameters and use promises to get response
    await fetch(`https://3aw30oh845.execute-api.us-east-2.amazonaws.com/dev/?reqType=POST_MSG&groupid=${groupid}&userid=${uid}`, requestOptions)
    // .then(response => response.text())
    // .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('callAPIPOST Error', error));
}