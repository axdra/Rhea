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
