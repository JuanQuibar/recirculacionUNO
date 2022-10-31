import { CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PorcentajePromedio = ({porcentajeTotal}) => {
  
  return (
    
    <div className=" h-full sm:flex mx-2 py-4 box-border ">

      <div className="h-full shrink-0 relative px-3">

        <CircularProgressbarWithChildren 
          value={porcentajeTotal}
          strokeWidth={10}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: porcentajeTotal < 40 ? porcentajeTotal < 15 ? '#ef4444' : '#60a5fa' : '#22c55e',
            textColor: porcentajeTotal < 40 ? porcentajeTotal < 15 ? '#ef4444' : '#60a5fa' : '#22c55e', 
          })}
        >

          <div style={{ 
              textAlign: 'center',
              height: 'auto',
              fontSize: 80, 
              fontWeight: 'normal',
              lineHeight:1,
              color: porcentajeTotal < 40 ? porcentajeTotal < 15 ? '#ef4444' : '#60a5fa' : '#22c55e'
            }}>

            {porcentajeTotal}%

            <p style={{
              fontSize: 27,
              textAlign: 'center',
              marginTop: 0
            }}
            >
              promedio

            </p>
            
          </div> 

        </CircularProgressbarWithChildren>

      </div>

      <div className=" grow flex flex-col box-border overflow-hidden px-4" >

        {porcentajeTotal >= 40 ? 
            <div className=" grow flex flex-col box-border overflow-hidden px-4">
              <h2 className="text-green-500 text-6xl text-center font-bold leading-normal">¡Bravo!&#x1F4AA;</h2>
              <p className="text-white text-2xl sm:text-3xl leading-tight">Estamos en 40% o más de <span className="font-bold">recirculación</span> promedio. Esto es <span className="font-bold">excelente</span> para el SEO. Ahora hay que mantenernos </p>
            </div>
        : porcentajeTotal >= 20 ? 
            <div className=" grow flex flex-col box-border overflow-hidden px-4">
              <h2 className="text-blue-400 text-6xl text-center font-bold leading-normal">Bien&#x1F642;</h2>
              <p className="text-white text-2xl sm:text-3xl leading-tight">Hemos superado el piso del 20% de <span className="font-bold">recirculación</span>. Ahora tenemos que alcalnzar el 40% </p>
            </div> 
        : porcentajeTotal >= 15 ? 
            <div className=" grow flex flex-col box-border overflow-hidden px-4">
              <h2 className="text-blue-400 text-6xl text-center font-bold leading-normal">Regular&#x1F62C;</h2>
              <p className="text-white text-2xl sm:text-3xl leading-tight">Una <span className="font-bold">recirculación</span> promedio de entre 15% y 19% no es peligrosa, pero la falta para estar bien. Trabajemos para llegar al 20% </p>
            </div> 
        : porcentajeTotal < 15 ? 
            <div className=" grow flex flex-col box-border overflow-hidden px-4">
              <h2 className="text-red-500 text-6xl text-center font-bold leading-normal">¡Alerta!&#x1F480;</h2>
              <p className="text-white text-2xl sm:text-3xl leading-tight">Estamos por debajo del 15% de <span className="font-bold">recirculación</span> promedio. Esto es peligroso para el SEO. Tenemos que corregir urgente  </p>
            </div> 
          : ""
          }

      </div>

    </div> 
  )
}

export default PorcentajePromedio