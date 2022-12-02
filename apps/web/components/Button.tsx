import Link from "next/link";
import { HtmlHTMLAttributes } from "react";
import { ButtonHTMLAttributes, FC, HTMLAttributes, PropsWithChildren } from "react";

type Props = {
    buttonStyle: "filled" | "outlined" | "ghost" | "link";
    buttonType?: "link" | "button";
    disabled?: boolean;
    loading?: boolean;
    href?: string;
} & HtmlHTMLAttributes<HTMLButtonElement | HTMLLinkElement>;

const Button: FC<PropsWithChildren<Props>> = (props) => {
    const { buttonStyle, href, buttonType, loading, disabled, ...rest } = props
    let className = "";
    if (buttonStyle === 'filled') {
        className = " select-none bg-black border-black border-2 px-6 py-2 text-white rounded-xl dark:bg-white dark:border-white dark:text-black ";
    } else if (buttonStyle === 'outlined') {
        className = " select-none bg-white border-black border-2 px-6 py-2 text-black rounded-xl hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black dark:border-white";
    } else if (buttonStyle === 'ghost') {
        className = "text-center select-none bg-neutral-100 px-6 py-2 text-black rounded-xl dark:bg-neutral-900 dark:text-white ";

    } else if (buttonStyle === 'link') {
        className = " select-none text-black hover:underline";
    }

    if (props.buttonType === "link") {
        return <Link href={props.href ?? ''} className={`inline-block text-center ${className} ${rest.className}`} >
            {rest.children}
        </Link>
    }
    return <button {...rest} className={`cursor-pointer ${className} ${rest.className}`} >{rest.children}</button>
}
export default Button;
