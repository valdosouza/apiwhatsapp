const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    tb_institution_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tb_institution_id"
    },
    tb_whatsapp_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tb_whatsapp_id"
    },
    contact_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "contact_id"
    },
    body_text: {      
      type: DataTypes.BLOB, 
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "body_text"
    },        
    type_way: {
      type: DataTypes.STRING(8),
      allowNull: true,     
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "type_way"
    }

  };
  const options = {
    tableName: "tb_whatsapp_has_talk",
    comment: "",
    timestamps : false,
    indexes: []
  
  };
  const WhatsappHasTalkModel = sequelize.define("tb_whatsapp_has_talk_model", attributes, options);
  return WhatsappHasTalkModel;

};