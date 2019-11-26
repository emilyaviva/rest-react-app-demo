import React from 'react'

const PersonRow = ({ name, birthdate }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{birthdate}</td>
    </tr>
  )
}

export default PersonRow
