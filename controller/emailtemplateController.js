const EmailTemplate = require('../models/template');
const sendingEmail = require('../utils/sendingEmail');
require('dotenv').config();

module.exports = {
    getlistEmail: async(_, res) =>{
        try {
            const template = await EmailTemplate.find();
            return res.status(200).json({ message: 'The template has been retrieved successfully', template});
        } catch (err) {
            return res.status(500).json({ message: err});
        }
    },

    getEmail: async(req, res) => {
        try {
            const { id } = req.params;
            const template = await EmailTemplate.findById(id);
            return res.status(200).json({ message: `Has successfully retrieved the document ${id}`, template});
        } catch (err) {
            return res.status(500).json({ message: err});
        }
    },

    createEmail: async(req, res) => {
        try {
            const { name, header, body, cssFile } = req.body;
            const createEmailTemplate = await EmailTemplate.create({
                name, 
                header,
                body,
                cssFile,
            });
            return res.status(200).json({ message: 'Have successfully created an email template', createEmailTemplate});
        } catch (err) {
            console.log(err);
			return res.status(500).json({ message: err });
        }
    },

    editEmailTemplate: async (req, res) => {
        try {
            const{ id } = req.params;
            const template = await EmailTemplate.findById(id);
            const updateTemplatebody = {
                name: req.body.name || template.name,
                header: req.body.header || template.header,
				body: req.body.body || template.body,
				cssFile: req.body.cssFile || template.cssFile,
            };
            const updateEmailTemplate = await EmailTemplate.findByIdAndUpdate(id, updateTemplatebody, {
				new: true,
			});
			return res.status(200).json({
				message: `Succesfully updated document ${id}`,
				updateEmailTemplate,
			}); 
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    },

    sendEmail: async(req, res) => {
        try {
            const { id } = req.params;
            const template = await EmailTemplate.findById(id);
            await sendingEmail(
                'stevanitasya499@gmail.com',
                'yeay',
                JSON.stringify(template)
            );
            return res.status(200).json({ message: `Succesfully sent email`})
        } catch (err) {
            console.log(error);
			return res.status(500).json({ message: error });
        }
    },
};