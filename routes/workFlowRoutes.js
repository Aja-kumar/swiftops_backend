const express = require('express');
const workflowController = require('../controllers/workFlowController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected routes (require authentication and 2FA)
router.use(authenticate);

// Invoicing
router.post('/invoices', workflowController.createInvoice);

// CRM
router.post('/leads', workflowController.createLead);

// Scheduling
router.post('/appointments', workflowController.createAppointment);

// Marketing Automation
router.post('/campaigns', workflowController.createCampaign);

module.exports = router;