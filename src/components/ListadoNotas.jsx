import React, { useEffect } from "react";
import { useTransition , animated } from "react-spring";
import Nota from "./Nota";

function ListadoNotas({notas,setActivar}) {

  useEffect(()=>{
    setActivar(true)
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
    <div>
      {/* <div className="flex flex-col justify-between mt-5 min-h-full relative bg-orange-600  "> */}

      {transitions(({ y, ...rest }, item, { key }) => (
        <animated.div

          key={key}
          style={{ 
            transform: y.to((y) => `translate3d(0,${y}%,0)`),
            ...rest,
            width:"100%",
            height: "auto",
            marginTop: "5%",
            marginBottom:"5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "9%" ,
            boxSizing:"border-box"
          }}
        
        >

          <Nota
            item={item}
          />
        
        </animated.div>
      ))}

    </div>

  );

}

export default ListadoNotas
