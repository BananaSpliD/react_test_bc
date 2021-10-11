var express = require("express")
var app = express()

var bp = require('body-parser')
var lista = new Map()
var cors = require('cors')

app.use(bp.json())
app.use(cors())

app.options('*', cors()) 

//obtener un item dado su id
//asumimos que el id está en un parámetro HTTP del mismo nombre
//es decir, habrá que hacer una petición a /obtener?id=XXX
app.get("/suscriptions/:idUsuario", function(pet, resp){
    //los parámetros HTTP se obtienen como cadenas, convertirlo a entero
    var id = parseInt(pet.params.idUsuario)
    //si no es un número, error
    if (isNaN(id)) {
        resp.status(400)
        resp.send({mensaje:"El dato debe ser numérico"})
    }    else {
        //obtenemos el item del Map
        var dato = lista.get(id)
        //si != undefined es que lo hemos encontrado, lo enviamos al cliente
        if (dato) {
            resp.status(200)
            resp.send(dato)
        }
        else {
            resp.send({})
            resp.status(200)
        }
    }
})

app.post("/suscriptions", function(pet, resp){
    var idUsuario=pet.body.idUsuario;
    var time=pet.body.time;
    var renovate=pet.body.renovate;
    if (idUsuario&&time) {
        if(lista.get(idUsuario)){
            
            resp.status(400)
            resp.send({mensaje:"Usuario ya tiene una suscripción"})
        }else{
            
            var obj = {idUsuario:idUsuario, timeInit:new Date(), time:time,renovate:renovate}
            lista.set(idUsuario,obj)
            resp.status(201)
            resp.send(obj)
        }
    }
    else {
        resp.status(400)
        resp.send({mensaje:"Falta algún campo"})
    }
}) 
app.post("/renovatesuscription/:idUsuario", function(pet, resp){
    let idUsuario= parseInt(pet.params.idUsuario)
    if(lista.get(idUsuario)){
        if (idUsuario) {
            let item=lista.get(idUsuario);
            item.timeInit=new Date();            
            lista.set(idUsuario,item)
            resp.status(200)
            console.log(item)
            resp.send(item)
        }
        else {
            resp.status(400)
            resp.send({mensaje:"Falta algún campo"})
        }
    }
}) 
app.delete('/suscriptions/:id', function(pet, resp){
    var id = parseInt(pet.params.id)
    //si no es un número, error
    if (isNaN(id)) {
        resp.status(400)
        resp.send({mensaje:"El dato debe ser numérico"})
    }
    else {
        //borramos el item del Map
        var dato = lista.delete(id)

        //si != undefined es que estaba, y lo hemos borrado
        if (dato) {
            resp.status(200)
            resp.end()
        }
        else {
            resp.status(404)
            resp.end()
        }
    }
})

//poner en marcha el servidor
app.listen(3001, function(){
    lista.set(2, {idUsuario:2, timeInit:new Date(), time:70,renovate:false})

    console.log("Servidor escuchando en el 3001...")
})