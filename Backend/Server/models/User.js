const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    password: { type: "String", required: true },
    email: { type: "String", required: true, unique: true },
    nombre: { type: "String", required: true },
    direccion: { type: "String", default: "" },
    codigoPostal: { type: "String", default: "" },
    credito: { type: "Number", default: 0, min: 0 },
    pedidos: [{ type: mongoose.Types.ObjectId, ref: "Order", default: [] }],
  },
  { versionKey: false }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
