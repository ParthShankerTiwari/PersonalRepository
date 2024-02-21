import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import EditItem from "./items/editItem";
import NonEditItem from "./items/nonEditItem";

const Container=styled.div`
margin:8px; border: 1px solid black; border-radius:2px`;
const Title=styled.h3`
padding:8px`;
const ObjectList=styled.div`
padding:8px`;


export default class EditBox extends React.Component{
    render(){
      const { column, objects, isDragZone } = this.props;

      return (
        <Container>
          <Title>{column.title}</Title>
          <Droppable droppableId={column.id}>
            {(provided) => (
              <ObjectList ref={provided.innerRef} {...provided.droppableProps}>
                {objects.map((object, index) =>
                  isDragZone ? ( // Selective rendering (Editable / NonEditable)
                    <NonEditItem key={object.id} item={object} index={index} />
                  ) : (
                    <EditItem key={object.id} item={object} index={index} />
                  )
                )}
                {provided.placeholder}
              </ObjectList>
            )}
          </Droppable>
        </Container>
      );
    }
}