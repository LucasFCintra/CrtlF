const knex = require("../database/connection")
const Usuario = require("../models/Usuarios")


class usuariosController{

  async index(req,res){
    var idUser = req.params.id;
    // console.log('userController: '+ JSON.stringify(idUser))
    var cat = await Usuario.findAll(idUser)
    res.json(cat)
  }

  async indexOne(req,res){
    var id = req.params.idUser;
    // console.log('userController: '+ id )
    var catOne = await Usuario.findById(id)
    if (catOne == undefined) {
      res.status(404).json({})
    } else {
      res.json(catOne)
    }
  }

  async create(req,res){
    var{nomeUser,emailUser,senhaUser,telefoneUser} = req.body;
    // console.log("Controler: ", nomeCat,descCat)
    if(nomeUser != undefined || emailUser != undefined || senhaUser != undefined){
      await Usuario.create(nomeUser,emailUser,senhaUser,telefoneUser)
      res.status(200).send("Dados inserido com sucesso")
    }else{
      res.status(400).json({err:"Undefined informations"})
    }

  }

  async update(req,res){

    var {idUser,nomeUser,emailUser,senhaUser,telefoneUser} = req.body;
    console.log('updateCont: '+idUser,nomeUser,emailUser,senhaUser,telefoneUser)
    if(idUser != undefined && idUser > 0){

      var result = await Usuario.update(idUser,nomeUser,emailUser,senhaUser,telefoneUser)
      
      if(result.status){
        res.status(200).send("Dados atualizados com sucesso")
      }else{
        res.status(406).send(result.err)
      }
      
    }else{
      res.status(406).send("idUser INVALidUserO")
    }

  }

  async delete(req,res){
    var idUser= req.body.idUser;
    console.log("Controller: ", idUser)

     var result = await Usuario.delete(idUser)
       
     if(result.stats){
          res.status(200).send("Dados excluidos com sucesso")
        }else{
          res.status(406).send(result.err)
        }
   
  }

}//fim da classe

module.exports = new usuariosController()