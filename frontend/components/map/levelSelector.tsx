import { FC, HTMLProps } from "react";

interface ILevelSelectorProps extends HTMLProps<HTMLDivElement> {
    levels: string[];
    onLevelSelect: (level: string) => void;
    currentLevel: string;
}

const LevelSelector: FC<ILevelSelectorProps> = (props) => {
    const { levels, onLevelSelect, currentLevel } = props;
    return (
        <div className="flex flex-col  bg-white  rounded-lg shadow border border-neutral-3  overflow-hidden">
            {levels.map((level, index) => {
                return (
                    <div key={level} className={`text-center py-2 px-4 cursor-pointer hover:bg-orange-500/10 pointer-events-auto transition-colors  ${currentLevel === level && "bg-orange-500 text-white"} `} onClick={() => onLevelSelect(level)} >
                        {level}
                    </div>
                );
            }
            )}

        </div>
    );



}
export default LevelSelector;
