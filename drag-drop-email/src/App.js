import { default as React } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { DataProvider } from './context/context';
import Display from './display/display';


function App() {
 

  return (
    <DataProvider>
      <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<Display/>} />
        </Routes>
      </Router>
    </div>
  </DataProvider>)
}

export default App;
