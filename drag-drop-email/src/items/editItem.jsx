import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import 'medium-editor/dist/css/themes/default.css';
import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useData, } from "../context/context";

const Object = styled.div`
  padding: 8px;
  border-radius: 2px;
 
`;

const EditItem = (props) => {
  const { updateObjectContent } = useData();
  const { content } = props.item;
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [toolbarPosition, setToolBarPosition] = useState()
  const toolbarOpenRef = useRef(isToolbarOpen);


  useEffect(() => {

    // Timeout , not used anymore
    const timeoutId = setTimeout(() => {

    // Editor
    const editor = new MediumEditor('.editable', {
      toolbar: {
        //  Add new button in button array
        buttons: ['bold', 'italic', 'underline', 'h1', 'h2', 'h3', 'orderedlist', 'unorderedlist','justifyLeft', 'justifyCenter', 'justifyRight', 'text-color','background-color'],
        
      },        
      //  Button extension
      extensions: {
        // Text colour
        'text-color':new MediumEditor.extensions.button({
          name: 'text-color',
          label: 'text-color',
          contentDefault: 'Text-Color',
          action: function () {
          toolBar("text")
            
          }
        }),
        // background colour
        'background-color':new MediumEditor.extensions.button({
          name: 'background-color',
          contentDefault: 'Background-Color',
          action: function () {
          toolBar("background")
              
        }
        })
      }
    });

    
  

    // look for changes in editable element
    editor.subscribe('editableInput', (event, editable) => {
      console.log(event.target)
      const findTool=document.querySelector('.medium-editor-toolbar')
      console.log(findTool)
    });


    


    return () => {
      console.log("Editor destroyed");
      editor.destroy();
      clearTimeout(timeoutId);
    };

    }, ); //4301 // timeout here 

    return () => {clearTimeout(timeoutId);}
  }, []);

 

 
  // to render html if stored directly
  const renderContent = () => {
    const containsHTMLTags = /<[a-z][\s\S]*>/i.test(content);

    if (containsHTMLTags) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    } else {
      return <div>{content}</div>;
    }
  };

// Function to create color selector.
 const toolBar=(type) =>{

  // const findTool=document.querySelector('.medium-editor-toolbar')
  // console.log(findTool)

    //If toolbar exist , then create color input selector
    const toolbar = document.querySelector('.medium-editor-toolbar-actions');
    if (toolbar !==null){
      
      // Fecthing toolbar's location
      const rect = toolbar.getBoundingClientRect();

          console.log("toolbar :"+type)

          // Input container (<div>)
          const inputContainer = document.createElement('div'); 
          inputContainer.style.position = 'absolute';
          inputContainer.style.top = (rect.top - 50) + 'px'; 
          if(type ==='text'){ inputContainer.style.left = ((rect.left + rect.right + 315) / 2) + 'px'; }
          else if (type === "background"){ inputContainer.style.left = ((rect.left + rect.right + 500) / 2) + 'px'; }
          document.body.appendChild(inputContainer);

          // Input (<input>)
          const input = document.createElement('input'); 
          input.type = 'color';
          input.style.position = 'relative';
          input.style.display = 'block'; 
          input.style.width = '50px';
          input.style.height = '50px';
          input.addEventListener('input', function () {
            document.execCommand('styleWithCSS', false, true); 
            if(type ==='text'){ document.execCommand('foreColor', false, this.value);}
            else if (type === "background"){document.execCommand('hiliteColor', false, this.value);}
            input.style.display = 'none'; 
          });
        
        // input inside input container
        inputContainer.appendChild(input); 
        const closeInputContainer = (event) => {
          if (!inputContainer.contains(event.target)) {
            inputContainer.remove();
            document.body.removeEventListener('click', closeInputContainer);
          }
        };
    
        // Add event listener to document body
        document.body.addEventListener('click', closeInputContainer);
    
      console.log(toolbar)
     
    }
    else{
      //  setIsToolbarOpen(false);

    }

  }

  
  

  return (
    <>
     <div className="card mt-3">
      <Draggable draggableId={props.item.id} index={props.index}>
        {provided => (
          <Object  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
             <div className="card-body">
            <div className="editable" contentEditable suppressContentEditableWarning={true}  >
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

export default EditItem;