import { IKronoxUserAuth, IKronoxUserAuthResponse } from "./types/user";
import { endpoint } from "./constants";
import parse from "node-html-parser";
export const KronoxLogin = (auth: IKronoxUserAuth): Promise<IKronoxUserAuthResponse> => {

    return new Promise(async (resolve, reject) => { 

        const session = await fetch("https://webbschema.mdu.se/")

        const jssession = session.headers.get("set-cookie")?.split(";")[0].split("=")[1]

        const  req = await fetch(`${endpoint}login_do.jsp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": `JSESSIONID=${jssession}`
            },  
            body: `username=${encodeURIComponent(auth.username)}&password=${encodeURIComponent(auth.password)}`,

            
        },)

        const responseText = await req.text()
        const doc = parse(responseText)
        const name = doc.querySelector("body > div.main > div.pagediv > div > div:nth-child(2) > p:nth-child(1) > b")?.text.replace("Hej",'').replace("!",'').trim();
        
        

        if (req.status == 200 && name) {
            resolve({
                username: auth.username,
                name: name,
                token: jssession || "",
            });
        }
        else {
            reject("Failed to login");
        }
    
    })
}

export const KronoxPoll = (token: string): Promise<boolean> => {
        
    return new Promise(async (resolve, reject) => {

        const req = await fetch(`${endpoint}ajax/ajax_session.jsp?op=poll`, {
            headers: {
                cookie: `JSESSIONID=${token}`,

            },
        });
        const res = await req.text();
        if (res === "OK") {
            resolve(true);
        }
        else {
            reject(res);
        }
    })
}

export const GetValidKronoxSession = async (session: string ): Promise<IKronoxUserAuthResponse> => {
    
    
    return new Promise(async (resolve, reject) => { 
        const req = await fetch(`${endpoint}ajax/ajax_session.jsp?op=poll`, {
            headers: {
                cookie: `JSESSIONID=${session}`,
            },
        });
        const pollR = await req.text();
        if (pollR !== "OK") {

            reject("Session expired");

        }
        const res = await fetch(`${endpoint}start.jsp`, {
        headers: {
            cookie: `JSESSIONID=${session}`,
        },
    })
    const responseText = await res.text()
    const doc = parse(responseText)
    const name = doc.querySelector("body > div.main > div.pagediv > div > div:nth-child(2) > p:nth-child(1) > b")?.text.replace("Hej",'').replace("!",'').trim();
    const username = doc.querySelector("#topnav > span")?.text.split("[")[1].split("]")[0];
    

    if (res.status == 200 && name && username) {
        resolve({
            username: username,
            name: name,
            token: session,
        });
    }
    else {
        reject("Failed to login");
    }
    })
}
