import Nota from "./Nota"
import './index.css'


const ListadoNotas = ({notas}) => {

  return (
    
    <div className="h-screen">
      <div className="h-[90%] flex flex-col justify-between mt-5" >
      
        {notas.map(nota => (

              <Nota
                  key={nota.path}
                  nota={nota}

              />)
        ) }
      
      </div>

    </div>
    
  )

}

export default ListadoNotas