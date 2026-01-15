import { DocumentRoot } from "../../../../entities/document";
import { ElementRenderer } from "../../../../entities/block";
import classes from './classes.module.scss';

export const Field = () => {
  return (
    <div className={classes.wrapper}>
      <DocumentRoot>
        {(children) =>
          children.map((childId) => (
            <ElementRenderer id={childId} key={childId} />
          ))
        }
      </DocumentRoot>
    </div>
  );
};
