import React, { useState, useEffect, useContext } from "react";
import userContext from "../Context";

function SideBar() {
  const { userFiltro, setUsersFiltro } = React.useContext(userContext);
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value ;
    setInputs((values) => ({ ...values, [name]:value }));
   // console.log("llega input:",inputs);
  };

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
    setUsersFiltro({ company: (inputs.company || '') ,dom:(inputs.dominio || '') ,city:(inputs.city || '') });
    console.log(inputs);
  };
  //sacar repetidos para los select
  const quitarRepetidos= (array)=>{
    return array.filter((item,index)=>{
   return array.indexOf(item) === index;
 })
}
  const domFiltered= quitarRepetidos(users.map((usuario)=> usuario.email.split(".")[usuario.email.split(".").length - 1]))
  const companyFiltered= quitarRepetidos(users.map((usuario)=>  usuario.company.name))
  const cityFiltered= quitarRepetidos(users.map((usuario)=>  usuario.address.city))
  return (
    <div className="sidebar">
      <form onSubmit={handleSubmit}>
        <p>Filtrar por compania de trabajo</p>
        <select name="company" onChange={handleChange} class="form-select">
        <option value="">Compania</option>
          {companyFiltered.map((companyName) => (
            <option value={companyName}>
              {companyName}
            </option>
          ))}
        </select>
        <br/>   <br/> 
        <p>Filtrar dominio correo</p>
        <select name="dominio" onChange={handleChange} class="form-select">
          <option value="">Dominio</option>
          {
          domFiltered.map((dominio) => (
            <option value={dominio}>
              {dominio}
            </option>
          ))}
        </select>

        <br/>   <br/> 
        <p>Filtrar por ciudad</p>
        <select name="city" onChange={handleChange} class="form-select">
          <option value="">Ciudad</option>
          {
          cityFiltered.map((city) => (
            <option value={city}>
              {city}
            </option>
          ))}
        </select>

        <br/>   <br/> 
        <button class="btn btn-primary" type="submit">Filtrar</button>
      </form>
    </div>
  );
}

export default SideBar;
