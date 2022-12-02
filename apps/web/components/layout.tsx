import { FC, HTMLProps } from "react";
import Header from "./header";

interface ILayoutProps extends HTMLProps<FC> {
}


const Layout: FC<ILayoutProps> = (props) => {
    const { children } = props;
    return (
        <div className="overflow-x-hidden dark:bg-black">
            <div className="flex flex-col h-full    selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black layout-container">
                <Header />
                {children}

            </div>

        </div>
    );
}

export default Layout;