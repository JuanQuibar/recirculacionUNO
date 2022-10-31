import React, { useEffect} from "react";
import Nota from "./Nota";

const ListadoNotas = ({notasRender, setCargando, alturaDiv, setAlturaDiv, setActivar}) => {

  useEffect(() => {

    setTimeout(() => {
      setActivar(true)
    }, 100);

    notasRender.length > 1 && setCargando(false)

  },[notasRender])  

  const alturaNumber = (alturaDiv * 10)
  const alturaString = (alturaNumber + "px")
  
  return (

    <div className="altura">

      <style jsx>
        {`
        .altura{
          height: ${alturaString};
        }
        @media (min-width: 640px){
          .altura{
            position: relative;
            height: 65%; 
          }
        }
      `}</style> 
      
      {notasRender.map((nota, i) => (
        
        <Nota
            key={nota.path}
            nota={nota}
            i={i}
            setAlturaDiv={setAlturaDiv}    
        /> 

      ))}

    </div>
      
  )

}

export default ListadoNotas