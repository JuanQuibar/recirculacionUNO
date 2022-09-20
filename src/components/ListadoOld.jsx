import React, { useEffect, useState, useCallback } from "react";
import { setearPosiciones } from "../helpers";
import Nota from "./Nota";
import NotaPrueba from "./NotaPrueba";


const ListadoOld = ({notas, setNotas, setActivar, cargando, setCargando, recalculando, calculandoTraslado, setCalculandoTraslado}) => {

   const [notasRender, setNotasRender] = useState([])
   const [trastado, setTraslado] = useState()

  useEffect(() => {

    setTimeout(() => {
      setActivar(true)
    }, 100);
    
    if(notas.length > 1){
      notas.forEach((element,indice) =>{element.posicionNueva = (indice) * 10})
    } //PROBAR DE AGREGAR UN ELSE EN LUGAR DE UN NUEVO IF Y ANIDAR
    
    if(notasRender.length == 0){
      setNotasRender(notas) 
    } else{
      setNotasRender(setearPosiciones(notasRender, notas))
    }
    
    /* else{
        const invertirPosicion = () => {

          notasRender.forEach(element =>{
          for(let i = 0; i < notasRender.length; i++){
            if(element.path == notas[i].path){ 
              
              element.posicionAnterior = element.posicionNueva
              element.posicionNueva = notas[i].posicionNueva
              element.porcentaje = notas[i].porcentaje
            } 
            else {
              element = Object.assign(notas[i])
            }
          }
          })
          return notasRender
        }
        
        setNotasRender(invertirPosicion)
        console.log(notasRender)

    } */
    
  },[notas ])

  
  

      
      
  
    

  

  

  /* notas.forEach((nota, indice) =>{
    nota.posicion= indice + 1
    console.log(nota)
  }) */

  
  return (
    
    <div className="h-screen">
      <div className="h-[90%] flex flex-col justify-between " >
        <h1>Hola Mundo</h1>
          
        {notasRender.map((nota) => (
          

          /* <div 
          key={nota.path}
          style={{
            border: "1px solid red",
            height: "10%",
            transform: `translateY(${nota.posicion2}%)`,
          }} */
          
            
            <NotaPrueba
                key={nota.path}
                nota={nota}
            /> 

          // </div> 

        ))}
      
      </div>

    </div>
    
  )

}

export default ListadoOld