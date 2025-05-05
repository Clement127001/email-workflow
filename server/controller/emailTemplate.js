const EmailTemplateSchema = require("../models/EmailTemplate");

const addEmailTemplate = async (req, res) => {
  const template = new EmailTemplateSchema(req.body);
  await template.save();
  res.json(template);
};

const getAllEmailTemplate = async (req, res) => {
  const emailTemplates = await EmailTemplateSchema.find();
  return res.json(emailTemplates);
};

module.exports = { addEmailTemplate, getAllEmailTemplate };
