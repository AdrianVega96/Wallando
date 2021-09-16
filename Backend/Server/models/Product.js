const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    nombre: { type: "String", required: true, unique: true },
    descripcion: { type: "String", required: true, unique: true },
    precioEuros: { type: "Number", required: true, min: 0 },
    foto: { type: "String", required: true },
    categoria: {
      type: "String",
      required: true,
      enum: [
        "Ordenadores",
        "Televisores",
        "Smartwatchs",
        "Tablets",
        "Accesorios",
      ],
    },
    topVentas: { type: "Boolean", default: false },
    enOferta: { type: "Boolean", default: false },
    stock: { type: "Number", default: 0, min: 0 },
  },
  { versionKey: false }
);

productSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Product", productSchema);
