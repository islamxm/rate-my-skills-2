import classes from "./classes.module.scss";
import { useDispatch } from "../../../../shared/lib";
import { blockStoreActions } from "../../../../entities/block";
import { createHeading } from "../../../../entities/block/lib/fabrics";

export const Palette = () => {
  const dispatch = useDispatch();

  return (
    <div className={classes.wrapper}>
      <button
        onClick={() =>
          dispatch(blockStoreActions.addHeadingElement(createHeading(2)))
        }
      >
        Heading
      </button>
      {/* <button onClick={() => dispatch(bloc)}>Paragraph</button> */}
    </div>
  );
};
