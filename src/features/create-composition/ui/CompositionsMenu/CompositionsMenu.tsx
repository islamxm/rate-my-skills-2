import { DropdownMenuContent } from "@shared/ui";
import type { FC, PropsWithChildren } from "react";

export const CompositionsMenu: FC<PropsWithChildren> = ({ children }) => {
  return (
    <DropdownMenuContent className="py-0" side={"right"}>
      {children}
    </DropdownMenuContent>
  );
};
