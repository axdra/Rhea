import { FC, SVGProps } from 'react';
interface ITestMapProps extends SVGProps<SVGSVGElement> {
    selectedRoom: string;
}
const TestMap: FC<ITestMapProps> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 598.22 908.42"
            {...props}
        >
            <defs>
                <style>
                    {".cls-1{fill:#fff}.cls-2{fill:none;stroke:#000;stroke-miterlimit:10}"}
                    {"#" + props.selectedRoom + "  {fill: #ff0000;}}"}
                </style>
            </defs>
            <g id="Layer_2">
                <path
                    id="Gamma"
                    className="cls-1"
                    d="m300.37 387.12 49.09-.45s3.96 20.22 4.56 28.13c.59 7.91.4 6.15.4 6.15h-3.81v5.18H307.1l-.68 4.96-5.64-.29-.4-43.67Z"
                />
                <path
                    id="Beta"
                    className="cls-1"
                    d="m300.37 476.18.4-45.39 5.64.29.68-4.95 43.51-.01.52 18.22h3.36l-.81 12.52-3.98 18.17-4.27 1.04-7.46.84-37.59-.73z"
                />
                <path id="Lambda" className="cls-1" d="M368.61 386.7h38v44h-38z" />
                <path
                    id="Kappa"
                    style={{
                        fill: "#fcfcfc",
                    }}
                    d="M368.61 431.7h38v44h-38z"
                />
            </g>
            <g id="Layer_3">
                <path d="M348.71 387.66c1.67 5.82 12.5 46.69.57 87.81-22.71.21-43.15.61-47.89.71l1-88.4 46.33-.11m.75-1-48.06.12-1.02 90.42s23.24-.5 49.66-.74c13.42-45.24-.57-89.8-.57-89.8Z" />
                <path
                    className="cls-2"
                    d="m368.43 385.98 37.69.28.79 90.65h-38.3l-.09-45.89-.09-45.04zM406.12 431.02h-37.6M300.89 431.45l6.2.32.01-5.65 42.84-.68v-4.57h5.1M354.44 444.34h-4.32l-.18-18.9"
                />
            </g>
        </svg>
    )
}
export default TestMap;