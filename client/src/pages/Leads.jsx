import { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiFilter } from "react-icons/fi";
import toast from "react-hot-toast";
import { getLeads, createLead, updateLead, deleteLead } from "../services/api";
import StatusBadge from "../components/StatusBadge";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";
import ConfirmModal from "../components/ConfirmModal";
import LeadFormModal from "../components/LeadFormModal";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchLeads();
    }, 350);
    return () => clearTimeout(delay);
  }, [search, statusFilter]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await getLeads({
        search: search || undefined,
        status: statusFilter !== "All" ? statusFilter : undefined,
      });
      setLeads(res.data.data);
    } catch (error) {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const openEditForm = (lead) => {
    setEditData(lead);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      setSaving(true);
      if (editData) {
        await updateLead(editData._id, data);
        toast.success("Lead updated successfully");
      } else {
        await createLead(data);
        toast.success("Lead added successfully");
      }
      setFormOpen(false);
      fetchLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await deleteLead(deleteId);
      toast.success("Lead deleted successfully");
      setDeleteId(null);
      fetchLeads();
    } catch (error) {
      toast.error("Failed to delete lead");
    } finally {
      setDeleting(false);
    }
  };

  const statusOptions = ["All", "New", "Contacted", "Follow-up", "Converted", "Lost"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Leads</h2>
          <p className="text-sm text-gray-400">
            Manage and track all your client leads
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium transition-all shadow-lg shadow-purple-500/20 whitespace-nowrap"
        >
          <FiPlus size={18} />
          Add Lead
        </button>
      </div>

      <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex-1">
          <FiSearch className="text-gray-400 flex-shrink-0" size={16} />
          <input
            type="text"
            placeholder="Search by name, email, company, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-full"
          />
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 sm:w-56">
          <FiFilter className="text-gray-400 flex-shrink-0" size={16} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent outline-none text-sm text-white w-full cursor-pointer"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s} className="bg-[#0f1420]">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        {loading ? (
          <Spinner />
        ) : leads.length === 0 ? (
          <EmptyState
            title="No leads found"
            message={
              search || statusFilter !== "All"
                ? "Try adjusting your search or filter."
                : "Get started by adding your first lead."
            }
            actionLabel={!search && statusFilter === "All" ? "Add Lead" : undefined}
            onAction={openAddForm}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Lead
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                    Company
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                    Source
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                    Created
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate">
                            {lead.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {lead.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-400 hidden md:table-cell">
                      {lead.company || "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-400 hidden lg:table-cell">
                      {lead.source}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-5 py-4 text-gray-400 hidden sm:table-cell">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditForm(lead)}
                          className="p-2 rounded-lg hover:bg-blue-500/15 text-gray-400 hover:text-blue-400 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(lead._id)}
                          className="p-2 rounded-lg hover:bg-red-500/15 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <LeadFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        editData={editData}
        loading={saving}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete this lead?"
        message="This action cannot be undone. This will permanently delete the lead record."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}