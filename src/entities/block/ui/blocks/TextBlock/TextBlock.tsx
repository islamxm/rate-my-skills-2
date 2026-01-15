import { useSelector } from "../../../../../shared/lib";
import { isTextElement } from "../../../lib/utils";
import type { BlockComponentProps } from "../../../model/types";

export const TextBlock:BlockComponentProps = ({id}) => {
  const element = useSelector(s => s.blocksStore.blocks[id])  

  if(!isTextElement(element)) {
    return null
  }

  return element.value;
}