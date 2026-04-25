import { Logo } from "@shared/ui"
import type { FC, PropsWithChildren } from "react"
import { Link } from "react-router"

export const Header:FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="flex h-[55px] bg-white border-b">
      <Link className="flex" to={"/"}><Logo disableHatchingBg/></Link>
      {children}
    </div>
  )
}