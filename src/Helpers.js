//Función para transformar de milisegundos a una fecha en formato :3 sept 1995 
//@param milliseconds= millisegundos en formato fecha
//@param options, formato de la fecha a parsear
export function  transformMillisecondsToDate(milliseconds,options){
    let date = new Date(milliseconds); // create Date object
    //let options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString("es-ES",options);
}
//Dado una id de instructor, busca en el array el instructor con dicho ID
//@param instructors= array de instructores
//@param instructorID= ID del instructor
export function findInstructor(instructors, instructorID) {
    for (let index = 0; index < instructors.length; index++) {
        if(instructorID===instructors[index].id){
            return instructors[index];
        }            
    }
    return null;
}
//Dado una id de lesson, se busca la clase asociada
//@param instructorID= ID de la clase
//@param lessons= array de clases
export function findLesson(lessonID,lessons) {
    console.log(lessonID,lessons,"quepasa")
    for (let index = 0; index < lessons.length; index++) {
        if(lessonID.toString()===lessons[index].id.toString()){
            return lessons[index];
        }            
    }
    return null;
}