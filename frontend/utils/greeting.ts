import { useTranslation } from "next-i18next";

const Greet = (name: string, t:any) => {
    const timeOfDay = new Date().getHours();
    if (timeOfDay < 12) {
        return t("goodMorning", { name: name });
    } else if (timeOfDay < 18) {
        return t("goodAfternoon", { name: name });
    } else if(timeOfDay < 24) {
        return t("goodEvening", { name: name });
    }
    else {
        return t("goodNight", { name: name });
    }

}
export default Greet;