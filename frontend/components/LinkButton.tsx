import Link, { LinkProps } from "next/link";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

type Props = {
  buttonStyle: "filled" | "outlined" | "ghost" | "link";
} & HTMLAttributes<HTMLAnchorElement> &
  LinkProps;

const LinkButton: FC<PropsWithChildren<Props>> = (props) => {
  const { buttonStyle, ...rest } = props;
  let className = "";
  if (buttonStyle === "filled") {
    className =
      " select-none bg-black border-black border-2 px-6 py-2 text-white rounded-xl";
  } else if (buttonStyle === "outlined") {
    className =
      " select-none bg-white border-black border-2 px-6 py-2 text-black rounded-xl hover:bg-black hover:text-white";
  } else if (buttonStyle === "ghost") {
    className =
      " select-none bg-white border-white border-2 px-6 py-2 text-black rounded-xl";
  } else if (buttonStyle === "link") {
    className = " select-none text-black hover:underline";
  }

  return <Link {...rest} className={`${className} ${rest.className}`} />;
};
export default LinkButton;
