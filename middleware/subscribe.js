const mongoose = require("mongoose");
const Joi = require("joi");

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 225,
    unique: true,
  },
});

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(225).required().email(),
  });
  return schema.validate(req);
}

function validateSendBulkMail(req) {
  const schema = Joi.object({
    html: Joi.string().min(20).max(10000).required(),
  });
  return schema.validate(req);
}

exports.Subscribe = Subscribe;
exports.validate = validate;
exports.validateSendBulkMail = validateSendBulkMail;
