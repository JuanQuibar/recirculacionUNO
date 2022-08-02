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
  }

  export function calcularPorcentaje (a, b) {
    const porcentaje = (a/b) * 100
    return porcentaje
  }
