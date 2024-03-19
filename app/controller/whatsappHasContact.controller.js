
const Base = require('./base.controller.js')
const db = require("../model");
const Op = db.Sequelize.Op;
const Tb = db.whatsappHasContact;
class WhatsappHasContactController extends Base {


  static create = (data) => {
    const promise = new Promise((resolve, reject) => {
      Tb.create(data)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(new Error("WhatsappContact - " + err));
        });
    });
    return promise;
  }

  static update = (data) => {

    const promise = new Promise((resolve, reject) => {
      
      Tb.update(data, {
        where: { id: data.id }
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(new Error("WhatsappContact - " + err));
        });
    });
    return promise;
  }

  static notReady(user) {
    const promise = new Promise((resolve, reject) => {
      Tb.sequelize.query(
        'UPDATE  tb_whatsapp_has_contact  set ' +
        ' active = "S", ' +
        ' created_at =?, ' +
        ' updated_at =? ' +
        'where tb_institution_id=?  ' +
        'and id=?',
        {
          replacements: [user.created_at, user.updated_at, user.tb_institution_id, user.id],
          type: Tb.sequelize.UPDATE,
        }).then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(new Error("WhatsappContact:" + err));
        });
    });
    return promise;
  }

  static getList(body) {
    const promise = new Promise((resolve, reject) => {
      Tb.sequelize.query(
        'SELECT *  ' +
        'FROM tb_whatsapp_has_contact  ' +
        'where tb_institution_id=?  ' +
        'and tb_whatsapp_id=?',
        {
          replacements: [body.tb_institution_id, body.tb_whatsapp_id],
          type: Tb.sequelize.QueryTypes.SELECT
        }).then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(new Error("WhatsappContact:" + err));
        });
    });
    return promise;
  }


  static getId(body) {
    const promise = new Promise((resolve, reject) => {
      Tb.sequelize.query(
        'SELECT id, active  ' +
        'FROM tb_whatsapp_has_contact  ' +
        'where ( tb_institution_id=? )  ' +
        'and  ( tb_whatsapp_id=? )' +
        ' and ( id =? ) ',
        {
          replacements: [body.tb_institution_id, body.tb_whatsapp_id, body.id],
          type: Tb.sequelize.QueryTypes.SELECT
        }).then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(new Error("Whatsapp:" + err));
        });
    });
    return promise;
  }
}

module.exports = WhatsappHasContactController; 