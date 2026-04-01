import classes from "./classes.module.scss";
import { useDocument, useSelection } from "../../hooks";
import { BlockEditor } from "../BlockEditor/BlockEditor";

/** @deprecated */
export const BlockCanvas = () => {
  const { rootOrder } = useDocument();
  const { clearAll, hasSelection } = useSelection();

  function handleCanvasClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget && hasSelection()) {
      clearAll();
    }
  }

  return (
    <div className={classes.wrapper} onClick={handleCanvasClick}>
      {rootOrder.map((nodeId, index) => {
        return <BlockEditor nodeId={nodeId} index={index} key={nodeId} />;
      })}
    </div>
  );
};
