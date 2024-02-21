import { default as React } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useData } from '../context/context';
import EditBox from '../editbox';


function generateId() {
  return 'object-' + Math.random().toString(36).substr(2, 9);
}

function onDragEnd (result, data, setData,updateObjectContentDisplay) {
  const { destination, source, draggableId } = result;
  
  
 // If there's no destination or if the draggable item is dropped in the same position, do nothing
 if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
  return;
}
 
  
  const sourceColumn = data.columns[source.droppableId];
  const destinationColumn = data.columns[destination.droppableId];


  var sourceObjects = Array.from(sourceColumn.objectId);
  var destinationObjects = Array.from(destinationColumn.objectId);

   // If dragging within the same column
   if (destination.droppableId === source.droppableId) {
    sourceObjects.splice(source.index, 1);
    sourceObjects.splice(destination.index, 0, draggableId);

    const customJSON = destinationObjects.map((objectId, index) => ({
      index,
      objectId,
    }));

    const customJSONString = JSON.stringify(customJSON);
    console.warn(customJSONString);

    
    setData(prevData => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [sourceColumn.id]: { ...sourceColumn, objectId: sourceObjects },
      },
    }));
  } else {
    // If dragging to a column 2
    // Generate a new ID 

    const newId =  source.droppableId === 'col-1' ? generateId() : draggableId;
    const newObject = { id: newId, content: data.objects[draggableId].content };

    // If the destination is column 2, add the new object to the destination column
    if (destination.droppableId === 'col-2') {
  
      destinationObjects.splice(destination.index, 0, newId);
      
    } else {
      return ;
    }
    
  
    // setData(prevData => ({
    //   ...prevData,
    //   objects: {
    //     ...prevData.objects,
    //     [newId]: newObject,
    //   },
    //   columns: {
    //     ...prevData.columns,
    //     [destinationColumn.id]: { ...destinationColumn, objectId: destinationObjects },
    //   },
    // }));
    updateObjectContentDisplay(newId,newObject,destinationColumn,destinationObjects)


     // Generate the custom JSON object
     const customJSON = destinationObjects.map((objectId, index) => ({
      index,
      objectId,
    }));
    const customJSONString = JSON.stringify(customJSON);
    console.warn(customJSONString);
    
  }
 
}




function Display() {

 

  const { data, setData, updateObjectContent,updateObjectContentDisplay} = useData();



  console.log(data)
 
  

  
  return (
    
    <div className="container mt-5">
    <DragDropContext onDragEnd={(result) => onDragEnd(result, data, setData,updateObjectContentDisplay)}>
      <div className="row">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const objects = column.objectId.map((objectId) => data.objects[objectId]);
          const isDragZone = columnId === 'col-1';
          return (
            <div key={column.id} >
              <EditBox column={column} objects={objects}  isDragZone={isDragZone}/>
            </div>
          );
        })}
        
      </div>
    </DragDropContext>
  </div>
 )
}

export default Display;
