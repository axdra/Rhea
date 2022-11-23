import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Room:NextPage = () => {

    return <div>Room</div>
}

export default Room;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  
    console.log(ctx.query.name);
    
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale as string, ["common"])),
      },
    };
  };