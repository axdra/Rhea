import { PropsOf } from "@headlessui/react/dist/types";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, FormEvent, FormEventHandler, HTMLProps, useState } from "react";
interface ILinkButtonProps extends HTMLProps<HTMLDivElement> {
    buttonStyle: 'filled' | 'outlined' | 'ghost' | 'link';
}
const Button: FC<ILinkButtonProps> = (props) => {
    let className = "";
    if (props.buttonStyle === 'filled') {
        className = " select-none bg-black border-black border-2 px-6 py-2 text-white rounded-xl";
    } else if (props.buttonStyle === 'outlined') {
        className = " select-none bg-white border-black border-2 px-6 py-2 text-black rounded-xl hover:bg-black hover:text-white";
    } else if (props.buttonStyle === 'ghost') {
        className = " select-none bg-white border-white border-2 px-6 py-2 text-black rounded-xl";
    } else if (props.buttonStyle === 'link') {
        className = " select-none text-black hover:underline";
    }

    return <div className={`cursor-pointer ${className} ${props.className}`} {...props} >{ props.children}</div>
}
export default Button;
