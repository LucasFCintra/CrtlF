const knex = require("../database/connection")
const Categoria = require("../models/Categorias")


class categoriasController{

  async index(req,res){
    var fkUserCat = req.body;
    console.log('catController: '+ JSON.stringify(fkUserCat))
    var cat = await Categoria.findAll(fkUserCat)
    res.json(cat)
  }

  async indexOne(req,res){
    var id = req.body;
    var idUser = 1// req.bodyUser;
    console.log('catController: '+ id +' '+idUser)
    var catOne = await Categoria.findById(id,idUser)
    if (catOne == undefined) {
      res.status(404).json({})
    } else {
      res.json(catOne)
    }
  }

  async create(req,res){
    var{nomeCat,descCat,ativoCat,fkUserCat} = req.body;
    // console.log("Controler: ", nomeCat,descCat)
    if(nomeCat != undefined || descCat != undefined){
      await Categoria.create(nomeCat,descCat,ativoCat,fkUserCat)
      res.status(200).send("Dados inserido com sucesso")
    }else{
      res.status(400).json({err:"Undefined informations"})
    }

  }

  async update(req,res){

    var {idCat,nomeCat,descCat,ativoCat,fkUserCat} = req.body;

    if(idCat != undefined && idCat > 0){

      var result = await Categoria.update(idCat,nomeCat,descCat,ativoCat,fkUserCat)
      
      if(result.status){
        res.status(200).send("Dados atualizados com sucesso")
      }else{
        res.status(406).send(result.err)
      }
      
    }else{
      res.status(406).send("idCat INVALidCatO")
    }

  }

  async delete(req,res){
    var idCat= req.body.idCat;
    console.log("Controller: ", idCat)

     var result = await Categoria.delete(idCat)
       
     if(result.stats){
          res.status(200).send("Dados excluidos com sucesso")
        }else{
          res.status(406).send(result.err)
        }
   
  }

}//fim da classe

module.exports = new categoriasController()