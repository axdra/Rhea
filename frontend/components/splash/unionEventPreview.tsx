import { FC } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
interface IUnionEventPreviewProps {
    name: string,
    location: string,
    creator: string,
    color: string,
    start: string,
    image: string,
    cost?: string
}
const UnionEventPreview: FC<IUnionEventPreviewProps> = (props) => {
const {name, location, creator, color, start, image, cost} = props;
    const { t } = useTranslation();
    return (
        <div className="flex justify-between bg-neutral-100 hover:bg-neutral-200 duration-1000 px-4 py-2 rounded-xl text-sm flex-1  items-center">
            <div className="flex flex-col flex-1 justify-between">
                <div className="mr-2">
                <div className="flex justify-between ">
                <h1 className=" font-bold">
                    {name}
                    </h1>
                    {cost && <h1 className=" font-bold">
                    {cost}
                    </h1>}
                </div>
                <h2>
                    {location}
                </h2>
                <h3 className=" font-medium" style={{
                    color: color
                }}>
                    {creator}
                </h3>
            </div>
            <div className="flex flex-col">
       
            </div>
                <div>
                    <h3 className=" font-medium text-sm">
                        {start}
                    </h3>
            </div>
            </div>
            <Image src={image} className="h-20  aspect-square flex-shrink rounded-xl border-black border-2 overflow-hidden object-cover antialiased" />

        </div>
    );
}

export default UnionEventPreview;
