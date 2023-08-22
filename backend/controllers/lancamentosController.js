const knex = require("../database/connection")
const Receita = require("../models/Lancamentos")
 
class receitaController{

  async index(req,res){
    var id = req.body;
    var receita = await Receita.findAll(id)
    res.json(receita)
  }

  async indexOne(req,res){
    var id = req.body;
    var desOne = await Receita.findById(id)
    if (desOne == undefined) {
      res.status(404).json({})
    } else {
      res.json(desOne)
    }
  }

  async indexMes(req,res){
    var {idLanc,dtInic,dtFim} = req.body
    var desOne = await Receita.findByMes(idLanc,dtInic,dtFim);
    if (desOne == undefined) {
      res.status(404).json({})
    } else {
      res.json(desOne)
    }
  }

  async create(req,res){
    var{nomeLanc,descLanc,dataLanc,valorLanc,dataLanc,fkUserLanc,fkCatLanc,fkConLanc} = req.body;
    console.log(nomeLanc,DATARECEITA,descLanc,valorLanc,dataLanc,fkUserLanc,fkCatLanc,fkConLanc)

    if(nomeLanc != undefined || descLanc != undefined || valorLanc < 0 || dataLanc != undefined  || fkUserLanc < 0 || fkCatLanc < 0  || fkConLanc < 0){
       await Receita.create(nomeLanc,descLanc,DATARECEITA,valorLanc,dataLanc,fkUserLanc,fkCatLanc,fkConLanc)
      // res.render("../views/home")
      res.status(200).json({msg:"Dados inserido com sucesso"})
     
    }else{
      res.status(400).json({err:"Undefined informations"})
    } 

  }

  async update(req,res){

    var {idLanc,nomeLanc,descLanc,DATARECEITA,valorLanc,dataLanc,fkUserLanc,fkCatLanc,fkConLanc} = req.body;

    if(idLanc != undefined && idLanc > 0){

      var result = await Receita.update(idLanc,nomeLanc,descLanc,DATARECEITA,valorLanc,dataLanc,fkUserLanc,fkCatLanc,fkConLanc)
      
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
    var ID= req.body.idLanc;
    console.log("Controller: ", ID)

     var result = await Receita.delete(ID)
       
     if(result.stats){
          res.status(200).send("Dados excluidos com sucesso")
        }else{
          res.status(406).send(result.err)
        }
   
  }

}//fim da classe

module.exports = new receitaController()