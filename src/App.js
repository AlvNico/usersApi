import React, { useState } from 'react';
import "./App.css";
import SearchComponent from "./components/SearchComponent";
import SideBar from "./components/SideBar";
import userContext, { users } from './Context';
function App() {
  
  const [userFiltro, setUsersFiltro] = useState(users);
  //console.log(userFiltro)

  return (
    <userContext.Provider value={{ userFiltro, setUsersFiltro }}>
    <div className="App">
      <SideBar />
      <div className="body-text">
        <h1> API USERS</h1>
        <SearchComponent />
      </div>
    </div>
    </userContext.Provider>
  );
}

export default App;
