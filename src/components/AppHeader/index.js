import React from 'react'
import './AppHeader.scss'

const AppHeader = ({ peopleNumber }) => {
  return (
    <h1 className="AppHeader">Here Are {peopleNumber} People</h1>
  )
}

export default AppHeader
