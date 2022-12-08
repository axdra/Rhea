
import { FC, HTMLProps } from "react";


interface IRecentCourseSkeletonProps {
    index: number;
}
const RecentCourseSkeleton: FC<IRecentCourseSkeletonProps> = (props) => {
    let animation = '';
    if ((props.index + Math.floor(props.index / 4)) % 4 === 0) {
        animation = "animate-[pulse_1.5s_ease-in-out_infinite_0s]"
    }
    else if ((props.index + Math.floor(props.index / 4)) % 4 === 1) {
        animation = "animate-[pulse_1.5s_ease-in-out_infinite_0.375s]"

    } else if ((props.index + Math.floor(props.index / 4)) % 4 === 2) {
        animation = "animate-[pulse_1.5s_ease-in-out_infinite_0.75s]"

    } else if ((props.index + Math.floor(props.index / 4)) % 4 === 3) {
        animation = "animate-[pulse_1.5s_ease-in-out_infinite_1.125s]"

    }
    return (<div className={` rounded-xl  ${animation}  px-5 py-4 h-24 justify-center flex flex-col bg-neutral-100  dark:bg-neutral-800   dark:hover:text-black  duration-300`}/>    );
}
export default RecentCourseSkeleton;