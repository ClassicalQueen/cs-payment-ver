// "use client";

// import { useEffect, useState } from "react";
// import Avatar from "@/components/shared/Avatar";
// import Spinner from "@/components/shared/Spinner";
// import { C, FONT } from "@/lib/constants";
// import { AuthUser } from "@/lib/types";
// import { apiGetAllUsers, apiCreateUser, apiEditUser, apiDeleteUser } from "@/lib/api";

// function inputStyle(): React.CSSProperties {
//   return {
//     width: "100%", background: "#0a0d14",
//     border: `1px solid ${C.border}`, borderRadius: 10,
//     color: C.text, padding: "11px 14px", fontSize: 13,
//     outline: "none", fontFamily: FONT.body, boxSizing: "border-box",
//   };
// }

// export default function UsersTab() {
//   const [users, setUsers] = useState<AuthUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showCreate, setShowCreate] = useState(false);
//   const [editTarget, setEditTarget] = useState<AuthUser | null>(null);
//   const [surname, setSurname] = useState("");
//   const [matric, setMatric] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState<"student" | "admin">("student");
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     async function load() {
//       try {
//         setUsers(await apiGetAllUsers());
//       } catch (e: unknown) {
//         setError(e instanceof Error ? e.message : "Failed to load users");
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, []);

//   function openCreate() {
//     setSurname(""); setMatric(""); setPassword(""); setRole("student");
//     setEditTarget(null); setShowCreate(true);
//   }

//   function openEdit(u: AuthUser) {
//     setEditTarget(u); setSurname(u.surname); setMatric(u.matric_number);
//     setPassword(""); setRole(u.role); setShowCreate(false);
//   }

//   async function handleCreate() {
//     if (!surname.trim() || !matric.trim() || !password.trim()) return;
//     try {
//       setSaving(true);
//       const u = await apiCreateUser({ surname, matric_number: matric, password, role });
//       setUsers((p) => [...p, u]);
//       setShowCreate(false);
//     } catch (e: unknown) {
//       setError(e instanceof Error ? e.message : "Failed to create user");
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function handleEdit() {
//     if (!editTarget) return;
//     try {
//       setSaving(true);
//       const u = await apiEditUser(editTarget.id, { surname, matric_number: matric });
//       setUsers((p) => p.map((x) => (x.id === u.id ? u : x)));
//       setEditTarget(null);
//     } catch (e: unknown) {
//       setError(e instanceof Error ? e.message : "Failed to update user");
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function handleDelete(id: string) {
//     if (!confirm("Delete this user?")) return;
//     try {
//       await apiDeleteUser(id);
//       setUsers((p) => p.filter((u) => u.id !== id));
//     } catch (e: unknown) {
//       setError(e instanceof Error ? e.message : "Failed to delete");
//     }
//   }

//   const isModal = showCreate || editTarget !== null;

//   return (
//     <div className="flex flex-col gap-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//         <div>
//           <h2 className="text-xl font-bold" style={{ color: "#e8dfc8", fontFamily: FONT.head }}>Users</h2>
//           <p className="text-sm mt-1" style={{ color: C.muted, fontFamily: FONT.mono }}>
//             Manage student and admin accounts.
//           </p>
//         </div>
//         <button
//           onClick={openCreate}
//           className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold self-start sm:self-auto"
//           style={{ background: C.accent, color: "#0f1117", fontFamily: FONT.mono }}
//         >
//           <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
//             <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
//           </svg>
//           New User
//         </button>
//       </div>

//       {error && (
//         <div className="p-3 rounded-lg text-sm" style={{ background: C.redBg, color: C.red, border: `1px solid rgba(217,83,79,0.3)`, fontFamily: FONT.mono }}>
//           {error}
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center py-12"><Spinner size={28} /></div>
//       ) : (
//         <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ borderBottom: `1px solid ${C.border2}` }}>
//                   {["User", "Matric No.", "Role", "Actions"].map((h) => (
//                     <th key={h} className="text-left py-2.5 px-4 text-xs uppercase tracking-widest font-normal whitespace-nowrap" style={{ color: C.dimmed, fontFamily: FONT.mono, background: C.card }}>
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="py-12 text-center text-sm" style={{ color: C.dimmed, fontFamily: FONT.mono, background: C.card }}>
//                       No users found.
//                     </td>
//                   </tr>
//                 ) : users.map((u, i) => (
//                   <tr
//                     key={u.id}
//                     style={{ borderBottom: i < users.length - 1 ? `1px solid ${C.border2}` : "none", background: C.card }}
//                     onMouseEnter={(e) => (e.currentTarget.style.background = C.cardHov)}
//                     onMouseLeave={(e) => (e.currentTarget.style.background = C.card)}
//                   >
//                     <td className="py-3 px-4">
//                       <div className="flex items-center gap-3">
//                         <Avatar name={u.surname} size={32} />
//                         <span className="font-medium" style={{ color: C.text, fontFamily: FONT.body }}>{u.surname}</span>
//                       </div>
//                     </td>
//                     <td className="py-3 px-4 text-xs whitespace-nowrap" style={{ color: C.accent, fontFamily: FONT.mono }}>{u.matric_number}</td>
//                     <td className="py-3 px-4">
//                       <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: u.role === "admin" ? C.redBg : C.blueBg, color: u.role === "admin" ? C.red : C.blue, border: `1px solid ${u.role === "admin" ? "rgba(217,83,79,0.3)" : "rgba(91,141,238,0.3)"}`, fontFamily: FONT.mono }}>
//                         {u.role}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex items-center gap-2">
//                         <button onClick={() => openEdit(u)} className="text-xs px-2.5 py-1 rounded-lg" style={{ background: C.border, color: C.text, fontFamily: FONT.mono }}>Edit</button>
//                         <button onClick={() => handleDelete(u.id)} className="p-1.5 rounded-lg" style={{ background: C.redBg, color: C.red, border: `1px solid rgba(217,83,79,0.3)` }}>
//                           <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M1.5 3h9M4.5 3V2h3v1M5 5v4M7 5v4M2 3l.65 6.5h6.7L10 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Modal */}
//       {isModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: "rgba(0,0,0,0.75)" }} onClick={() => { setShowCreate(false); setEditTarget(null); }}>
//           <div className="w-full max-w-md rounded-2xl p-7" style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: "0 24px 60px rgba(0,0,0,0.8)" }} onClick={(e) => e.stopPropagation()}>
//             <h3 className="text-lg font-bold mb-5" style={{ color: "#e8dfc8", fontFamily: FONT.head }}>
//               {editTarget ? "Edit User" : "Create User"}
//             </h3>
//             <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: C.muted, fontFamily: FONT.mono }}>Surname *</label>
//             <input value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" style={{ ...inputStyle(), marginBottom: 14 }} />
//             <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: C.muted, fontFamily: FONT.mono }}>Matric Number *</label>
//             <input value={matric} onChange={(e) => setMatric(e.target.value)} placeholder="e.g. CSC/2021/001" style={{ ...inputStyle(), fontFamily: FONT.mono, marginBottom: 14 }} />
//             {!editTarget && (
//               <>
//                 <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: C.muted, fontFamily: FONT.mono }}>Password *</label>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ ...inputStyle(), marginBottom: 14 }} />
//                 <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: C.muted, fontFamily: FONT.mono }}>Role</label>
//                 <select value={role} onChange={(e) => setRole(e.target.value as "student" | "admin")} style={{ ...inputStyle(), marginBottom: 24 }}>
//                   <option value="student">Student</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </>
//             )}
//             {editTarget && <div style={{ marginBottom: 24 }} />}
//             <div className="flex gap-3">
//               <button onClick={() => { setShowCreate(false); setEditTarget(null); }} className="flex-1 py-2.5 rounded-xl text-sm" style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, fontFamily: FONT.mono }}>Cancel</button>
//               <button onClick={editTarget ? handleEdit : handleCreate} disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: C.accent, color: "#0f1117", fontFamily: FONT.mono, opacity: saving ? 0.7 : 1 }}>
//                 {saving ? "Saving…" : editTarget ? "Save" : "Create"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }