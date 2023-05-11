import React, { useState, useEffect, useContext } from "react";
import userContext from "../Context";

function SideBar() {
  const { userFiltro, setUsersFiltro } = React.useContext(userContext);
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState({});



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

//setear filtros del form
  const handleChange = (event) => {
    console.log(event.target.value)
    const name = event.target.name;
    const value = event.target.value ;
    setInputs((values) => ({ ...values, [name]:value }));

  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setUsersFiltro({ company: (inputs.company || '') ,dom:(inputs.dominio || '') ,city:(inputs.city || '') });
    
  };
  //sacar repetidos para los select
  const quitarRepetidos= (array)=>{
    return array.filter((item,index)=>{
   return array.indexOf(item) === index;
 })
}
let filtroSideBar = !userFiltro.company ? users : users.filter((dato) =>
dato.company.name.toLowerCase().includes(userFiltro.company.toLocaleLowerCase()))
filtroSideBar = !userFiltro.dom ? filtroSideBar : filtroSideBar.filter((dato) =>
dato.email.toLowerCase().includes(userFiltro.dom.toLocaleLowerCase()))
filtroSideBar = !userFiltro.city ? filtroSideBar : filtroSideBar.filter((dato) =>
dato.address.city.toLowerCase().includes(userFiltro.city.toLocaleLowerCase()))
  const domFiltered= quitarRepetidos(filtroSideBar.map((usuario)=> usuario.email.split(".")[usuario.email.split(".").length - 1]))
  const companyFiltered= quitarRepetidos(filtroSideBar.map((usuario)=>  usuario.company.name))
  const cityFiltered= quitarRepetidos(filtroSideBar.map((usuario)=>  usuario.address.city))
 // verificar user
 const isEmpty = (userFiltro) =>{
  return (userFiltro.company !== "" || userFiltro.dom !== "" ||userFiltro.city !== "")
}

//reseteo filtros
const resetFilter = () => {
  setUsersFiltro({ company: "" ,dom:"" ,city:"" });
  document.getElementById('filtroUser').reset();
  setInputs({})
}

console.log("aca",userFiltro)
  return (
    <div className="sidebar">
      <br/>
            {  isEmpty(userFiltro)? <button className="btn btn-primary" onClick={resetFilter}>Limpiar filtros</button>: null}
      <form onSubmit={handleSubmit} id="filtroUser">
      <br/>
        <p>Filtrar por compania de trabajo</p>
        <select name="company" onChange={handleChange} className="form-select" id="companySelect" type="reset">
        <option value="" >Compania</option>
          {companyFiltered.map((companyName) => (
            <option value={companyName}>
              {companyName}
            </option>
          ))}
        </select>
        <br/>   <br/> 
        <p>Filtrar dominio correo</p>
        <select name="dominio" onChange={handleChange} className="form-select">
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
        <select name="city" onChange={handleChange} className="form-select">
          <option value="">Ciudad</option>
          {
          cityFiltered.map((city) => (
            <option value={city}>
              {city}
            </option>
          ))}
        </select>

        <br/>   <br/> 
        <button className="btn btn-primary" type="submit">Filtrar</button>
      </form>
    </div>
  );
}

export default SideBar;
