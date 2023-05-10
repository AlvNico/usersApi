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
 
  const results = !search ? users :users.filter((dato)=>
  dato.name.toLowerCase().includes(search.toLocaleLowerCase())
  )

    useEffect(()=>{
        showData()
    },[])
    console.log("final",    userFiltro)
  return (
    <div>
       <h1>{userFiltro.company}</h1>
        <input value= {search} onChange={searcher} type='text' placeholder='Buscar personas...' className='form-control' />
        <table className='table table-striped table-hover mt-5 shadow-lg'>
            <thead>
                <tr>
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
                        <td>{name}</td>
                        <td>{username}</td>
                        <td>{email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default SearchComponent