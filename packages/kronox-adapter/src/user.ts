import { IKronoxUserAuth, IKronoxUserAuthResponse } from "./types/user";
import { endpoint } from "./constants";
export const KronoxLogin = (auth: IKronoxUserAuth): Promise<IKronoxUserAuthResponse> => {
    return new Promise(async (resolve, reject) => { 
        const  req = await fetch(`${endpoint}app/api/loggaIn.jsp?`+ new URLSearchParams({
            username: auth.username,
            password: auth.password,
        }), {
            method: "POST",
        })
        const res = await req.json();
        if (res.status === "ok") {
            resolve({
                username: res.username,
                name: res.name,
                token: req.headers.get("set-cookie")?.split(";")[0].split("=")[1] || "",
            });
        }
        else {
            reject(res);
        }
    
    })
}