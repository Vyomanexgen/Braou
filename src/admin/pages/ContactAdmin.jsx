import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { adminFetch } from "../utils/adminFetch";

export default function ContactAdmin() {
  const [contactId, setContactId] = useState(null);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editing, setEditing] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [backupValue, setBackupValue] = useState("");

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------- FETCH CONTACT DATA ---------- */
  const fetchContact = async () => {
    try {
      setFetching(true);

      const res = await adminFetch("/footer-contact", {
        cache: "no-store",
      });

      const result = await res.json();

      if (Array.isArray(result?.data) && result.data.length > 0) {
        const lastItem = result.data[result.data.length - 1];

        setContactId(lastItem._id);
        setName(lastItem.name || "");
        setDesignation(lastItem.designation || "");
        setEmail(lastItem.email || "");
        setPhone(lastItem.phone || "");
      }
    } catch (err) {
      console.error("Fetch contact failed", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  /* ---------- VALIDATION ---------- */
  const validateField = (field, value) => {
    if (!value.trim()) {
      alert("Value cannot be empty");
      return false;
    }

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        alert("Invalid email address");
        return false;
      }
    }

    if (field === "phone") {
      const phoneRegex = /^[0-9+\-\s]{7,15}$/;
      if (!phoneRegex.test(value)) {
        alert("Invalid phone number");
        return false;
      }
    }

    return true;
  };

  /* ---------- SAVE FIELD ---------- */
  const saveField = async (field, value) => {
    if (!contactId || saving) return;

    if (!validateField(field, value)) return;

    try {
      setSaving(true);

      const payload = {
        name,
        designation,
        email,
        phone,
        [field]: value,
      };

      await adminFetch("/footer-contact", {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (field === "name") setName(value);
      if (field === "designation") setDesignation(value);
      if (field === "email") setEmail(value);
      if (field === "phone") setPhone(value);

      setEditing(null);
      setTempValue("");
      setBackupValue("");
    } catch (err) {
      console.error("Update contact failed", err);
      alert("Failed to update contact");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- CANCEL EDIT ---------- */
  const cancelEdit = () => {
    if (saving) return;

    setTempValue(backupValue);
    setEditing(null);
    setBackupValue("");
  };

  /* ---------- CARD ---------- */
  const Card = ({ label, value, field }) => (
    <div className="mb-6">
      <h3 className="font-bold text-lg text-blue-900 mb-2">{label}</h3>

      <div className="relative bg-cyan-100 rounded-xl p-5 w-full">
        {editing !== field ? (
          <>
            <p className="font-semibold pr-10 break-words">{value || "—"}</p>

            <button
              disabled={saving}
              onClick={() => {
                setTempValue(value);
                setBackupValue(value);
                setEditing(field);
              }}
              className="absolute top-4 right-4 text-cyan-700
              hover:scale-110 transition disabled:opacity-50"
            >
              <FaEdit />
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              disabled={saving}
              className="w-full rounded-lg p-3 border
              focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />

            <div className="flex gap-3">
              <button
                onClick={() => saveField(field, tempValue)}
                disabled={saving}
                className="flex-1 bg-cyan-700 text-white py-2 rounded-lg
                hover:bg-cyan-800 transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={cancelEdit}
                disabled={saving}
                className="flex-1 border border-cyan-700 text-cyan-700 py-2 rounded-lg
                hover:bg-cyan-200 transition disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  /* ---------- LOADING ---------- */
  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-cyan-300 border-t-cyan-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <h1 className="text-2xl font-extrabold mb-6">Contact Info</h1>

      <Card label="Name" value={name} field="name" />
      <Card label="Designation" value={designation} field="designation" />
      <Card label="Email" value={email} field="email" />
      <Card label="Phone" value={phone} field="phone" />
    </div>
  );
}
