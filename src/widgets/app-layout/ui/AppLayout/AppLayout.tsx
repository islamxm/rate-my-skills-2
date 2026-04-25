import { Header } from "../Header/Header"
import type { FC, PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  sidebar?: ReactNode;
  header?: ReactNode;
  disabled?: boolean;
}>;

export const AppLayout:FC<Props> = ({
  sidebar,
  header,
  children,
  disabled
}) => {
  return (
    <div className="h-screen flex flex-col relative">
      {disabled && <div className="fixed inset-0 z-100 bg-white opacity-50"/>}
      <Header>{header}</Header>
      <div className="flex gap-[15px] p-[15px] min-h-0 flex-1">
        {sidebar}
        <div className="flex flex-1 min-h-0">{children}</div>
      </div>
    </div>
  )
}