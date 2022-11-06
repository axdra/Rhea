import { useTranslation } from "next-i18next";

const Greet = (name: string, t:any,done:boolean = false) => {
    const timeOfDay = new Date().getHours();
    if (timeOfDay < 12 && timeOfDay > 4) {
        return t("goodMorning", { name: name });
    } else if (timeOfDay < 18 && timeOfDay > 11) {
        return t("goodAfternoon", { name: name });
    } else if(timeOfDay < 24 && timeOfDay > 17) {
        return t("goodEvening", { name: name });
    }
    else {
        return t("goodNight", { name: name });
    }

}
export default Greet;