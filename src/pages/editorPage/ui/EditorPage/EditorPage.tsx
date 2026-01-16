import { useEffect } from "react";
import { useSelector } from "../../../../shared/lib";
import { Field } from "../Field/Field";
import { Outline } from "../Outline/Outline";
import { Palette } from "../Palette/Palette";
import classes from "./classes.module.scss";

export const EditorPage = () => {
  const {blocks} = useSelector(s => s.blocksStore);

  useEffect(() => {
    console.log(blocks)
  }, [blocks])

  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <Palette />
      </div>
      <div className={classes.center}>
        <Field />
      </div>
      {/* <div className={classes.right}>
        <Outline />
      </div> */}
    </div>
  );
};
