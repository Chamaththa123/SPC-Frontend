import React from 'react'
import { Link } from 'react-router-dom'

export const HeaderLink = ({ title, url, sref, handleNavigateToSection }) => {
    return (
        <div onClick={() => handleNavigateToSection(sref)} className="nav-item text-center text-white text-lg font-medium">{title}</div>



    )
}
