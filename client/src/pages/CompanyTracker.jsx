import { useEffect, useMemo, useState } from "react";

import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../services/companyService";

import CompanyTable from "../components/company/CompanyTable";
import CompanyForm from "../components/company/CompanyForm";
import DeleteModal from "../components/company/DeleteModal";
import SearchFilterBar from "../components/company/SearchFilterBar";

export default function CompanyTracker() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await getCompanies();
      setCompanies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.companyName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        company.role
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        company.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [companies, search, statusFilter]);

  const handleSubmit = async (formData) => {
    try {
      if (selectedCompany) {
        await updateCompany(selectedCompany._id, formData);
      } else {
        await createCompany(formData);
      }

      setShowForm(false);
      setSelectedCompany(null);

      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);

      setDeleteTarget(null);

      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl p-8">

        <div className="mb-8 flex items-center justify-between">

          <h1 className="text-4xl font-bold text-violet-400">
            Company Tracker
          </h1>

          <button
            onClick={() => {
              setSelectedCompany(null);
              setShowForm(true);
            }}
            className="rounded-xl bg-violet-600 px-5 py-3 hover:bg-violet-700"
          >
            + Add Company
          </button>

        </div>

        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {loading ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            Loading...
          </div>
        ) : (
          <CompanyTable
            companies={filteredCompanies}
            onEdit={(company) => {
              setSelectedCompany(company);
              setShowForm(true);
            }}
            onDelete={setDeleteTarget}
          />
        )}

        {showForm && (
          <CompanyForm
            company={selectedCompany}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              setSelectedCompany(null);
            }}
          />
        )}

        <DeleteModal
          company={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />

      </div>

    </div>
  );
}