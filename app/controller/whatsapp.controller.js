
const Base = require('./base.controller.js')
const db = require("../model");
const Op = db.Sequelize.Op;
const Tb = db.whatsapp;
class WhatsappController extends Base {


  static create = (data) => {
    const promise = new Promise((resolve, reject) => {
      Tb.create(data)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(new Error("WhatsApp - " + err));
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
            resolve("WhatsApp foi atualizada com sucesso.");
          } else {
            resolve("Nao foi possivel atualizar com id=${id}. Talvez WhatsApp não foi encontrada ou req.body está vazio!");
          }
        })
        .catch(err => {
          reject(new Error("WhatsApp - " + err));
        });
    });
  }

  static getList(body) {
    const promise = new Promise((resolve, reject) => {
      Tb.sequelize.query(
        'SELECT *  '+
        'FROM tb_whatsapp  '+
        'where tb_institution_id=?  ',
        {
          replacements: [body.tb_institution_id ],
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
  static getId(body) {
    const promise = new Promise((resolve, reject) => {
      Tb.sequelize.query(
        'SELECT *  '+
        'FROM tb_whatsapp  '+
        'where (tb_institution_id=? )  '+
        ' and (id=?)',
        {
          replacements: [body.tb_institution_id,body.id ],
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

module.exports =  WhatsappController; 