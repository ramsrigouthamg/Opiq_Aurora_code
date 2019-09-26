import React from "react";
import { DragSource } from "react-dnd";

const optionSource = {
  beginDrag(props) {
    return props.el;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

function WrongOptions(props) {
  const { isDragging, connectDragSource, el } = props;
  const opacity = isDragging ? 0 : 1;
  return connectDragSource(
    <li style={{ opacity }} key={el.id}>
      {el.value}
    </li>
  );
}

export default DragSource("option", optionSource, collect)(WrongOptions);
