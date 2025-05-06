const { StatusCodes } = require("http-status-codes");
const EmailTemplateSchema = require("../models/EmailTemplate");

const addEmailTemplate = async (req, res) => {
  const template = new EmailTemplateSchema(req.body);
  await template.save();
  res.status(StatusCodes.OK).json(template);
};

const getAllEmailTemplate = async (req, res) => {
  const emailTemplates = await EmailTemplateSchema.find();
  return res.status(StatusCodes.OK).json(emailTemplates);
};

module.exports = { addEmailTemplate, getAllEmailTemplate };
