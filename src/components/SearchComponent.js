import React, { useState, useEffect, useContext } from "react";
import userContext from "../Context";

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


    let filtroSideBar=!userFiltro.company ? users :users.filter((dato)=>
  dato.company.name.toLowerCase().includes(userFiltro.company.toLocaleLowerCase()))
  filtroSideBar=!userFiltro.dom ? filtroSideBar : filtroSideBar.filter((dato)=>
  dato.email.toLowerCase().includes(userFiltro.dom.toLocaleLowerCase()))
  filtroSideBar=!userFiltro.city ? filtroSideBar : filtroSideBar.filter((dato)=>
  dato.address.city.toLowerCase().includes(userFiltro.city.toLocaleLowerCase()))
  const results = !search ? filtroSideBar :filtroSideBar.filter((dato)=>
  dato.name.toLowerCase().includes(search.toLocaleLowerCase())
  )

    useEffect(()=>{
        showData()
    },[])
    //console.log("final",    userFiltro)
  return (
    <div>

        <input value= {search} onChange={searcher} type='text' placeholder='Buscar personas...' className='form-control' />
        {results.length> 0 ? 

        <table className='table table-striped table-hover mt-5 shadow-lg'>
            <thead>
                <tr>  <th>
                        ID
                    </th>
                    <th>
                        NOMBRE
                    </th>
                    <th>
                        USUARIO
                    </th>
                    <th>
                        CORREO
                    </th>
                </tr>
            </thead>
            <tbody>
                {results.map(({id,name,username,email})=>(
              
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>{username}</td>
                        <td>{email}</td>
                    </tr>
                ))}
            </tbody>
        </table> : <h1>No coincide ninguna busqueda</h1> }
    </div>
  )
}

export default SearchComponent