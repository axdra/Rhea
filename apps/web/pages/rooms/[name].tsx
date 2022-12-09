import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CampusMap from "../../components/map/campusMap";

interface Props {
  room: string;
}
const Room:NextPage<Props> = (props) => {

  return <div className="w-full h-full flex-1 grid grid-cols-2">
    <div className="col-span-1 text-white flex justify-center items-center text-6xl">{
    props.room}</div>
    <CampusMap showLevelSelector={ false} showSearch={false} />
    </div>
}

export default Room;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  
    console.log(ctx.query.name);
    
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale as string, ["common"])),
        room: ctx.query.name
      },
    };
  };