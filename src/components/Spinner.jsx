import '../styles/Spinner.css'

const Spinner = () => {
  
  return (

    <div className="bg-black h-screen m-0 flex flex-col justify-center">

        <div className="text-white w-auto h-auto flex flex-col mb-8 justify-center"> 

          <h2 className="text-4xl text-center leading-relaxed">Calculando...</h2>
          <p className="text-center"> Esto puerde tardar un momento</p>
        
        </div>

        <div className="flex h-auto justify-center">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        
    </div>
    
  )
}

export default Spinner