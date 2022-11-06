import { KronoxLogin } from "./user";
KronoxLogin({
    username: "username",
    password: "password",
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});
