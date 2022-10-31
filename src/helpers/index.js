import { useState, useEffect } from 'react'

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


export function calcularPorcentaje (a, b) {
  const porcentaje = (a/b) * 100
  return porcentaje
}


let notasCopy = []
export function cambiarPosiciones (notasRender, notasCopy) {
  
  notasCopy.forEach(element =>{
    
    for(let i = 0; i <notasCopy.length; i++){
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
export function comparacion (arrayTotal) {

  temporal =JSON.parse(localStorage.getItem('temporal')) ?? []

  if(temporal.length !== 0){
    
    arrayTotal.forEach(element => {

      for(let i = 0; i<arrayTotal.length; i++){

          if(element.path==temporal[i].path){

            const recirculacion = temporal[i].recirculacion + element.recirculacion
            temporal[i].recirculacion = recirculacion

            const concurrentes = temporal[i].concurrentes + element.concurrentes
            temporal[i].concurrentes = concurrentes

            let porcentaje = 0
            recirculacion == 0 && concurrentes == 0 ? porcentaje = -1 : porcentaje = (recirculacion / concurrentes) * 100

            temporal[i].porcentaje = porcentaje

            temporal[i].contador++
            
          }

      }

    }) 

    return temporal
    
  } 
  
  else{
    temporal = arrayTotal
    return temporal
    
    }
  
}

