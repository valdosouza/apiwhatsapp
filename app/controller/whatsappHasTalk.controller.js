
const Base = require('./base.controller.js')  
const db = require("../model");
const Op = db.Sequelize.Op;
const Tb = db.whatsappHasTalk;
class WhatsappHasTalkController extends Base {


  static create = (data) => {
    const promise = new Promise((resolve, reject) => {
      Tb.create(data)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error("WhatsappTalk.create: " + error));
        });
    });
    return promise;
  }

  static update = (data) => {
    const promise = new Promise((resolve, reject) => {
      Tb.update(req.body, {
        where: { id: data.id }
      })
        .then(num => {
          if (num == 1) {
            resolve("WhatsappTalk foi atualizada com sucesso.");
          } else {
            resolve("Nao foi possivel atualizar com id=${id}. Talvez WhatsappTalk não foi encontrada ou req.body está vazio!");
          }
        })
        .catch(err => {
          reject(new Error("WhatsappTalk - " + err));
        });
    });
  }

  static getList(body) {
    const promise = new Promise((resolve, reject) => {
      Tb.sequelize.query(
        'SELECT *  '+
        'FROM tb_whatsapp_has_talk  '+
        'where ( tb_institution_id=? ) '+
        ' and ( tb_whatsapp_id=? )'+
        ' and ( contact_id =? )',
        {
          replacements: [body.tb_institution_id,body.tb_whatsapp_id,body.contact_id ],
          type: Tb.sequelize.QueryTypes.SELECT
        }).then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(new Error("WhatsappTalk:" + err));
        });
    });
    return promise;
  }
}

module.exports =  WhatsappHasTalkController; 