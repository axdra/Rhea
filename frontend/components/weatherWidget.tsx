import { FC, HTMLProps } from "react";

interface IWeatherWidgetProps extends HTMLProps<HTMLDivElement> {
    temp: number;
    weather_code: number;
}

const WeatherWidget: FC<IWeatherWidgetProps> = (props: IWeatherWidgetProps) => {
    const { temp, weather_code } = props;

    return (
        <div className="flex">
            <div className="text-xl font-medium">
                {temp}°C
            </div>
        </div>
    );
}
export default WeatherWidget;