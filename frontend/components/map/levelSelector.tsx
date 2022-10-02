import { FC, HTMLProps } from "react";

interface ILevelSelectorProps extends HTMLProps<HTMLDivElement> {
    levels: string[];
    onLevelSelect: (level: string) => void;
    currentLevel: string;
}

const LevelSelector: FC<ILevelSelectorProps> = (props) => {
    const { levels, onLevelSelect, currentLevel } = props;
    return (
        <div className="flex flex-col  bg-white  dark:bg-black gap-1 dark:text-white rounded-xl border-2 border-black shadow  px-1 py-2  overflow-hidden dark:border-white">
            {levels.map((level, index) => {
                return (
                    <div key={level} className={`text-center py-2  px-3 text-sm font-extrabold cursor-pointer hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white pointer-events-auto transition-colors  rounded-xl  ${currentLevel === level && "bg-black text-white dark:bg-white dark:text-black "} `} onClick={() => onLevelSelect(level)} >
                        {level}
                    </div>
                );
            }
            )}

        </div>
    );



}
export default LevelSelector;
