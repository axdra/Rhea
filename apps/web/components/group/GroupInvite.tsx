import { FC, HTMLProps } from "react";
import Group from "../../pages/group";
import { QrCode } from "./QRCode";

interface IGroupInviteProps extends HTMLProps<HTMLDivElement> {
    code: string;
}
const prodURL = process.env.NODE_ENV === "development" ? "localhost:3000" : process.env.NEXT_PUBLIC_PROD_URL;


const GroupInvite: FC<IGroupInviteProps> = (props: IGroupInviteProps) => {
    const { code } = props;

    return (
        <div className="dark:text-white items-center relative flex flex-col gap-5">
            <span>To join this group, scan the QR code </span>
            <div className="h-24 w-24">
            <QrCode value={`https://${prodURL}/group/join?q=${code}`}/>
            </div>
            <span>or enter the code: <span className="font-bold">{code}</span></span>
            

        </div>
    );
}
export default GroupInvite;