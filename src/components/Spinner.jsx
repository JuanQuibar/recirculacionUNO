import '../styles/Spinner.css'

const Spinner = () => {
  
  return (

    <div className='contenedor'>
      <div className='texto-spinner'>
        <h1>Calculando...</h1>
        <h2>Esto puedo tardar un par de minutos</h2>
      </div>
      <div className="center">
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