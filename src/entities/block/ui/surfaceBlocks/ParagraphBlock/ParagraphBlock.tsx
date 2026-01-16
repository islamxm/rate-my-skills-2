import { useSelector } from "../../../../../shared/lib";
import { isParagraphElement } from "../../../lib/utils";
import type { BlockComponentProps } from "../../../model/types";
import { ElementRenderer } from "../../ElementRenderer/ElementRenderer";

export const ParagraphBlock: BlockComponentProps = ({ id }) => {
  const element = useSelector(s => s.blocksStore.blocks[id])  

  if (!isParagraphElement(element)) {
    return null;
  }

  return (
    <p className="editable-block" data-id={id}>
      {element.children.map((childId) => (
        <ElementRenderer id={childId} key={childId} />
      ))}
    </p>
  );
};
