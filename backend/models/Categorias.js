const knex = require("../database/connection")

class categoriasModel{

  async findAll(id){
    try{
     var result= await knex.select(["idCat","nomeCat","descCat","fkUserCat"]).where({fkUserCat:id}).table("categorias")
     console.log('CatModel:'  + JSON.stringify(id) +' | '+result )

     return result
    }catch(err){
      console.log(err)
    }
  }

  async findById(id,idUser){
    console.log('CatModel:'  + id + ' ' + idUser )

    try{
     var result = await knex.select(["idCat","nomeCat","descCat","fkUserCat"])
     .where({idCat:id})
    //  .andWhere({fkUserCat:idUser})
     .table("categorias")
     if(result.length > 0){
      return result[0]
     }else{
       return undefined
     }  
     
    }catch(err){
      console.log(err)
    }
  }
  async findByCat(nomeCat,fkUserCat){

    try{
     var result = await knex.select(["nomeCat","descCat"]).where({nomeCat:nomeCat,fkUserCat:fkUserCat}).table("categorias")
     if(result.length > 0){
      return true
     }else{
       return false
     }  
     
    }catch(err){
      console.log(err)
    }
  }

  async create(nomeCat,descCat,ativoCat,fkUserCat){
    // console.log("Model: ", nomeCat, descCat)
    try{
      await knex.insert({nomeCat:nomeCat,descCat:descCat,ativoCat:ativoCat, fkUserCat:fkUserCat}).table("categorias")

    }catch(err){
      console.log(err)
      res.status(406).send(err)
    }

  }

  async update(idCat,nomeCat,descCat,ativoCat,fkUserCat){

    var id = await this.findById(idCat)

    if(id != undefined){
      var edit = {};

      if(nomeCat != undefined){
        if(nomeCat != Categoria.nomeCat){
          var result = await this.findByCat(nomeCat,fkUserCat)
            if(result == false){
              edit.nomeCat = nomeCat
            }else{
              return{status: false, err:"Categoria ja cadastrada"}
            }
        }
      }
      if(descCat != undefined){
        edit.descCat = descCat
      }
      if(ativoCat != undefined){
        edit.ativoCat = ativoCat
      } 

      try{
        await  knex.update(edit).where({idCat:idCat,fkUserCat:fkUserCat}).table("categorias")
        return {status:true}
      }catch(err){
        return {status:false,err:err}
      }

    }else{
      return { status: false, err: "A categoria não existe!" }
    }

  }

  async delete(idCat){

    var idIsTrue = await this.findById(idCat)

    if(idIsTrue != undefined){
      try{
        await knex.delete().where({idCat:idCat}).table("categorias")
        return {stats: true}
      }catch(err){
        return {stats:false, err:err}
      }
    }


  }
  
} // fim da classe

module.exports = new categoriasModel();