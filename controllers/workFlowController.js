const workflowService = require('../services/workFlowService');

// Invoicing
const createInvoice = async (req, res) => {
  const { businessId, clientName, amount, dueDate } = req.body;
  const invoice = await workflowService.createInvoice(businessId, clientName, amount, dueDate);
  res.status(201).json({ message: 'Invoice created successfully', invoice });
};

// CRM
const createLead = async (req, res) => {
  const { businessId, name, email, phone } = req.body;
  const lead = await workflowService.createLead(businessId, name, email, phone);
  res.status(201).json({ message: 'Lead created successfully', lead });
};

// Scheduling
const createAppointment = async (req, res) => {
  const { businessId, clientName, date, description } = req.body;
  const appointment = await workflowService.createAppointment(businessId, clientName, date, description);
  res.status(201).json({ message: 'Appointment created successfully', appointment });
};

// Marketing Automation
const createCampaign = async (req, res) => {
  const { businessId, name, type } = req.body;
  const campaign = await workflowService.createCampaign(businessId, name, type);
  res.status(201).json({ message: 'Campaign created successfully', campaign });
};

module.exports = {
  createInvoice,
  createLead,
  createAppointment,
  createCampaign,
};