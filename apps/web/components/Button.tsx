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
        className = " select-none bg-black border-black border-2 px-6 py-2 text-white rounded-xl dark:bg-white dark:border-white dark:text-black dark:hover:bg-black dark:hover:text-white hover:bg-white hover:text-black duration-200  ";
    } else if (buttonStyle === 'outlined') {
        className = " select-none bg-white border-black border-2 px-6 py-2 text-black rounded-xl hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black dark:border-white disabled:pointer-events-none disabled:border-neutral-500 disabled:text-neutral-500  ";
    } else if (buttonStyle === 'ghost') {
        className = "text-center select-none bg-neutral-100 px-6 py-2 text-black rounded-xl dark:bg-neutral-900 dark:text-white ";

    } else if (buttonStyle === 'link') {
        className = "select-none text-black hover:underline";
    }

    if (props.buttonType === "link") {
        return <Link href={props.href ?? ''} className={`inline-block text-center ${className} ${rest.className}`} >
            {loading &&    <svg className="animate-spin  h-4 w-4 m-1  text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
            {!loading && rest.children}
        </Link>
    }
    return <button {...rest} disabled={disabled} className={` cursor-pointer ${className}  ${rest.className}`} >
         {loading &&    <svg className="animate-spin  h-4 w-4 m-1  text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
            {!loading && rest.children}
    </button>
}
export default Button;
