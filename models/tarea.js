const { Schema, model } = require("mongoose");

const TareaSchema = Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },

  especialidad: {
    type: Schema.Types.ObjectId,
    ref: "Especialidad",
    required: true,
  },

  canEmpleados: {
    type: Number,
    required: true,
    default: 1,
  },

  esfuerzo: {
    type: Number,
    required: true,
    default: 3,
  },

  estado: {
    type: Boolean,
    default: true,
  },

  descripcion: { type: String, default: "Prueba descripcion de la tarea" },
  /* disponible: { type: Boolean, defult: true }, */
});

TareaSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Tarea", TareaSchema);
