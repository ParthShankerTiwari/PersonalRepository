const data={
    
    objects: {
      'object-1': { id: 'object-1', content: <div>Heading</div>}
      
    },
    columns: {
      'col-1': { id: 'col-1', title: 'Drag', objectId: ['object-1'] }, //Drag Row
      'col-2': { id: 'col-2', title: 'Drop', objectId: [] }, // Drop Row
    },
    columnOrder: ['col-1', 'col-2'], // Update column order to include the new column
  
};

export default data;

