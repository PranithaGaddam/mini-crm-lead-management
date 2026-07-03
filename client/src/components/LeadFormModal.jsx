import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "Website",
  status: "New",
  notes: "",
};

export default function LeadFormModal({ isOpen, onClose, onSubmit, editData, loading }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        email: editData.email || "",
        phone: editData.phone || "",
        company: editData.company || "",
        source: editData.source || "Website",
        status: editData.status || "New",
        notes: editData.notes || "",
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const value = e.target.name === "email" ? e.target.value.trim() : e.target.value;
    setForm({ ...form, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const inputClass = (field) =>
    `w-full bg-white/5 border ${
      errors[field] ? "border-red-500/50" : "border-white/10"
    } rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
      />
      <div className="relative glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fadeIn border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            {editData ? "Edit Lead" : "Add New Lead"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Full Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={inputClass("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-400 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Email *
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={inputClass("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Phone *
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={inputClass("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Company
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Acme Inc."
                className={inputClass("company")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Source
              </label>
              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                className={inputClass("source")}
              >
                <option className="bg-[#0f1420]">Website</option>
                <option className="bg-[#0f1420]">Referral</option>
                <option className="bg-[#0f1420]">Social Media</option>
                <option className="bg-[#0f1420]">Email Campaign</option>
                <option className="bg-[#0f1420]">Cold Call</option>
                <option className="bg-[#0f1420]">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass("status")}
              >
                <option className="bg-[#0f1420]">New</option>
                <option className="bg-[#0f1420]">Contacted</option>
                <option className="bg-[#0f1420]">Follow-up</option>
                <option className="bg-[#0f1420]">Converted</option>
                <option className="bg-[#0f1420]">Lost</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Add any notes about this lead..."
              rows={3}
              className={inputClass("notes") + " resize-none"}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl glass hover:bg-white/10 text-gray-300 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
            >
              {loading ? "Saving..." : editData ? "Update Lead" : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}