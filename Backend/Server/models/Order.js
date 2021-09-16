const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    productos: [
      {
        producto: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        cantidad: { type: "Number", required: true, min: 1 },
      },
    ],
    usuario: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    precioTotal: { type: "Number", required: true, min: 0 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Order", orderSchema);
