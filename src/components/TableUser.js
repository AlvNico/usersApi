import React from 'react'

function Table({results }) {

  return (
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
</table>
  )
}

export default Table