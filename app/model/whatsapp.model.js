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
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "id"
    },
    session_id: {
      type: DataTypes.STRING(100),
      allowNull: false,      
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "session_id"
    },
    active: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "sn",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "active"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_at"
    }
  };
  const options = {
    tableName: "tb_whatsapp",
    comment: "",
    timestamps: false,
    indexes: []
  
  };
  const WhatsappModel = sequelize.define("tb_whatsapp_model", attributes, options);
  return WhatsappModel;

};