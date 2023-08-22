const knex = require("../database/connection")
const Conta = require("../models/Contas")


class contaController{

  async index(req,res){
    var conta = await Conta.findAll()
    res.json(conta)
  }

  async indexOne(req,res){
    var id = req.params.id;
    var conOne = await Conta.findById(id)
    if (conOne == undefined) {
      res.status(404).json({})
    } else {
      res.json(conOne)
    }
  }

  async create(req,res){
    var{NOMECONTA,TIPOCONTA,VALORCONTA,VALORATUAL} = req.body;
    console.log(NOMECONTA,TIPOCONTA,VALORCONTA,VALORATUAL)

    if(NOMECONTA != undefined || TIPOCONTA != undefined || VALORCONTA < 0){
      await Conta.create(NOMECONTA,TIPOCONTA,VALORCONTA,VALORATUAL)
      res.status(200).send("Dados inserIDCONTAo com sucesso")
    }else{
      res.status(400).json({err:"Undefined informations"})
    }

  }

  async update(req,res){

    var {IDCONTA,NOMECONTA,TIPOCONTA,VALORCONTA,VALORATUAL} = req.body;

    if(IDCONTA != undefined && IDCONTA > 0){

      var result = await Conta.update(IDCONTA,NOMECONTA,TIPOCONTA,VALORCONTA,VALORATUAL)
      
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
    var ID= req.body.IDCONTA;
    console.log("Controller: ", ID)

     var result = await Conta.delete(ID)
       
     if(result.stats){
          res.status(200).send("Dados excluidos com sucesso")
        }else{
          res.status(406).send(result.err)
        }
   
  }

}//fim da classe

module.exports = new contaController()