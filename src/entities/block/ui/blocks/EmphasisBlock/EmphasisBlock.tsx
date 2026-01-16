import { useSelector } from "../../../../../shared/lib";
import { isEmphasisElement } from "../../../lib/utils";
import type { BlockComponentProps } from "../../../model/types";
import { ElementRenderer } from "../../ElementRenderer/ElementRenderer";

export const EmphasisBlock: BlockComponentProps = ({ id }) => {
  const element = useSelector(s => s.blocksStore.blocks[id])  

  if (!isEmphasisElement(element)) {
    return null;
  }

  return (
    <span data-id={id} data-type={element.type} style={{ fontStyle: "italic" }}>
      {element.children.map((childId) => (
        <ElementRenderer id={childId} />
      ))}
    </span>
  );
};
