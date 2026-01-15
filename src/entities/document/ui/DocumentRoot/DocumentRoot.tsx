import { useEffect, type FC, type ReactNode } from "react"
import { isRootElement } from "../../lib/utils"
import { ROOT_ELEMENT_ID } from "../../model/consts"
import { useSelector } from "../../../../shared/lib"

type Props = {
  children?: (children: Array<string>) => ReactNode;
}

export const DocumentRoot:FC<Props> = ({children}) => {
  const rootElement = useSelector(s => s.blocksStore.blocks[ROOT_ELEMENT_ID])

  // если нет корневого элемента наверное нужно создать его
  if(!isRootElement(rootElement)) {
    return null
  }

  return (
    <div className="document-root markdown-body" id={ROOT_ELEMENT_ID}>
      {children?.(rootElement.children)}
    </div>
  )
}