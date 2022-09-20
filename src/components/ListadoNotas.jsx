import React, { useEffect, useState } from "react";
import { useTransition , animated } from "react-spring";
import Nota from "./Nota";
import Spinner from "./Spinner";

function ListadoNotas({notas,setActivar, cargando, setCargando}) {

  useEffect(()=>{

    setTimeout(() => {
      setActivar(true)
    }, 100);

    notas.length > 1 && setCargando(false)

  },[notas])

  
  const height = 100;
  const transitions = useTransition(
    notas.map((data, i) => ({ ...data, y: i * height })), 
    {
      from: { position: "absolute", opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, opacity: 1 }),
      update: ({ y }) => ({ y }),
      key: (item) => item?.path
    }
  );

  return (
    <>
      {cargando && <Spinner/>}
      {transitions(({ y, ...rest }, item, { key }) => (
        
        <animated.div
          key={key}
          style={{ 
            transform: y.to((y) => `translate3d(0,${y}%,0)`),
            ...rest,
            width:"100%",
            marginTop: "5%",
            marginBottom: "5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "9%" ,
            boxSizing:"border-box",

          }}
        
        >
          
          <Nota
            item={item}
          />
          
        </animated.div>
        
      ))}
      
    </>  
      
    
  );

}

export default ListadoNotas
