import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

export function Header (){
  const navigate = useNavigate()

  const handledubleclick = (()=>{
    navigate("/login")
  })

  const handleclick = (()=>{
    navigate("/")
  })

  return(
    <header>
      <div className="w-full flex justify-center p-4 px-10 bg-blue-400">
        <div className="cursor-pointer" onClick={handleclick} onDoubleClick={handledubleclick}>
            <Logo />
        </div>
      </div>
    </header>
  )
}