const knex = require("../database/connection")

class usuariosModel {

  async findAll(id) {

    try {
      var result = await knex.select(["idUser", "nomeUser", "emailUser", "senhaUser", "telefoneUser"]).table("usuarios").where({ idUser: id })
      return result
    } catch (err) {
      console.log(err)
    }
  }

  async findById(id) {

    try {
      var result = await knex.select(["idUser", "nomeUser", "emailUser", "senhaUser", "telefoneUser"]).where({ idUser: id }).table("usuarios")
      if (result.length > 0) {
        return result[0]
      } else {
        return undefined
      }

    } catch (err) {
      console.log(err)
    }
  }
  async findByCat(nomeUser) {

    try {
      var result = await knex.select(["idUser", "nomeUser", "emailUser", "senhaUser", "telefoneUser"]).where({ nomeUser: nomeUser }).table("usuarios")
      if (result.length > 0) {
        return true
      } else {
        return false
      }

    } catch (err) {
      console.log(err)
    }
  }

  async create(nomeUser, emailUser, senhaUser, telefoneUser) {
    // console.log("Model: ", nomeUser, emailUser)
    try {
      await knex.insert({ nomeUser: nomeUser, emailUser: emailUser, senhaUser: senhaUser, telefoneUser: telefoneUser }).table("usuarios")

    } catch (err) {
      console.log(err)
      res.status(406).send(err)
    }

  }

  async update(idUser, nomeUser, emailUser, senhaUser, telefoneUser) {

    var id = await this.findById(idUser)
        console.log('updateModel: '+id, idUser)
    if (id != undefined) {
      var edit = {};

      if (nomeUser != undefined) {
        if (nomeUser != usuariosModel.nomeUser) {
          edit.nomeUser = nomeUser

        }
      }
      if (emailUser != undefined) {
        edit.emailUser = emailUser
      }
      if (senhaUser != undefined) {
        edit.senhaUser = senhaUser
      }  if (telefoneUser != undefined) {
        edit.telefoneUser = telefoneUser
      }
      console.log('updateModel :'+ edit)
      try {
        await knex.update(edit).where({ idUser: idUser}).table("usuarios")
        return { status: true }
      } catch (err) {
        return { status: false, err: err }
      }

    } else {
      return { status: false, err: "A categoria não existe!" }
    }

  }

  async delete(idUser) {

    var idIsTrue = await this.findById(idUser)

    if (idIsTrue != undefined) {
      try {
        await knex.delete().where({ idUser: idUser }).table("usuarios")
        return { stats: true }
      } catch (err) {
        return { stats: false, err: err }
      }
    }


  }

} // fim da classe

module.exports = new usuariosModel();