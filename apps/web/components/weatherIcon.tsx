import { BoltIcon, CloudIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface IIconProps {
    icon: string;
}


const WeatherLookup = {
"clearsky":"sun",
"cloudy":"clouds",
"fair":"sun",
"fog":"fog",
"heavyrain":"rain",
"heavyrainandthunder":"thunder",
"heavyrainshowers":"rain",
"heavyrainshowersandthunder":"thunder",
"heavysleet":"sleet",
"heavysleetandthunder":"thunder",
"heavysleetshowers":"sleet",
"heavysleetshowersandthunder":"thunder",
"heavysnow":"snow",
"heavysnowandthunder":"thunder",
"heavysnowshowers":"snow",
"heavysnowshowersandthunder":"thunder",
"lightrain":"rain",
"lightrainandthunder":"thunder",
"lightrainshowers":"rain",
"lightrainshowersandthunder":"thunder",
"lightsleet":"sleet",
"lightsleetandthunder":"thunder",
"lightsleetshowers":"sleet",
"lightsnow":"snow",
"lightsnowandthunder":"thunder",
"lightsnowshowers":"snow",
"lightssleetshowersandthunder":"thunder",
"lightssnowshowersandthunder":"tunder",
"partlycloudy":"clounds",
"rain":"rain",
"rainandthunder":"thunder",
"rainshowers":"rain",
"rainshowersandthunder":"thunder",
"sleet":"sleet",
"sleetandthunder":"thunder",
"sleetshowers":"sleet",
"sleetshowersandthunder":"thunder",
"snow":"snow",
"snowandthunder":"thunder",
"snowshowers":"snow",
"snowshowersandthunder":"thunder",
}

const WeatherIcon = (props: IIconProps) => {
    const [weather, setWeather] = useState<string>("sun");
    useEffect(() => {
        setWeather(WeatherLookup[props.icon as keyof typeof WeatherLookup]);

    }, [props.icon]);

    const getIcon = () => {
        switch (weather) {
            case "sun":
                return <SunIcon className="w-6 h-6 dark:text-white " strokeWidth={2} />
            case "clouds":
                return <CloudIcon className="w-6 h-6 dark:text-white " strokeWidth={2} />
                
            case "fog":
                return <CloudIcon className="w-6 h-6 dark:text-white " strokeWidth={2} />
            case "rain":
                return <CloudIcon className="w-6 h-6 dark:text-white " strokeWidth={2} />

            case "thunder":
                return <BoltIcon className="w-6 h-6 dark:text-white " strokeWidth={2} />
            case "sleet":
                return <CloudIcon className="w-6 h-6 dark:text-white " strokeWidth={2} />
            case "snow":
                return <CloudIcon className="w-6 h-6 dark:text-white " strokeWidth={2} />
            default:
                return 
        }
    }


    return (
        <div className="flex flex-col items-center">
            {getIcon()}
        </div>
    );
    
    
    }


export default WeatherIcon;

    

    

    

    

    

    

    

    

    

    

    

    

    

    