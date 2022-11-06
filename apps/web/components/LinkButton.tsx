import Link, { LinkProps } from "next/link";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

type Props = {
  buttonStyle: "filled" | "outlined" | "ghost" | "link";
} & HTMLAttributes<HTMLAnchorElement> &
  LinkProps;

const LinkButton: FC<PropsWithChildren<Props>> = (props) => {
  const { buttonStyle, ...rest } = props;
  let className = "";
  if (buttonStyle === 'filled') {
    className = "text-center select-none bg-black border-black border-2 px-6 py-2 text-white rounded-xl dark:bg-white dark:border-white dark:text-black ";
  } else if (buttonStyle === 'outlined') {
    className = "text-center select-none bg-white border-black border-2 px-6 py-2 text-black rounded-xl hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black dark:border-white";
  } else if (buttonStyle === 'ghost') {
    className = "text-center select-none bg-neutral-100 px-6 py-2 text-black rounded-xl dark:bg-neutral-900 dark:text-white ";
  } else if (buttonStyle === 'link') {
    className = "text-center select-none text-black hover:underline";
  }


  return <Link {...rest} className={`${className} ${rest.className}`} />;
};
export default LinkButton;
