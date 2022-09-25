import { FC, HTMLProps } from "react";
import Footer from "./footer";
import Header from "./header";
import MobileNav from "./mobileNav";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface ILayoutProps extends HTMLProps<FC> {
    hideFooter?: boolean;
}


const Layout: FC<ILayoutProps> = (props) => {
    const { children } = props;
    const footer = !props.hideFooter && <Footer />;
    return (
        <div className="overflow-x-hidden">
            <div className="flex flex-col h-full   selection:bg-orange-500 selection:text-white sm:pb-0 pb-16 layout-container">
        <Header />
                {children}
                <MobileNav />

            </div>
            {
                footer
            }
        </div>
    );
}

export default Layout;