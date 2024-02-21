
import React, { createContext, useContext, useState } from 'react';
import Data from '../data/data';


const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {

  
  const [data, setData] = useState(Data);

  
  //update data  of element (editItem)
  const updateObjectContent = (objectId, newContent) => {
    setData(prevData => ({
      ...prevData,
      objects: {
        ...prevData.objects,
        [objectId]: {
          ...prevData.objects[objectId],
          content: newContent
        }
      }
    }));
    // console.log(data);
    // localStorage.setItem('data',JSON.stringify(data));
    // console.log(localStorage.getItem('data'))
  };

  //update data of all(display)
  const updateObjectContentDisplay = (newId,newObject,destinationColumn,destinationObjects) => {
    setData(prevData => ({
      ...prevData,
      objects: {
        ...prevData.objects,
        [newId]: newObject,
      },
      columns: {
        ...prevData.columns,
        [destinationColumn.id]: { ...destinationColumn, objectId: destinationObjects },
      },
    }));
    
  };

  

  return (
    <DataContext.Provider value={{ data, setData, updateObjectContent ,updateObjectContentDisplay}}>
      {children}
    </DataContext.Provider>
  );
};
