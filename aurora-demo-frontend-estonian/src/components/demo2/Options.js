import React, { Fragment } from "react";
import { DropTarget } from "react-dnd";

const spec = {
  drop(props, monitor) {
    props.handleDrop(monitor.getItem(), props.option);
  },
  canDrop(props) {
    return !props.option.correct;
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver()
  };
};

function Options({
  option,
  editMode,
  onOptionSave,
  onOptionEdit,
  connectDropTarget,
  hovered
}) {
  const backgroundColor = hovered ? "#FFF8DC" : "white";
  return connectDropTarget(
    <li>
      {editMode === option.id ? (
        <Fragment>
          <input type="text" className="value" placeholder="Enter new option" />
          <div className="edit" onClick={onOptionSave}>
            Save
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <span
            style={{ backgroundColor }}
            className="value "
            id={option.correct ? "true" : "false"}
          >
            {" "}
            {option.value}{" "}
          </span>
          <span className="edit" onClick={onOptionEdit(option.id)}>
            Edit
          </span>
        </Fragment>
      )}
    </li>
  );
}

export default DropTarget("option", spec, collect)(Options);
