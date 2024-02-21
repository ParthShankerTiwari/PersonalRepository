import "medium-editor/dist/css/medium-editor.css";
import 'medium-editor/dist/css/themes/default.css';
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useData } from "../context/context";

const Object = styled.div`
  padding: 8px;
  border-radius: 2px;
  border: 1px solid;
  display: inline-block; 

`;

const NonEditItem = (props) => {
  const { updateObjectContent } = useData();
  const { content } = props.item;


  // to render html if stored directly
  const renderContent = () => {
    const containsHTMLTags = /<[a-z][\s\S]*>/i.test(content);

    if (containsHTMLTags) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    } else {
      return <div>{content}</div>;
    }
  };

  

  return (
    <>
     <div className="card mt-3">
      <Draggable draggableId={props.item.id} index={props.index}>
        {provided => (
          <Object  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
             <div className="card-body">
            <div>
            {renderContent()}
            </div>
            </div>
          </Object>
        )}
      </Draggable>
    </div>
    </>
  );
};

export default NonEditItem;