import { FC, HTMLProps } from "react";
import Header from "./header";

const Layout:FC<HTMLProps<FC>> = (props) => {
    const { children } = props;
    return (
        <div className="flex flex-col h-full min-h-screen">
        <Header />
        {children}
        </div>
    );
}
export default Layout;