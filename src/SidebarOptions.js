import React from 'react'
import './SidebarOptions.css'

function SidebarOptions({title = "test", Icon}) {
    return (
        <div className="sidebarOptions">
           {Icon && <Icon className="sidebarOptions_icon"></Icon>}
           {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </div>
    )
}

export default SidebarOptions
