const Knex = require("knex")({
  dialect:'mysql',
  client:'mysql'
})
const knex = require("../database/connection")

class Objetivos{

  async findAll(){

    try{
    var result= await knex.select(["idObj","nomeObj","descObj","valorObj","metaObj","dataObj","fkUserObj"]).table("objetivos")
      return result
    }catch(err){
      console.log(err)
    }
  }

  async findById(id){
    // console.log("Model: ", id)
    try{
     var result = await knex.select(["idObj","nomeObj","descObj","valorObj","metaObj","dataObj","fkUserObj"]).where({idObj:id}).table("objetivos")
     if(result.length > 0){
      return result[0]
     }else{
       return undefined
     }  
     
    }catch(err){
      console.log(err)
    }
  }
  async findByObjetivos(nomeObj){

    try{
     var result = await knex.select(["nomeObj","descObj","valorObj","metaObj","dataObj","fkUserObj"]).where({nomeObj:nomeObj}).table("objetivos")
     if(result.length > 0){
      return true
     }else{
       return false
     }  
     
    }catch(err){
      console.log(err)
    }
  }

  async create(nomeObj,descObj,valorObj,metaObj,dataObj,fkUserObj){
    // console.log("Model: ", NOME, DESCRICAO)
    try{
      await knex.insert({nomeObj:nomeObj,descObj:descObj,valorObj:valorObj,metaObj:metaObj,dataObj,fkUserObj:dataObj,fkUserObj}).table("objetivos")

    }catch(err){
      console.log(err)
      res.status(406).send(err)
    }

  }

  async update(idObj,nomeObj,descObj,valorObj,metaObj,dataObj,fkUserObj){

    var id = await this.findById(idObj)

    if(id != undefined){
      var edit = {};

      if(nomeObj != undefined){
        if(nomeObj != Objetivos.nomeObj){
          var result = await this.findByObjetivos(nomeObj)
            if(result == false){
              edit.nomeObj = nomeObj
            }else{
              return{status: false, err:"Objetivos ja cadastrada"}
            }
        }
      }
      if(descObj != undefined){
        edit.descObj = descObj
      }
      if(metaObj != undefined){
        edit.metaObj = metaObj
      }
      if(dataObj != undefined){ 
        edit.dataObj = dataObj
      }
      if(valorObj != undefined){  
        edit.valorObj = valorObj
      }


      try{
        await  knex.update(edit).where({idObj:idObj}).table("objetivos")
        return {status:true}
      }catch(err){
        return {status:false,err:err}
      }

    }else{
      return { status: false, err: "A Objetivos não existe!" }
    }

  }

  async delete(idObj){

    console.log("Model: ", idObj)
    var idIsTrue = await this.findById(idObj)
    console.log(idIsTrue)
    if(idIsTrue != undefined){
      try{
        await knex.delete().where({idObj:idObj}).table("objetivos")
        return {stats: true}
      }catch(err){
        return {stats:false, err:err}
      }
    }


  }

}

module.exports = new Objetivos();