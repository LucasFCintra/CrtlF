const knex = require("../database/connection")

class Conta{

  async findAll(){

    try{
     var result= await knex.select(["NOMECONTA","TIPOCONTA","VALORCONTA","VALORATUAL"]).table("conta")
      return result
    }catch(err){
      console.log(err)
    }
  }

  async findById(id){
    // console.log("Model: ", id)
    try{
     var result = await knex.select(["NOMECONTA","TIPOCONTA","VALORCONTA","VALORATUAL"]).where({IDCONTA:id}).table("conta")
     if(result.length > 0){
      return result[0]
     }else{
       return undefined
     }  
     
    }catch(err){
      console.log(err)
    }
  }
  async findByConta(NOMECONTA){

    try{
     var result = await knex.select(["NOMECONTA","TIPOCONTA","VALORCONTA","VALORATUAL"]).where({NOMECONTA:NOMECONTA}).table("conta")
     if(result.length > 0){
      return true
     }else{
       return false
     }  
     
    }catch(err){
      console.log(err)
    }
  }

  async create(NOMECONTA,TIPOCONTA,VALORCONTA,VALORATUAL){
    // console.log("Model: ", NOME, DESCRICAO)
    try{
      await knex.insert({NOMECONTA:NOMECONTA,TIPOCONTA:TIPOCONTA,VALORCONTA:VALORCONTA,VALORATUAL:VALORATUAL}).table("conta")

    }catch(err){
      console.log(err)
      res.status(406).send(err)
    }

  }

  async update(IDCONTA,NOMECONTA,TIPOCONTA,VALORCONTA,VALORATUAL){

    var id = await this.findById(IDCONTA)

    if(id != undefined){
      var edit = {};

      if(NOMECONTA != undefined){
        if(NOMECONTA != Conta.NOMECONTA){
          var result = await this.findByConta(NOMECONTA)
            if(result == false){
              edit.NOMECONTA = NOMECONTA
            }else{
              return{status: false, err:"Categoria ja cadastrada"}
            }
        }
      }
      if(TIPOCONTA != undefined){
        edit.TIPOCONTA = TIPOCONTA
      }
      if(VALORCONTA != undefined){
        edit.VALORCONTA = VALORCONTA
      }
      if(VALORATUAL != undefined){
        edit.DESCRICAO = VALORATUAL
      }

      try{
        await  knex.update(edit).where({IDCONTA:IDCONTA}).table("conta")
        return {status:true}
      }catch(err){
        return {status:false,err:err}
      }

    }else{
      return { status: false, err: "A Conta não existe!" }
    }

  }

  async delete(IDCONTA){

    console.log("Model: ", IDCONTA)
    var idIsTrue = await this.findById(IDCONTA)
    console.log(idIsTrue)
    if(idIsTrue != undefined){
      try{
        await knex.delete().where({IDCONTA:IDCONTA}).table("conta")
        return {stats: true}
      }catch(err){
        return {stats:false, err:err}
      }
    }


  }

}

module.exports = new Conta();