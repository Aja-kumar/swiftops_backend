const Invoice = require('../models/Invoice');
const Appointment = require('../models/Appointment');
const Campaign = require('../models/Campaign');
const Lead = require('../models/Lead');



// Invoicing
const createInvoice = async (businessId, clientName, amount, dueDate) => {
  return await Invoice.create({ businessId, clientName, amount, dueDate });
};

// CRM
const createLead = async (businessId, name, email, phone) => {
  return await Lead.create({ businessId, name, email, phone });
};

// Scheduling
const createAppointment = async (businessId, clientName, date, description) => {
  return await Appointment.create({ businessId, clientName, date, description });
};

// Marketing Automation
const createCampaign = async (businessId, name, type) => {
  return await Campaign.create({ businessId, name, type });
};

module.exports = {
  createInvoice,
  createLead,
  createAppointment,
  createCampaign,
};