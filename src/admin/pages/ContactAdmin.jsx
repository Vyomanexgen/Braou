// import React, { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { adminFetch } from "../utils/adminFetch";

// /* =========================
//    EDITABLE FIELD (OUTSIDE)
//    ========================= */
// function EditableField({
//   label,
//   value,
//   field,
//   isEditing,
//   tempValue,
//   saving,
//   onEdit,
//   onChange,
//   onSave,
//   onCancel,
// }) {
//   return (
//     <div className="mb-6">
//       <h3 className="font-bold text-lg text-blue-900 mb-2">{label}</h3>

//       <div className="relative bg-cyan-100 rounded-xl p-5 w-full">
//         {!isEditing ? (
//           <>
//             <p className="font-semibold pr-10 break-words">{value || "—"}</p>

//             <button
//               disabled={saving}
//               onClick={onEdit}
//               className="absolute top-4 right-4 text-cyan-700
//               hover:scale-110 transition disabled:opacity-50"
//             >
//               <FaEdit />
//             </button>
//           </>
//         ) : (
//           <div className="flex flex-col gap-3">
//             <input
//               autoFocus
//               type="text"
//               value={tempValue}
//               onChange={(e) => onChange(e.target.value)}
//               disabled={saving}
//               className="w-full rounded-lg p-3 border
//               focus:outline-none focus:ring-2 focus:ring-cyan-600"
//             />

//             <div className="flex gap-3">
//               <button
//                 onClick={onSave}
//                 disabled={saving}
//                 className="flex-1 bg-cyan-700 text-white py-2 rounded-lg
//                 hover:bg-cyan-800 transition disabled:opacity-60"
//               >
//                 {saving ? "Saving..." : "Save"}
//               </button>

//               <button
//                 onClick={onCancel}
//                 disabled={saving}
//                 className="flex-1 border border-cyan-700 text-cyan-700 py-2 rounded-lg
//                 hover:bg-cyan-200 transition disabled:opacity-60"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================
//    MAIN COMPONENT
//    ========================= */
// export default function ContactAdmin() {
//   const [contactId, setContactId] = useState(null);

//   const [name, setName] = useState("");
//   const [designation, setDesignation] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const [editing, setEditing] = useState(null);
//   const [tempValue, setTempValue] = useState("");
//   const [backupValue, setBackupValue] = useState("");

//   const [fetching, setFetching] = useState(true);
//   const [saving, setSaving] = useState(false);

//   /* ---------- FETCH ---------- */
//   useEffect(() => {
//     const fetchContact = async () => {
//       try {
//         const res = await adminFetch("/footer-contact", {
//           cache: "no-store",
//         });
//         const result = await res.json();

//         if (Array.isArray(result?.data) && result.data.length) {
//           const last = result.data[result.data.length - 1];
//           setContactId(last._id);
//           setName(last.name || "");
//           setDesignation(last.designation || "");
//           setEmail(last.email || "");
//           setPhone(last.phone || "");
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setFetching(false);
//       }
//     };

//     fetchContact();
//   }, []);

//   /* ---------- VALIDATION ---------- */
//   const validateField = (field, value) => {
//     if (!value.trim()) return false;

//     if (field === "email") {
//       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//     }

//     if (field === "phone") {
//       return /^[0-9+\-\s]{7,15}$/.test(value);
//     }

//     return true;
//   };

//   /* ---------- SAVE ---------- */
//   const saveField = async (field, value) => {
//     if (!contactId || saving) return;
//     if (!validateField(field, value)) {
//       alert("Invalid value");
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         name,
//         designation,
//         email,
//         phone,
//         [field]: value,
//       };

//       await adminFetch("/footer-contact", {
//         method: "PUT",
//         body: JSON.stringify(payload),
//       });

//       if (field === "name") setName(value);
//       if (field === "designation") setDesignation(value);
//       if (field === "email") setEmail(value);
//       if (field === "phone") setPhone(value);

//       setEditing(null);
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ---------- CANCEL ---------- */
//   const cancelEdit = () => {
//     if (saving) return;
//     setTempValue(backupValue);
//     setEditing(null);
//   };

//   /* ---------- LOADING ---------- */
//   if (fetching) {
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <div className="w-10 h-10 border-4 border-cyan-300 border-t-cyan-700 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-6">
//       <h1 className="text-2xl font-extrabold mb-6">Contact Info</h1>

//       <EditableField
//         label="Name"
//         value={name}
//         field="name"
//         isEditing={editing === "name"}
//         tempValue={tempValue}
//         saving={saving}
//         onEdit={() => {
//           setEditing("name");
//           setTempValue(name);
//           setBackupValue(name);
//         }}
//         onChange={setTempValue}
//         onSave={() => saveField("name", tempValue)}
//         onCancel={cancelEdit}
//       />

//       <EditableField
//         label="Designation"
//         value={designation}
//         field="designation"
//         isEditing={editing === "designation"}
//         tempValue={tempValue}
//         saving={saving}
//         onEdit={() => {
//           setEditing("designation");
//           setTempValue(designation);
//           setBackupValue(designation);
//         }}
//         onChange={setTempValue}
//         onSave={() => saveField("designation", tempValue)}
//         onCancel={cancelEdit}
//       />

//       <EditableField
//         label="Email"
//         value={email}
//         field="email"
//         isEditing={editing === "email"}
//         tempValue={tempValue}
//         saving={saving}
//         onEdit={() => {
//           setEditing("email");
//           setTempValue(email);
//           setBackupValue(email);
//         }}
//         onChange={setTempValue}
//         onSave={() => saveField("email", tempValue)}
//         onCancel={cancelEdit}
//       />

//       <EditableField
//         label="Phone"
//         value={phone}
//         field="phone"
//         isEditing={editing === "phone"}
//         tempValue={tempValue}
//         saving={saving}
//         onEdit={() => {
//           setEditing("phone");
//           setTempValue(phone);
//           setBackupValue(phone);
//         }}
//         onChange={setTempValue}
//         onSave={() => saveField("phone", tempValue)}
//         onCancel={cancelEdit}
//       />
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { adminFetch } from "../utils/adminFetch";

/* Utility to convert &amp; back to & */
const decodeHTMLEntities = (text) => {
  if (!text) return "";
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

/* =========================
   EDITABLE FIELD (OUTSIDE)
   ========================= */
function EditableField({
  label,
  value,
  field,
  isEditing,
  tempValue,
  saving,
  onEdit,
  onChange,
  onSave,
  onCancel,
}) {
  // Decode the value for display
  const displayValue = decodeHTMLEntities(value);

  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg text-blue-900 mb-2">{label}</h3>

      <div className="relative bg-cyan-100 rounded-xl p-5 w-full">
        {!isEditing ? (
          <>
            {/* USE DECODED VALUE HERE */}
            <p className="font-semibold pr-10 break-words">{displayValue || "—"}</p>

            <button
              disabled={saving}
              onClick={onEdit}
              className="absolute top-4 right-4 text-cyan-700
              hover:scale-110 transition disabled:opacity-50"
            >
              <FaEdit />
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              autoFocus
              type="text"
              value={tempValue}
              onChange={(e) => onChange(e.target.value)}
              disabled={saving}
              className="w-full rounded-lg p-3 border
              focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />

            <div className="flex gap-3">
              <button
                onClick={onSave}
                disabled={saving}
                className="flex-1 bg-cyan-700 text-white py-2 rounded-lg
                hover:bg-cyan-800 transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={onCancel}
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
}

/* =========================
   MAIN COMPONENT
   ========================= */
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

  /* ---------- FETCH ---------- */
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await adminFetch("/footer-contact", {
          cache: "no-store",
        });
        const result = await res.json();

        if (Array.isArray(result?.data) && result.data.length) {
          const last = result.data[result.data.length - 1];
          setContactId(last._id);
          // Decode data when it arrives from the API
          setName(decodeHTMLEntities(last.name) || "");
          setDesignation(decodeHTMLEntities(last.designation) || "");
          setEmail(decodeHTMLEntities(last.email) || "");
          setPhone(decodeHTMLEntities(last.phone) || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    fetchContact();
  }, []);

  /* ---------- VALIDATION ---------- */
  const validateField = (field, value) => {
    if (!value.trim()) return false;
    if (field === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (field === "phone") return /^[0-9+\-\s]{7,15}$/.test(value);
    return true;
  };

  /* ---------- SAVE ---------- */
  const saveField = async (field, value) => {
    if (!contactId || saving) return;
    if (!validateField(field, value)) {
      alert("Invalid value");
      return;
    }

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
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    if (saving) return;
    setTempValue(backupValue);
    setEditing(null);
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-cyan-300 border-t-cyan-700 rounded-full animate-spin" />
      </div>
    );
  }

  // Helper to trigger edit with decoded value
  const handleStartEdit = (field, currentVal) => {
    setEditing(field);
    const cleanVal = decodeHTMLEntities(currentVal);
    setTempValue(cleanVal);
    setBackupValue(cleanVal);
  };

  return (
    <div className="w-full px-6">
      <h1 className="text-2xl font-extrabold mb-6">Contact Info</h1>

      <EditableField
        label="Name"
        value={name}
        field="name"
        isEditing={editing === "name"}
        tempValue={tempValue}
        saving={saving}
        onEdit={() => handleStartEdit("name", name)}
        onChange={setTempValue}
        onSave={() => saveField("name", tempValue)}
        onCancel={cancelEdit}
      />

      <EditableField
        label="Designation"
        value={designation}
        field="designation"
        isEditing={editing === "designation"}
        tempValue={tempValue}
        saving={saving}
        onEdit={() => handleStartEdit("designation", designation)}
        onChange={setTempValue}
        onSave={() => saveField("designation", tempValue)}
        onCancel={cancelEdit}
      />

      <EditableField
        label="Email"
        value={email}
        field="email"
        isEditing={editing === "email"}
        tempValue={tempValue}
        saving={saving}
        onEdit={() => handleStartEdit("email", email)}
        onChange={setTempValue}
        onSave={() => saveField("email", tempValue)}
        onCancel={cancelEdit}
      />

      <EditableField
        label="Phone"
        value={phone}
        field="phone"
        isEditing={editing === "phone"}
        tempValue={tempValue}
        saving={saving}
        onEdit={() => handleStartEdit("phone", phone)}
        onChange={setTempValue}
        onSave={() => saveField("phone", tempValue)}
        onCancel={cancelEdit}
      />
    </div>
  );
}