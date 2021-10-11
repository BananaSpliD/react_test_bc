const url="http://127.0.0.1:3001/";
/**Función para transformar de milisegundos a una fecha en formato :3 sept 1995 
 * @param milliseconds= millisegundos en formato fecha
 * @param options, formato de la fecha a parsear
 */
export function  transformMillisecondsToDate(milliseconds,options){
    let date = new Date(milliseconds); // create Date object
    //let options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString("es-ES",options);
}
/**Dado una id de instructor, busca en el array el instructor con dicho ID
 * @param instructors= array de instructores
 * @param instructorID= ID del instructor
 * @returns el objeto instructor y en caso de que no sea encontrado devuelve null
 */
export function findInstructor(instructors, instructorID) {
    
    for (let index = 0; index < instructors.length; index++) {
        if(instructorID===instructors[index].id){
            return instructors[index];
        }            
    }
    return null;
}
/**Dado una id de lesson, se busca la clase asociada
 * @param instructorID= ID de la clase
 * @param lessons= array de clases
 * @return el objeto clase o en caso de que sea vacio devuelve null
 */
export function findLesson(lessonID,lessons) {
    for (let index = 0; index < lessons.length; index++) {
        if(lessonID.toString()===lessons[index].id.toString()){
            return lessons[index];
        }            
    }
    return null;
}
/**
 * Dado una id de lesson, se busca la clase asociada
 * @param instructorID= ID de la clase
 * @param lessons= array de clases
 * @return devuelve el índice de donde se encuentre el objeto o -1 en caso de que no se encuentre
 */
export function findLessonIndex(lessonID,lessons) {
    for (let index = 0; index < lessons.length; index++) {
        if(lessonID.toString()===lessons[index].id.toString()){
            return index;
        }            
    }
    return -1;
}

/**Dado una id se busca una clave asociada
 * @param lessonID= ID por el que se quiere buscar
 * @param lessons= array de datos
 * @returns devuelve el índice de donde se encuentre el objeto o -1 en caso de que no se encuentre
*/
export function findIndex(id,array) {
    for (let index = 0; index < array.length; index++) {
        if(id===array[index]){
            return index;
        }            
    }
    return -1;
}
export function apiCallGet(url){
    return fetch(url).then(response => response.json());
}
/**Función que realiza el post a la api, para insertar una suscripción
 * @param idUsuario= El id del usuario donde se hará el post de la suscripción
 * @param time= Tiempo que ha renovado la suscripción
 * @param renovate= Renovación automática 
 * @returns devuelve la respuesta del servidor
*/
export function postSuscription(idUsuario,time,renovate){
    console.log({time:time,idUsuario:idUsuario,renovate:renovate});
    return fetch(url+"suscriptions/", {
        method: 'POST',
        headers: {
          'Content-type':'application/json',
        },
        body: JSON.stringify({time:time,idUsuario:idUsuario,renovate:renovate})          
    }).then(response => response.json());

}
/**Función que realiza el post a la api, para insertar una suscripción
 * @param idUsuario= El id del usuario donde se hará el post de la suscripción
 * @returns devuelve la respuesta del servidor
*/
export function deleteSuscription(id) {
   fetch(url+'suscriptions/'+id, {
        method: 'DELETE'           
    }).then(resp => {
            if (resp.ok) {
                return true;
            }
            else {
                throw new Error(resp.status)
            }
        }
    )
}
/**Función que realiza el post a la api, para renovar la suscripción
 * @param idUsuario= El id del usuario donde se hará el post de la suscripción
 * @returns devuelve la respuesta del servidor
*/
export function renovateSuscription(id) {
   return  fetch(url+'renovatesuscription/'+id, {
         method: 'POST',
         headers: {
           'Content-type':'application/json',
         },           
        }).then(response => response.json());
 }
 
//Función para calcular el tiempo restante de una suscripción
//@param time= tiempo de suscripción
//@para timeInit= fecha de inicio de la suscripción
export function calculateTimeLeft(time, timeInit){
    /**Cogemos la fecha de inicio, menos la fecha actual para saber el tiempo que ha pasado desde la suscripción
       * y luego se lo restamos por el tiempo de la suscripción que ha contratado
       * 
      */     
    return time-parseInt((new Date().getTime()-new Date(timeInit).getTime()) / 1000);

}