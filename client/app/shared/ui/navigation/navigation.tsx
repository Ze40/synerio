import { memo } from "react";

import * as style from "./style";

interface NavigationProps {
  className?: string;
}

const Navigation = memo(({ className }: NavigationProps) => {
  return <div className={className}></div>;
});

Navigation.displayName = "Navigation";

export default Navigation;
