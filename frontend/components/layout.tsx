import { FC, HTMLProps } from "react";
import Footer from "./footer";
import Header from "./header";

const Layout:FC<HTMLProps<FC>> = (props) => {
    const { children } = props;
    return (
        <div className="overflow-x-hidden">
        <div className="flex flex-col h-full  layout-container selection:bg-orange-500 selection:text-white ">
        <Header />
            {children}
            </div>
            <Footer/>
        </div>
    );
}
export default Layout;