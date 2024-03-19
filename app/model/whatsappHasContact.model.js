const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    tb_institution_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "tb_institution_id"
    },
    tb_whatsapp_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "tb_whatsapp_id"
    },
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "id"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name"
    },  
    img_full_url: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "img_full_url"
    },        
    active: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "S",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "active"
    }

  };
  const options = {
    tableName: "tb_whatsapp_has_contact",
    comment: "",
    timestamps: false,
    indexes: []
  
  };
  const WhatsappHasContactModel = sequelize.define("tb_whatsapp_has_contact_model", attributes, options);
  return WhatsappHasContactModel;

};