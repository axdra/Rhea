import { FC, HTMLProps } from "react";
import Footer from "./footer";
import Header from "./header";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface ILayoutProps extends HTMLProps<FC> {
    hideFooter?: boolean;
}


const Layout: FC<ILayoutProps> = (props) => {
    const { children } = props;
    return (
        <div className="overflow-x-hidden dark:bg-black">
            <div className="flex flex-col h-full    selection:bg-black selection:text-white sm:pb-0 pb-16 layout-container">
        <Header />
                {children}

            </div>
        
        </div>
    );
}

export default Layout;