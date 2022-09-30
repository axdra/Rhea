import { FC, HTMLAttributes, PropsWithChildren } from "react";

type Props = {
    buttonStyle: "filled" | "outlined" | "ghost" | "link";
  } & HTMLAttributes<HTMLButtonElement>;

const Button: FC<PropsWithChildren<Props>> = (props) => {
    const { buttonStyle, ...rest } = props
    let className = "";
    if (buttonStyle === 'filled') {
        className = " select-none bg-black border-black border-2 px-6 py-2 text-white rounded-xl dark:bg-white dark:border-white dark:text-black ";
    } else if (buttonStyle === 'outlined') {
        className = " select-none bg-white border-black border-2 px-6 py-2 text-black rounded-xl hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black";
    } else if (buttonStyle === 'ghost') {
        className = " select-none bg-white border-white border-2 px-6 py-2 text-black rounded-xl";
    } else if (buttonStyle === 'link') {
        className = " select-none text-black hover:underline";
    }

    return <button {...rest} type="button" className={`cursor-pointer ${className} ${rest.className}`} >{ rest.children }</button>
}
export default Button;
