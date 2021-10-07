//Función para transformar de milisegundos a una fecha en formato :3 sept 1995 
//@param milliseconds= millisegundos en formato fecha
//@param options, formato de la fecha a parsear
export function  transformMillisecondsToDate(milliseconds,options){
    let date = new Date(milliseconds); // create Date object
    //let options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString("es-ES",options);
}