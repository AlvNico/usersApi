import React, { useState, useEffect, useContext } from "react";
import userContext from "../Context";
import TableUser from "./TableUser";
function SearchComponent() {
    const [users, setUsers] =useState([])
    const [search, setSearch] =useState("")
    const {userFiltro, setUsersFiltro} =  React.useContext(userContext);  
    //traer datos api
    const URL='https://jsonplaceholder.typicode.com/users'
    const showData=  async () =>{
        try {
            const res = await fetch(URL);
            const data = await res.json();
            //console.log(data)
            setUsers(data)
          } catch (error) {
            console.log(error);
          }
    }
    const searcher=(e) =>{
        setSearch(e.target.value)
    }
   //filtrado

   let filtroSideBar = !userFiltro.company ? users : users.filter((dato) =>
   dato.company.name.toLowerCase().includes(userFiltro.company.toLocaleLowerCase()))
filtroSideBar = !userFiltro.dom ? filtroSideBar : filtroSideBar.filter((dato) =>
   dato.email.toLowerCase().includes(userFiltro.dom.toLocaleLowerCase()))
filtroSideBar = !userFiltro.city ? filtroSideBar : filtroSideBar.filter((dato) =>
   dato.address.city.toLowerCase().includes(userFiltro.city.toLocaleLowerCase()))
const results = !search ? filtroSideBar : filtroSideBar.filter((dato) =>
   dato.name.toLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(()=>{
        showData()
    },[])
   // console.log("final",    userFiltro)
  return (
    <div>

        <input value= {search} onChange={searcher} type='text' placeholder='Buscar personas...' className='form-control' />
        {results.length> 0 ? 
        <TableUser results={results}/>
        : <h1>No coincide ninguna busqueda</h1> }
    </div>
  )
}

export default SearchComponent