const knex = require("../database/connection")
const Objetivo = require("../models/Objetivos")


class objetivoController{

  async index(req,res){
    var objetivo = await Objetivo.findAll()
    res.json(objetivo)
  }

  async indexOne(req,res){
    var id = req.params.id;
    var metOne = await Objetivo.findById(id)
    if (metOne == undefined) {
      res.status(404).json({})
    } else {
      res.json(metOne)
    }
  }

  async create(req,res){
    var{idObj,nomeObj,descObj,valorObj,metaObj,dataObj,fkUserObj} = req.body;
    console.log(idObj,nomeObj,descObj,valorObj,metaObj,dataObj,fkUserObj)

    if(nomeObj != undefined || descObj != undefined || metaObj != undefined || valorObj < 0){
      await Objetivo.create(nomeObj,descObj,valorObj,metaObj,dataObj,fkUserObj)
      res.status(200).send("Dados inseridObjo com sucesso")
    }else{
      res.status(400).json({err:"Undefined informations"})
    }

  }

  async update(req,res){

    var {idObj,nomeObj,descObj,valorObj,metaObj,dataObj,fkUserObj} = req.body;
    console.log('Obj Controler: ',idObj,nomeObj,descObj,valorObj,metaObj,dataObj,fkUserObj)
    if(idObj != undefined && idObj > 0){

      var result = await Objetivo.update(idObj,nomeObj,descObj,valorObj,metaObj,dataObj,fkUserObj)
      
      if(result.status){
        res.status(200).send("Dados atualizados com sucesso")
      }else{
        res.status(406).send(result.err)
      }
      
    }else{
      res.status(406).send("ID INVALIDO")
    }

  }

  async delete(req,res){
    var ID= req.body.idObj;
    console.log("Controller: ", ID)

     var result = await Objetivo.delete(ID)
       
     if(result.stats){
          res.status(200).send("Dados excluidos com sucesso")
        }else{
          res.status(406).send(result.err)
        }
   
  }

}//fim da classe

module.exports = new objetivoController()