import { CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PorcentajePromedio = ({porcentajeTotal}) => {

  return (
    
    <div className=" h-full sm:flex mx-2 py-4 px-2 sm:mt-4 box-border ">

      <div className="h-full shrink-0 relative px-10 sm:px-2">

        <CircularProgressbarWithChildren 
          value={porcentajeTotal}
          strokeWidth={12}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: porcentajeTotal < 40 ? porcentajeTotal < 10 ? '#ef4444' : '#60a5fa' : '#22c55e',
            textColor: porcentajeTotal < 40 ? porcentajeTotal < 10 ? '#ef4444' : '#60a5fa' : '#22c55e', 
          })}
        >

          <div style={{ 
              textAlign: 'center',
              height: 'auto',
              fontSize: 52, 
              fontWeight: 'normal',
              lineHeight:1,
              color: porcentajeTotal < 40 ? porcentajeTotal < 10 ? '#ef4444' : '#60a5fa' : '#22c55e'
            }}>

            {porcentajeTotal}%

            <p style={{
              fontSize: 18,
              textAlign: 'center',
              marginTop: 0
            }}
            >
              promedio

            </p>
            
          </div> 

        </CircularProgressbarWithChildren>

      </div>

      <div className=" flex flex-col justify-evenly box-border overflow-hidden px-4" >

        {porcentajeTotal >= 40 ? 
            <>
              <h2 className="text-green-500 text-5xl md:text-6xl text-center font-bold leading-normal h-auto">¡Bravo!&#x1F4AA;</h2>
              <p className="text-white text-xl md:text-2xl 2xl:text-3xl md:px-20 h-auto leading-tight">Estamos en 40% o más de <span className="font-bold">recirculación</span> promedio. Esto es <span className="font-bold">excelente</span> para el SEO. Ahora hay que mantenernos </p>
            </>
        : porcentajeTotal >= 20 ? 
            <>
              <h2 className="text-blue-400 text-5xl md:text-6xl text-center font-bold leading-normal h-auto">Bien&#x1F642;</h2>
              <p className="text-white text-xl md:text-2xl 2xl:text-3xl md:px-20 h-auto">Hemos superado el piso del 20% de <span className="font-bold">recirculación</span>. Ese porcentaje está bien. Ahora tenemos que alcalnzar el 40% </p>
            </> 
        : porcentajeTotal >= 10 ? 
            <>
              <h2 className="text-blue-400 text-5xl md:text-6xl text-center font-bold h-auto leading-normal">Regular&#x1F62C;</h2>
              <p className="text-white text-xl md:text-2xl 2xl:text-3xl md:px-20 h-auto">Una <span className="font-bold">recirculación</span> promedio de entre 10% y 19% no es peligrosa, pero le falta para estar bien. Trabajemos para llegar al 20% </p>
            </> 
        : porcentajeTotal < 10 ? 
            <>
              <h2 className="text-red-500 text-5xl md:text-6xl text-center font-bold leading-normal h-auto">¡Alerta!&#x1F480;</h2>
              <p className="text-white text-xl md:text-2xl 2xl:text-3xl md:px-20 h-auto">Estamos por debajo del 10% de <span className="font-bold">recirculación</span> promedio. Esto es peligroso para el SEO. Tenemos que corregir urgente  </p>
            </> 
          : ""
          }

      </div>

    </div> 
  )
}

export default PorcentajePromedio