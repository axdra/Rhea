import { IKronoxUserAuth, IKronoxUserAuthResponse } from "./types/user";
import { endpoint } from "./constants";
import parse from "node-html-parser";
export const KronoxLogin = (auth: IKronoxUserAuth): Promise<IKronoxUserAuthResponse> => {
    return new Promise(async (resolve, reject) => { 

        const  req = await fetch(`${endpoint}login_do.jsp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },  
            body: `username=${encodeURIComponent(auth.username)}&password=${encodeURIComponent(auth.password)}`,

            
        },)
        console.log(req.headers.get("set-cookie"))

        if (req.status == 200) {
            resolve({
                username: auth.username,
                name: "test",
                token: req.headers.get("set-cookie")?.split(";")[0].split("=")[1] || "",
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
