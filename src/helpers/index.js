
export function arreglarCaracteres (texto) {
    return String(texto)    
        .replace('&ntilde;', 'ñ')
        .replace('&ntild;', 'ñ')
        .replace('&iexcl;', '¡')
        .replace('&Ntilde;', 'Ñ')
        .replace('&amp;', '&')
        .replace('&Iacute;', 'Í')
        .replace('&Uacute;', 'Ú')
        .replace('&aacute;', 'á')
        .replace('&eacute;', 'é')
        .replace('&iacute;', 'í')
        .replace('&ntilde;', 'ñ')
        .replace('&oacute;','ó')
        .replace('t&oacute;','tó')
        .replace('&uacute;','ú')
        .replace('&uuml;', 'ü')                       
        .replace('&quot;', '"')                       
        .replace('e&quot;', 'e"')                       
        .replace('\"', '"')                       
        .replace('Ã', 'í')                       
  }


let notasCopy = []
export function cambiarPosiciones (notasRender, notasCopy) {
  
  notasCopy.forEach(element =>{
    
    for(let i = 0; i <notasRender.length; i++){
      if (element.path == notasRender[i].path) {
          
            const anterior = notasRender[i].posicionNueva
            element.posicionAnterior = anterior

            const nueva = element.posicionNueva
            element.posicionNueva = nueva
      } 
    }
    
  }  
  )
  
  return notasCopy  

}


export function copiarArray (notas) {
  const cambiar = notas.slice()
  return cambiar
}


let temporal = []
export function promediarPorcentajeNota (arrayTotal) {

  temporal =JSON.parse(localStorage.getItem('temporal')) ?? []

  if(temporal.length !== 0){
    
    arrayTotal.forEach(element => {

      for(let i = 0; i<arrayTotal.length; i++){
          
        if(temporal[i] && (element.path==temporal[i].path)){

          const recirculacion = element.recirculacion
          temporal[i].recirculacion = recirculacion

          const concurrentes = element.concurrentes
          temporal[i].concurrentes = concurrentes

          const porcentaje = element.porcentaje
          temporal[i].porcentaje = porcentaje

           temporal[i].porcentajeArray = [...temporal[i].porcentajeArray, element.porcentaje];

          //Establece la cantidad de porcentajes de recirculación que acumula de cada nota para luego promediar
          temporal[i].porcentajeArray.length > 40 && temporal[i].porcentajeArray.shift();

          temporal[i].porcentajePromedioNota = temporal[i].porcentajeArray.reduce((a,b) => a + b) / temporal[i].porcentajeArray.length;

          temporal[i].contador++

        } else {
          temporal[i]==element
          }

      }

    }) 

    return temporal.sort((a, b) =>{
      return b.concurrentes - a.concurrentes
  })
    
  } else{
    return arrayTotal
    /* temporal = arrayTotal
    return temporal */
    
    }
  
}

let temporalConcurrentes = []
export function minConcurrentes (notas) {
  temporalConcurrentes = JSON.parse(JSON.stringify(notas)).sort((a,b) =>{
      return b.concurrentes - a.concurrentes
  })
  let min = 0

  for(let i=0; i<20; i++){
      min = temporalConcurrentes[i].concurrentes
  }

  return min -1
 
}

export function porcentajeAutor (ordenar) {
  const autores = ordenar.map(e => {
    const objeto = {
      autor: e.autor,
      porcentaje: 0
    }
    return objeto
  })

  const eliminarDuplicados = autores.filter((e, index) =>{
    for(let i = 0; i< autores.length; i++){
      if ((e.autor == autores[i].autor) && (index == i)){
      }
    }
  })
  return eliminarDuplicados

}
