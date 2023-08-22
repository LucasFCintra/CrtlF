const knex = require("../database/connection")

class Lancamentos{

  async findAll(id){

    try{
     var result= await knex.select(["nomeLanc","descLanc","valorLanc","dataLanc","fkUserLanc","fkCatLanc","fkConLanc"]).where({fkUserLanc:id}).table("lancamentos")
      return result
    }catch(err){
      console.log(err)
    }
  }

  async findById(id){
    console.log("Model: ", id)
    try{
     var result = await knex.select(["nomeLanc","descLanc","valorLanc","dataLanc","fkUserLanc","fkCatLanc","fkConLanc"]).where({fkUserLanc:id}).table("lancamentos")
     if(result.length > 0){
      return result[0]
     }else{
       return undefined
     }  
     
    }catch(err){
      console.log(err)
    }
  }
  async findByMes(id){
    console.log("Model: ", id)
    try{
     var result = await knex.select(["nomeLanc","descLanc","valorLanc","dataLanc","fkUserLanc","fkCatLanc","fkConLanc"])
     .where({fkUserLanc:id})
     .addWhere(dataLanc, '>=' , dtInic)
     .addWhere(dataLanc, '<=' , dtfim)
     .table("lancamentos")
     if(result.length > 0){
      return result[0]
     }else{
       return undefined
     }  
     
    }catch(err){
      console.log(err)
    }
  }
  async findByLancamentos(nomeLanc){

    try{
     var result = await knex.select(["nomeLanc","descLanc","valorLanc","dataLanc","fkUserLanc","fkCatLanc","fkConLanc"]).where({idLanc:idLanc}).table("lancamentos")
     if(result.length > 0){
      return true
     }else{
       return false
     }  
     
    }catch(err){
      console.log(err)
    }
  }

  async create(nomeLanc,descLanc,valorLanc,dataLanc,fkUserLanc,fkCatLanc,fkConLanc){
    // console.log("Model: ", NOME, DESCRICAO)
    try{
   await knex.insert({nomeLanc:nomeLanc,descLanc:descLanc,valorLanc:valorLanc,dataLanc:dataLanc,fkUserLanc:fkUserLanc,fkCatLanc:fkCatLanc,fkConLanc:fkConLanc}).table("lancamentos")
      // .raw(`insert into lancamentos(IDRECEITA,nomeLanc,descLanc,valorLanc,dataLanc,fkUserLanc,fkCatLanc,fkConLanc) VALUES(NULL,'${nomeLanc}','${descLanc}','${valorLanc}',${dataLanc},${fkUserLanc},${fkCatLanc},${fkConLanc})`)
      
    }catch(err){
      console.log(err)
    }

  }

  async update(IDRECEITA,nomeLanc,descLanc,valorLanc,dataLanc,fkUserLanc,fkCatLanc,fkConLanc){

    var id = await this.findById(IDRECEITA)

    if(id != undefined){
      var edit = {};

      if(nomeLanc != undefined){
        if(nomeLanc != Lancamentos.nomeLanc){
          var result = await this.findByLancamentos(nomeLanc)
            if(result == false){
              edit.nomeLanc = nomeLanc
            }else{
              return{status: false, err:"Lancamentos ja cadastrada"}
            }
        }
      }
      if(descLanc != undefined){
        edit.descLanc = descLanc
      }
      if(dataLanc != undefined){
        edit.dataLanc = dataLanc
      }   
       if(valorLanc != undefined){
        edit.valorLanc = valorLanc
      }
      if(fkUserLanc != undefined){
        edit.fkUserLanc = fkUserLanc
      }
      if(fkCatLanc != undefined){
        let id = await this.findById(fkConLanc)
        
        if(id != undefined){
        edit.fkCatLanc = fkCatLanc
      }
    }
      if(fkConLanc != undefined){
        
        let id = await this.findById(fkConLanc)
        
        if(id != undefined){
        edit.fkConLanc = fkConLanc
      }

    }

      try{
        await  knex.update(edit).where({IDRECEITA:IDRECEITA}).table("lancamentos")
        return {status:true}
      }catch(err){
        return {status:false,err:err}
      }

    }else{
      return { status: false, err: "A Lancamentos não existe!" }
    }

  }

  async delete(IDRECEITA){

    console.log("Model: ", IDRECEITA)
    var idIsTrue = await this.findById(IDRECEITA)
    console.log(idIsTrue)
    if(idIsTrue != undefined){
      try{
        await knex.delete().where({IDRECEITA:IDRECEITA}).table("lancamentos")
        return {stats: true}
      }catch(err){
        return {stats:false, err:err}
      }
    }


  }

}

module.exports = new Lancamentos();