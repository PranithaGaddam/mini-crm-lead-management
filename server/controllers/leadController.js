import Lead from "../models/Lead.js";

// @desc Get all leads (with search & filter)
export const getLeads = async (req, res) => {
  try {
    const { search, status, source } = req.query;
    const query = {};

    if (status && status !== "All") query.status = status;
    if (source && source !== "All") query.source = source;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single lead
export const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create lead
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Update lead
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Delete lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }
    res.status(200).json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get dashboard stats
export const getStats = async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: "New" });
    const contacted = await Lead.countDocuments({ status: "Contacted" });
    const followUp = await Lead.countDocuments({ status: "Follow-up" });
    const converted = await Lead.countDocuments({ status: "Converted" });
    const lost = await Lead.countDocuments({ status: "Lost" });

    const recentActivity = await Lead.find().sort({ updatedAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: { total, newLeads, contacted, followUp, converted, lost, recentActivity },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};