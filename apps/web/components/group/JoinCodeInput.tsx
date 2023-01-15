import React from "react";
import { FC, HTMLProps, useState } from "react";
import Group from "../../pages/group";
import { QrCode } from "./QRCode";


interface IGroupInviteProps extends HTMLProps<HTMLDivElement> {
    code: string[];
    onCodeChange: (code: string[]) => void;
}


const JoinCodeInput: FC<IGroupInviteProps> = (props:IGroupInviteProps) => {

    const { code, onCodeChange } = props;
    const refs = [React.createRef<HTMLInputElement>(), React.createRef<HTMLInputElement>(), React.createRef<HTMLInputElement>(), React.createRef<HTMLInputElement>(), React.createRef<HTMLInputElement>(), React.createRef<HTMLInputElement>()];
    const handleChange = (e: any) => {
        const { value, name } = e.target;
        const newCode = [...code];
        
        //check if the value is a number
        if (isNaN(value) || value === "") {
            newCode[name] = "";
            onCodeChange(newCode);
            return;
        }
        // check if the value is a single digit
        newCode[name] = value;

        onCodeChange(newCode);
     
        switch (name) {
            case "0":
                refs[1].current?.focus();
                break;
            case "1":
                refs[2].current?.focus();
                break;
            case "2":
                refs[3].current?.focus();
                break;
            case "3":
                refs[4].current?.focus();
                break;
            case "4":
                refs[5].current?.focus();
                break;
            case "5":
                refs[5].current?.blur();

                break;
        }

        
    }

    return (
        <div className="flex gap-2">
            <input type="text" name="0" value={code[0]} onChange={handleChange} ref={refs[0]} className="rounded-lg w-12 h-16 text-center  text-xl font-medium" maxLength={1}/>
            <input type="text" name="1" value={code[1]} onChange={handleChange} ref={refs[1]} className="rounded-lg w-12 h-16 text-center  text-xl font-medium" maxLength={1}/>
            <input type="text" name="2" value={code[2]} onChange={handleChange} ref={refs[2]} className="rounded-lg w-12 h-16 text-center  text-xl font-medium" maxLength={1}/>
            <input type="text" name="3" value={code[3]} onChange={handleChange} ref={refs[3]} className="rounded-lg w-12 h-16 text-center  text-xl font-medium" maxLength={1}/>
            <input type="text" name="4" value={code[4]} onChange={handleChange} ref={refs[4]} className="rounded-lg w-12 h-16 text-center  text-xl font-medium" maxLength={1}/>
            <input type="text" name="5" value={code[5]} onChange={handleChange} ref={refs[5]} className="rounded-lg w-12 h-16 text-center  text-xl font-medium" maxLength={1}/>
        </div>
    );
}
export default JoinCodeInput;