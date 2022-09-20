import { arreglarCaracteres} from "../helpers"


const NotaPrueba = ({nota}) => {

    const {autor, titulo, porcentaje, path} = nota


  return (
      //PARA LA PRUEBA DE ANIMACIÓN SE CAMBIA MB-3 POR M-0 Y SE AGREGA h-[10%] y border, 
      <div className=" text-white flex items-end justify-between  bg-gray-600 px-5 m-0 rounded-md box-border  border-gray-700 border-solid border-4">
        <div className="truncate mr-5 text-clip">
            

            <div className="font-bold text-lg  "> 
            {arreglarCaracteres(titulo)}  
            </div> 
        </div> 
        
          {porcentaje >= 40 ? <div className="text-2xl font-extrabold text-green-500">
          {`${Math.trunc(porcentaje)}%`} </div> 
            : porcentaje >= 15 ? <div className="text-2xl font-extrabold text-blue-400"> {`${Math.trunc(porcentaje)}%`} </div> 
            : porcentaje < 15 ? <div className="text-2xl font-extrabold text-red-500">
            {`${Math.trunc(porcentaje)}%`} </div> 
            : ""
          }
          
      </div>
    
  )
}

export default NotaPrueba