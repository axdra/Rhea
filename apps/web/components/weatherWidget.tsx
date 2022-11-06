import { FC, HTMLProps } from "react";
import WeatherIcon from "./weatherIcon";

interface IWeatherWidgetProps extends HTMLProps<HTMLDivElement> {
    temp: number;
    weather_code: string;
}

const WeatherWidget: FC<IWeatherWidgetProps> = (props: IWeatherWidgetProps) => {
    const { temp, weather_code } = props;

    return (
        <div className="  dark:text-white items-center  relative">
            <div className="text-xl font-medium dark:text-white">
                {temp}°C
            </div>
            <div className="absolute -top-4 -right-5 ">
            <WeatherIcon icon={weather_code} />
            </div>
        </div>
    );
}
export default WeatherWidget;