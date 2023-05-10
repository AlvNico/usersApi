import React, { useState, useEffect, useContext } from "react";
import userContext from "../Context";


function SideBar() {
  const {userFiltro, setUsersFiltro} =  React.useContext(userContext);
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
   console.log(inputs)
  }

  //traer datos api
  const URL = "https://jsonplaceholder.typicode.com/users";
  const showData = async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      //console.log(data)
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showData();
  }, []); //
  const handleSubmit = (event) => {
    event.preventDefault();
    setUsersFiltro({company:inputs.company})
    console.log(inputs.company)
 
  }

  return (
    <div className="sidebar">
<form onSubmit={handleSubmit}>
      <p>Filtrar por compania de trabajo</p>
      <select name="company"  onChange={handleChange}>
      {users.map((usuario) =>(
        <option   value={usuario.company.name || ""}  >{usuario.company.name}</option>
))}

</select>
<input type="submit" />

    </form>

</div>
)}

export default SideBar;
