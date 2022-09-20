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

export function verificarLocalStorage (consultarApi, setOrdenar) {
  if (localStorage.length == 0){
    consultarApi()
  } else{
    setOrdenar(JSON.parse(localStorage.getItem('temporal')).sort((a, b) =>{
      return b.porcentaje - a.porcentaje
  })) 
  }
}


export function calcularPorcentaje (a, b) {
  const porcentaje = (a/b) * 100
  return porcentaje
}

export function setearPosiciones (notasRender, notas){
  console.log(notasRender[0].path)
  notasRender = notas.map(nota =>{
    for(let i = 0; i < notasRender.length; i++){
      if(nota.path == notasRender[i].path){
        notasRender[i].posicionAnterior = notasRender[i].posicionNueva;
        notasRender[i].posicionNueva = nota.posicionNueva;
        notasRender[i].porcentaje = nota.porcentaje
      } else if(nota.path !== notasRender[i].path) {
        notasRender[i] = Object.assign({}, nota)

      }
    }
  })
}

/* export function setearPosiciones (notasRender, notas) {
  notas.map(nota => {
    
      console.log(notasRender.path)
    
  })
} */


let temporal = []
export function comparacion (arrayMapeado) {

  temporal =JSON.parse(localStorage.getItem('temporal')) ?? []

  if(temporal.length !== 0){
    
    arrayMapeado.forEach(element => {

      for(let i = 0; i<arrayMapeado.length; i++){

          if(element.path==temporal[i].path){

            const recirculacion = temporal[i].recirculacion + element.recirculacion
            temporal[i].recirculacion = recirculacion

            const concurrentes = temporal[i].concurrentes + element.concurrentes
            temporal[i].concurrentes = concurrentes

            let porcentaje = 0
            recirculacion == 0 && concurrentes == 0 ? porcentaje = -1 : porcentaje = (recirculacion / concurrentes) * 100

            temporal[i].porcentaje = porcentaje

            temporal[i].contador++
            
            
            
            /* temporal[i].recirculacion.push(element.recirculacion[0])
            temporal[i].concurrentes.push(element.concurrentes[0]) */

          }
      }
    }) 
    return temporal
    
  } 
  
  else{
    temporal = arrayMapeado
    return temporal

    
    }
  
}

