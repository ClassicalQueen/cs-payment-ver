// import { useState } from "react";

// // ─── Types ────────────────────────────────────────────────────────────────────
// const ROLES = { ADMIN: "admin", STUDENT: "student" };

// const PAYMENT_LISTS = [
//   { id: "pl-001", name: "DEPARTMENTAL DUES", createdAt: "01 Feb 2026", endTime: "28 Feb 2026" },
//   { id: "pl-002", name: "LAB FEES",          createdAt: "05 Feb 2026", endTime: "05 Mar 2026" },
//   { id: "pl-003", name: "CLASS LIST",         createdAt: "10 Feb 2026", endTime: "10 Mar 2026" },
// ];

// const INITIAL_ENTRIES = [
//   { id: "e1", paymentId: "pl-001", student: "DESIREE CHUKWUJI",  matric: "250303010024", nameOnAccount: "DESIREE C.",  isVerified: true,  enteredAt: "10 Feb 2026, 07:27PM" },
//   { id: "e2", paymentId: "pl-001", student: "JAMES ADEYEMI",     matric: "250303010031", nameOnAccount: "JAMES A.",    isVerified: false, enteredAt: "10 Feb 2026, 06:14AM" },
//   { id: "e3", paymentId: "pl-001", student: "AMAKA OKONKWO",     matric: "250303010018", nameOnAccount: "AMAKA O.",   isVerified: true,  enteredAt: "08 Feb 2026, 11:45AM" },
//   { id: "e4", paymentId: "pl-002", student: "TUNDE BAKARE",      matric: "250303010045", nameOnAccount: "TUNDE B.",   isVerified: false, enteredAt: "09 Feb 2026, 03:00PM" },
//   { id: "e5", paymentId: "pl-002", student: "FATIMA ALIYU",      matric: "250303010067", nameOnAccount: "FATIMA A.",  isVerified: true,  enteredAt: "08 Feb 2026, 09:10AM" },
//   { id: "e6", paymentId: "pl-003", student: "EMEKA NWACHUKWU",   matric: "250303010055", nameOnAccount: "EMEKA N.",  isVerified: false, enteredAt: "07 Feb 2026, 02:35PM" },
//   { id: "e7", paymentId: "pl-003", student: "DESIREE CHUKWUJI",  matric: "250303010024", nameOnAccount: "DESIREE C.", isVerified: false, enteredAt: "07 Feb 2026, 05:00PM" },
// ];

// const STUDENT_USER = { name: "DESIREE CHUKWUJI", matric: "250303010024", dept: "Computer Science", level: "100 Level" };
// const ADMIN_USER   = { name: "DR. ADEBAYO OSEI", role: "HOC — CS DEPT", dept: "Computer Science" };

// function initials(n) { return n.split(" ").slice(0,2).map(w=>w[0]).join(""); }
// function cls(...a) { return a.filter(Boolean).join(" "); }

// // ─── Shared colours ───────────────────────────────────────────────────────────
// const C = {
//   bg:      "#08111f",
//   sidebar: "#060e1a",
//   card:    "#0d1a30",
//   border:  "#1a2e50",
//   border2: "#0f2040",
//   accent:  "#1e4dd8",
//   accent2: "#0d2a8a",
//   text:    "#c8d8f0",
//   muted:   "#4a6aad",
//   dimmed:  "#2e4a80",
//   green:   "#22c55e",
//   red:     "#ef4444",
//   yellow:  "#f59e0b",
// };

// // ─── Shared UI atoms ──────────────────────────────────────────────────────────
// function Badge({ verified }) {
//   return (
//     <span style={{
//       display:"inline-flex", alignItems:"center", gap:5,
//       padding:"3px 10px", borderRadius:20,
//       background: verified ? "rgba(34,197,94,.12)" : "rgba(239,68,68,.12)",
//       color: verified ? C.green : C.red,
//       fontSize:11, fontFamily:"monospace",
//       border:`1px solid ${verified ? "rgba(34,197,94,.3)" : "rgba(239,68,68,.3)"}`,
//     }}>
//       <span style={{ width:5, height:5, borderRadius:"50%", background: verified ? C.green : C.red, display:"inline-block" }} />
//       {verified ? "Verified" : "Pending"}
//     </span>
//   );
// }

// function Avatar({ name, size=32 }) {
//   return (
//     <div style={{ width:size, height:size, borderRadius:8, background:"#1a2a50", display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*.35, fontFamily:"monospace", color:C.accent, fontWeight:"bold", flexShrink:0 }}>
//       {initials(name)}
//     </div>
//   );
// }

// function SidebarBtn({ icon, label, active, onClick }) {
//   return (
//     <button onClick={onClick} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 10px", borderRadius:8, background: active?"#0f1e45":"transparent", border:"none", color: active?"#a0c4ff":C.muted, cursor:"pointer", fontSize:13, fontFamily:"Georgia,serif", transition:"all .15s" }}>
//       {icon}{label}
//     </button>
//   );
// }

// function StatCard({ label, value, sub, color }) {
//   return (
//     <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"20px 24px", borderTop:`3px solid ${color||C.accent}` }}>
//       <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", letterSpacing:".08em", textTransform:"uppercase", marginBottom:8 }}>{label}</div>
//       <div style={{ color:"#e0ecff", fontSize:36, fontWeight:"bold", lineHeight:1 }}>{value}</div>
//       {sub && <div style={{ color:C.dimmed, fontSize:11, fontFamily:"monospace", marginTop:6 }}>{sub}</div>}
//     </div>
//   );
// }

// // ─── ICONS ────────────────────────────────────────────────────────────────────
// const Icons = {
//   grid: <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="2" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></svg>,
//   user: <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2.5 13c0-3.038 2.462-5 5.5-5s5.5 1.962 5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
//   list: <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M5 4h8M5 8h8M5 12h8M2 4h.5M2 8h.5M2 12h.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
//   check: <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
//   plus: <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
//   link: <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
//   copy: <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><rect x="4" y="3" width="7" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2.5 4.5H2a1 1 0 00-1 1v6a1 1 0 001 1h7a1 1 0 001-1v-.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
//   menu: <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><rect x="2" y="4" width="14" height="1.5" rx=".75" fill="currentColor"/><rect x="2" y="8.25" width="14" height="1.5" rx=".75" fill="currentColor"/><rect x="2" y="12.5" width="14" height="1.5" rx=".75" fill="currentColor"/></svg>,
//   logout: <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M9 7H3m0 0l2-2M3 7l2 2M11 2v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
//   refresh: <svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M12.5 7.5A5 5 0 112.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M12.5 4v3.5h-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
//   shield: <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 2L3 4.5v4C3 11.5 5.5 14 8 14s5-2.5 5-5.5v-4L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
//   trash: <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.7 7.5h6.6L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
// };

// // ─── Shared Sidebar shell ─────────────────────────────────────────────────────
// function Sidebar({ user, isAdmin, activeTab, setActiveTab, onLogout, tabs }) {
//   const [showMenu, setShowMenu] = useState(false);
//   return (
//     <aside style={{ width:260, background:C.sidebar, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
//       {/* Header */}
//       <div style={{ padding:"20px 16px 16px", borderBottom:`1px solid ${C.border}` }}>
//         <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//           <div style={{ width:36, height:36, borderRadius:8, background:`linear-gradient(135deg,${C.accent},${C.accent2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#a0c4ff", fontFamily:"monospace", fontWeight:"bold" }}>CS</div>
//           <div>
//             <div style={{ color:"#e0ecff", fontWeight:"bold", fontSize:13 }}>Computer Science</div>
//             <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace" }}>{isAdmin ? "HOC Dashboard" : "100 Level"}</div>
//           </div>
//         </div>
//       </div>

//       {/* Nav */}
//       <nav style={{ padding:"16px 10px", flex:1 }}>
//         {tabs.map(t => (
//           <div key={t.section}>
//             <div style={{ color:C.dimmed, fontSize:10, fontFamily:"monospace", letterSpacing:".12em", textTransform:"uppercase", padding:"0 6px", margin:"12px 0 4px" }}>{t.section}</div>
//             {t.items.map(item => (
//               <SidebarBtn key={item.id} icon={item.icon} label={item.label} active={activeTab===item.id} onClick={()=>setActiveTab(item.id)} />
//             ))}
//           </div>
//         ))}
//       </nav>

//       {/* User footer */}
//       <div style={{ borderTop:`1px solid ${C.border}`, padding:"12px 14px", position:"relative" }}>
//         <button onClick={()=>setShowMenu(!showMenu)} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, background:"transparent", border:"none", cursor:"pointer" }}>
//           <Avatar name={user.name} size={32} />
//           <div style={{ textAlign:"left", flex:1 }}>
//             <div style={{ color:"#e0ecff", fontSize:12, fontWeight:"bold" }}>{user.name.split(" ")[0]} {user.name.split(" ")[1]}</div>
//             <div style={{ color:C.muted, fontSize:10, fontFamily:"monospace" }}>{isAdmin ? user.role : user.matric}</div>
//           </div>
//           <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M4 5l3 3 3-3" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round"/></svg>
//         </button>
//         {showMenu && (
//           <div style={{ position:"absolute", bottom:"100%", left:10, right:10, background:"#0d1635", border:`1px solid ${C.border}`, borderRadius:10, padding:8, marginBottom:4, boxShadow:"0 -10px 40px rgba(0,0,0,.6)" }}>
//             <button onClick={onLogout} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"9px 10px", borderRadius:6, background:"transparent", border:"none", color:"#ef8080", cursor:"pointer", fontSize:12, fontFamily:"Georgia,serif" }}>
//               {Icons.logout} Log out
//             </button>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// }

// // ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
// function AdminDashboard({ onLogout }) {
//   const [tab, setTab] = useState("overview");
//   const [entries, setEntries] = useState(INITIAL_ENTRIES);
//   const [lists, setLists] = useState(PAYMENT_LISTS);
//   const [sideOpen, setSideOpen] = useState(true);
//   const [activeList, setActiveList] = useState(PAYMENT_LISTS[0]);
//   const [copiedId, setCopiedId] = useState(null);

//   // New list modal
//   const [showNewList, setShowNewList] = useState(false);
//   const [newName, setNewName] = useState("");
//   const [newEnd, setNewEnd] = useState("");

//   const verified   = entries.filter(e => e.isVerified).length;
//   const pending    = entries.filter(e => !e.isVerified).length;
//   const listEntries = entries.filter(e => e.paymentId === activeList.id);

//   function toggleVerify(id) {
//     setEntries(prev => prev.map(e => e.id === id ? { ...e, isVerified: !e.isVerified } : e));
//   }

//   function deleteEntry(id) {
//     setEntries(prev => prev.filter(e => e.id !== id));
//   }

//   function createList() {
//     if (!newName.trim()) return;
//     const id = "pl-" + Date.now();
//     const nl = { id, name: newName.toUpperCase(), createdAt: new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}), endTime: newEnd || "—" };
//     setLists(prev => [...prev, nl]);
//     setShowNewList(false); setNewName(""); setNewEnd("");
//   }

//   function copyLink(id) {
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 2000);
//   }

//   const TABS = [
//     { section:"Main",     items:[{ id:"overview", label:"Overview",   icon:Icons.grid },{ id:"records",  label:"Payment Lists", icon:Icons.list }] },
//     { section:"Manage",   items:[{ id:"verify",   label:"Verify Entries", icon:Icons.shield }] },
//   ];

//   return (
//     <div style={{ display:"flex", height:"100vh", background:C.bg, color:C.text, fontFamily:"Georgia,serif", overflow:"hidden" }}>
//       {sideOpen && <Sidebar user={ADMIN_USER} isAdmin tabs={TABS} activeTab={tab} setActiveTab={setTab} onLogout={onLogout} />}

//       <main style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//         {/* Topbar */}
//         <header style={{ height:48, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", padding:"0 20px", gap:12, background:C.sidebar, flexShrink:0 }}>
//           <button onClick={()=>setSideOpen(!sideOpen)} style={{ background:"transparent", border:"none", cursor:"pointer", color:C.muted }}>{Icons.menu}</button>
//           <div style={{ flex:1 }} />
//           <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.25)", borderRadius:20, padding:"4px 12px" }}>
//             <span style={{ width:6, height:6, borderRadius:"50%", background:"#ef4444", boxShadow:"0 0 6px #ef4444", display:"inline-block" }} />
//             <span style={{ fontSize:11, color:"#ef8080", fontFamily:"monospace" }}>ADMIN</span>
//           </div>
//           <span style={{ fontSize:11, color:C.muted, fontFamily:"monospace" }}>LASU IKORODU — PAYMENT PORTAL</span>
//         </header>

//         <div style={{ flex:1, overflowY:"auto", padding:24 }}>

//           {/* ── OVERVIEW TAB ── */}
//           {tab === "overview" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
//               <div>
//                 <h2 style={{ color:"#e0ecff", fontSize:20, fontWeight:"bold", margin:0 }}>Admin Overview</h2>
//                 <p style={{ color:C.muted, fontSize:13, marginTop:4, fontFamily:"monospace" }}>Manage payment lists and verify student entries.</p>
//               </div>
//               <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
//                 <StatCard label="Payment Lists" value={lists.length} sub="Active records" color={C.accent} />
//                 <StatCard label="Total Entries" value={entries.length} sub="Across all lists" color="#7c3aed" />
//                 <StatCard label="Verified" value={verified} sub={`${Math.round(verified/entries.length*100)||0}% of entries`} color={C.green} />
//                 <StatCard label="Pending" value={pending} sub="Awaiting review" color={C.yellow} />
//               </div>

//               {/* Recent entries */}
//               <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
//                 <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border2}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//                   <span style={{ color:"#e0ecff", fontWeight:"bold", fontSize:14 }}>Recent Entries</span>
//                   <button onClick={()=>setTab("verify")} style={{ background:"transparent", border:"none", color:C.muted, cursor:"pointer", fontSize:12, fontFamily:"monospace", textDecoration:"underline" }}>View all →</button>
//                 </div>
//                 <table style={{ width:"100%", borderCollapse:"collapse" }}>
//                   <thead><tr style={{ borderBottom:`1px solid ${C.border2}` }}>
//                     {["Student","Matric","List","Status","Entered At"].map(h=>(
//                       <th key={h} style={{ textAlign:"left", padding:"10px 20px", color:C.dimmed, fontSize:10, fontFamily:"monospace", letterSpacing:".1em", textTransform:"uppercase", fontWeight:"normal" }}>{h}</th>
//                     ))}
//                   </tr></thead>
//                   <tbody>
//                     {entries.slice(0,5).map((e,i)=>(
//                       <tr key={e.id} style={{ borderBottom: i<4?`1px solid ${C.border2}`:"none" }}
//                         onMouseEnter={ev=>ev.currentTarget.style.background="#0a1530"}
//                         onMouseLeave={ev=>ev.currentTarget.style.background="transparent"}>
//                         <td style={{ padding:"12px 20px", color:C.text, fontSize:13 }}>{e.student}</td>
//                         <td style={{ padding:"12px 20px", color:C.accent, fontSize:12, fontFamily:"monospace" }}>{e.matric}</td>
//                         <td style={{ padding:"12px 20px", color:C.muted, fontSize:11, fontFamily:"monospace" }}>{lists.find(l=>l.id===e.paymentId)?.name||"—"}</td>
//                         <td style={{ padding:"12px 20px" }}><Badge verified={e.isVerified}/></td>
//                         <td style={{ padding:"12px 20px", color:C.muted, fontSize:11, fontFamily:"monospace" }}>{e.enteredAt}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* ── RECORDS TAB ── */}
//           {tab === "records" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
//               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//                 <div>
//                   <h2 style={{ color:"#e0ecff", fontSize:20, fontWeight:"bold", margin:0 }}>Payment Lists</h2>
//                   <p style={{ color:C.muted, fontSize:13, marginTop:4, fontFamily:"monospace" }}>Create and manage payment records. Share link IDs with students.</p>
//                 </div>
//                 <button onClick={()=>setShowNewList(true)} style={{ display:"flex", alignItems:"center", gap:8, background:`linear-gradient(135deg,${C.accent},${C.accent2})`, border:"none", borderRadius:10, padding:"10px 18px", color:"white", cursor:"pointer", fontWeight:"bold", fontSize:13, fontFamily:"monospace" }}>
//                   {Icons.plus} New List
//                 </button>
//               </div>

//               <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
//                 {lists.map(pl => {
//                   const cnt = entries.filter(e=>e.paymentId===pl.id).length;
//                   const vcnt = entries.filter(e=>e.paymentId===pl.id&&e.isVerified).length;
//                   return (
//                     <div key={pl.id} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"18px 20px" }}>
//                       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
//                         <div style={{ flex:1 }}>
//                           <div style={{ color:"#e0ecff", fontWeight:"bold", fontSize:14, marginBottom:3 }}>{pl.name}</div>
//                           <div style={{ color:C.dimmed, fontSize:10, fontFamily:"monospace" }}>Created: {pl.createdAt}</div>
//                           <div style={{ color:C.dimmed, fontSize:10, fontFamily:"monospace" }}>Ends: {pl.endTime}</div>
//                         </div>
//                         <div style={{ background:"rgba(30,77,216,.15)", border:"1px solid rgba(30,77,216,.3)", borderRadius:8, padding:"4px 8px", color:"#7aa8ff", fontSize:11, fontFamily:"monospace" }}>
//                           {cnt} entries
//                         </div>
//                       </div>
//                       <div style={{ height:4, background:"#1a2a50", borderRadius:2, marginBottom:12, overflow:"hidden" }}>
//                         <div style={{ height:"100%", width:`${cnt?Math.round(vcnt/cnt*100):0}%`, background:`linear-gradient(90deg,${C.green},#16a34a)`, borderRadius:2, transition:"width .4s" }} />
//                       </div>
//                       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//                         <span style={{ color:C.dimmed, fontSize:11, fontFamily:"monospace" }}>{vcnt}/{cnt} verified</span>
//                         <button onClick={()=>copyLink(pl.id)} style={{ display:"flex", alignItems:"center", gap:5, background:"#0f1e45", border:"1px solid #1e3070", borderRadius:8, padding:"5px 10px", cursor:"pointer", color: copiedId===pl.id ? C.green : C.muted, fontSize:11, fontFamily:"monospace", transition:"color .2s" }}>
//                           {Icons.copy} {copiedId===pl.id ? "Copied!" : pl.id}
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* New list modal */}
//               {showNewList && (
//                 <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50 }} onClick={()=>setShowNewList(false)}>
//                   <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:28, width:380, boxShadow:"0 20px 60px rgba(0,0,0,.8)" }} onClick={e=>e.stopPropagation()}>
//                     <h3 style={{ color:"#e0ecff", margin:"0 0 20px", fontSize:17 }}>Create New Payment List</h3>
//                     <label style={{ color:C.muted, fontSize:11, fontFamily:"monospace", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>List Name</label>
//                     <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. Departmental Dues" style={{ width:"100%", background:"#080f28", border:`1px solid ${C.border}`, borderRadius:9, color:C.text, padding:"11px 14px", fontSize:13, outline:"none", fontFamily:"Georgia,serif", boxSizing:"border-box", marginBottom:14 }} />
//                     <label style={{ color:C.muted, fontSize:11, fontFamily:"monospace", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>End Date</label>
//                     <input value={newEnd} onChange={e=>setNewEnd(e.target.value)} type="date" style={{ width:"100%", background:"#080f28", border:`1px solid ${C.border}`, borderRadius:9, color:C.text, padding:"11px 14px", fontSize:13, outline:"none", fontFamily:"monospace", boxSizing:"border-box", marginBottom:20 }} />
//                     <div style={{ display:"flex", gap:10 }}>
//                       <button onClick={()=>setShowNewList(false)} style={{ flex:1, background:"transparent", border:`1px solid ${C.border}`, borderRadius:9, padding:"10px", color:C.muted, cursor:"pointer", fontSize:13 }}>Cancel</button>
//                       <button onClick={createList} style={{ flex:2, background:`linear-gradient(135deg,${C.accent},${C.accent2})`, border:"none", borderRadius:9, padding:"10px", color:"white", cursor:"pointer", fontWeight:"bold", fontSize:13 }}>Create List</button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── VERIFY TAB ── */}
//           {tab === "verify" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
//               <div>
//                 <h2 style={{ color:"#e0ecff", fontSize:20, fontWeight:"bold", margin:0 }}>Verify Entries</h2>
//                 <p style={{ color:C.muted, fontSize:13, marginTop:4, fontFamily:"monospace" }}>Review and confirm student payment submissions.</p>
//               </div>

//               {/* List tabs */}
//               <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
//                 {lists.map(l => (
//                   <button key={l.id} onClick={()=>setActiveList(l)} style={{ padding:"7px 14px", borderRadius:9, border:"1px solid", borderColor: activeList.id===l.id ? C.accent : C.border, background: activeList.id===l.id ? "#0f1e45" : "transparent", color: activeList.id===l.id ? "#a0c4ff" : C.muted, fontSize:12, fontFamily:"monospace", cursor:"pointer" }}>
//                     {l.name} <span style={{ opacity:.6 }}>({entries.filter(e=>e.paymentId===l.id).length})</span>
//                   </button>
//                 ))}
//               </div>

//               <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
//                 <table style={{ width:"100%", borderCollapse:"collapse" }}>
//                   <thead><tr style={{ borderBottom:`1px solid ${C.border2}` }}>
//                     {["Student","Matric","Name on Account","Status","Entered At","Actions"].map(h=>(
//                       <th key={h} style={{ textAlign:"left", padding:"11px 18px", color:C.dimmed, fontSize:10, fontFamily:"monospace", letterSpacing:".1em", textTransform:"uppercase", fontWeight:"normal" }}>{h}</th>
//                     ))}
//                   </tr></thead>
//                   <tbody>
//                     {listEntries.length === 0 ? (
//                       <tr><td colSpan={6} style={{ padding:40, textAlign:"center", color:C.dimmed, fontFamily:"monospace", fontSize:13 }}>No entries for this list.</td></tr>
//                     ) : listEntries.map((e,i) => (
//                       <tr key={e.id} style={{ borderBottom: i<listEntries.length-1 ? `1px solid ${C.border2}` : "none" }}
//                         onMouseEnter={ev=>ev.currentTarget.style.background="#0a1530"}
//                         onMouseLeave={ev=>ev.currentTarget.style.background="transparent"}>
//                         <td style={{ padding:"13px 18px", color:C.text, fontSize:13 }}>{e.student}</td>
//                         <td style={{ padding:"13px 18px", color:C.accent, fontSize:12, fontFamily:"monospace" }}>{e.matric}</td>
//                         <td style={{ padding:"13px 18px", color:C.muted, fontSize:12, fontFamily:"monospace" }}>{e.nameOnAccount}</td>
//                         <td style={{ padding:"13px 18px" }}><Badge verified={e.isVerified}/></td>
//                         <td style={{ padding:"13px 18px", color:C.muted, fontSize:11, fontFamily:"monospace" }}>{e.enteredAt}</td>
//                         <td style={{ padding:"13px 18px" }}>
//                           <div style={{ display:"flex", gap:6 }}>
//                             <button onClick={()=>toggleVerify(e.id)} title={e.isVerified?"Unverify":"Verify"} style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 10px", borderRadius:7, border:"1px solid", borderColor: e.isVerified ? "rgba(239,68,68,.4)" : "rgba(34,197,94,.4)", background: e.isVerified ? "rgba(239,68,68,.1)" : "rgba(34,197,94,.1)", color: e.isVerified ? C.red : C.green, cursor:"pointer", fontSize:11, fontFamily:"monospace" }}>
//                               {e.isVerified ? "✕ Unverify" : "✓ Verify"}
//                             </button>
//                             <button onClick={()=>deleteEntry(e.id)} style={{ padding:"5px 8px", borderRadius:7, border:`1px solid rgba(239,68,68,.3)`, background:"rgba(239,68,68,.08)", color:C.red, cursor:"pointer" }}>
//                               {Icons.trash}
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// // ─── STUDENT DASHBOARD ────────────────────────────────────────────────────────
// function StudentDashboard({ onLogout }) {
//   const [tab, setTab] = useState("dashboard");
//   const [entries, setEntries] = useState(INITIAL_ENTRIES);
//   const [sideOpen, setSideOpen] = useState(true);
//   const [verifyLink, setVerifyLink] = useState("");
//   const [verifyStatus, setVerifyStatus] = useState(null); // null | {ok, msg}

//   // Add record form
//   const [nameOnAccount, setNameOnAccount] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const myEntries = entries.filter(e => e.matric === STUDENT_USER.matric);
//   const myVerified = myEntries.filter(e => e.isVerified).length;

//   function handleVerify() {
//     if (!verifyLink.trim()) return;
//     const found = PAYMENT_LISTS.find(r => verifyLink.includes(r.id));
//     if (found) {
//       const alreadyIn = entries.some(e => e.paymentId === found.id && e.matric === STUDENT_USER.matric);
//       if (alreadyIn) {
//         setVerifyStatus({ ok:false, msg:"You have already submitted for this list." });
//       } else {
//         const newEntry = {
//           id: "e" + Date.now(), paymentId: found.id,
//           student: STUDENT_USER.name, matric: STUDENT_USER.matric,
//           nameOnAccount: nameOnAccount || "—", isVerified: false,
//           enteredAt: new Date().toLocaleString("en-GB", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }),
//         };
//         setEntries(prev => [...prev, newEntry]);
//         setVerifyStatus({ ok:true, msg:`✓ Successfully added to "${found.name}". Awaiting HOC verification.` });
//         setVerifyLink(""); setNameOnAccount("");
//       }
//     } else {
//       setVerifyStatus({ ok:false, msg:"✗ Invalid record link. Please check and try again." });
//     }
//     setTimeout(() => setVerifyStatus(null), 4000);
//   }

//   const TABS = [
//     { section:"Main",     items:[{ id:"dashboard", label:"Dashboard",   icon:Icons.grid }] },
//     { section:"Payments", items:[{ id:"verify",    label:"Verify Link", icon:Icons.link },{ id:"history",   label:"My Records",  icon:Icons.list }] },
//     { section:"Settings", items:[{ id:"account",   label:"Account",     icon:Icons.user }] },
//   ];

//   return (
//     <div style={{ display:"flex", height:"100vh", background:C.bg, color:C.text, fontFamily:"Georgia,serif", overflow:"hidden" }}>
//       {sideOpen && <Sidebar user={STUDENT_USER} isAdmin={false} tabs={TABS} activeTab={tab} setActiveTab={setTab} onLogout={onLogout} />}

//       <main style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//         <header style={{ height:48, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", padding:"0 20px", gap:12, background:C.sidebar, flexShrink:0 }}>
//           <button onClick={()=>setSideOpen(!sideOpen)} style={{ background:"transparent", border:"none", cursor:"pointer", color:C.muted }}>{Icons.menu}</button>
//           <div style={{ flex:1 }} />
//           <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(34,197,94,.1)", border:"1px solid rgba(34,197,94,.25)", borderRadius:20, padding:"4px 12px" }}>
//             <span style={{ width:6, height:6, borderRadius:"50%", background:C.green, boxShadow:`0 0 6px ${C.green}`, display:"inline-block" }} />
//             <span style={{ fontSize:11, color:"#86efac", fontFamily:"monospace" }}>STUDENT</span>
//           </div>
//           <span style={{ fontSize:11, color:C.muted, fontFamily:"monospace" }}>LASU IKORODU — PAYMENT PORTAL</span>
//         </header>

//         <div style={{ flex:1, overflowY:"auto", padding:24 }}>

//           {/* ── DASHBOARD TAB ── */}
//           {tab === "dashboard" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
//               <div>
//                 <h2 style={{ color:"#e0ecff", fontSize:20, fontWeight:"bold", margin:0 }}>Welcome back, {STUDENT_USER.name.split(" ")[0]} 👋</h2>
//                 <p style={{ color:C.muted, fontSize:13, marginTop:4, fontFamily:"monospace" }}>{STUDENT_USER.dept} · {STUDENT_USER.level}</p>
//               </div>

//               <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
//                 <StatCard label="My Submissions" value={myEntries.length} sub="Total across all lists" color={C.accent} />
//                 <StatCard label="Verified"        value={myVerified}        sub="Confirmed by HOC"      color={C.green} />
//                 <StatCard label="Pending"          value={myEntries.length - myVerified} sub="Awaiting review" color={C.yellow} />
//               </div>

//               {/* Quick verify card */}
//               <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"22px 24px" }}>
//                 <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
//                   <div>
//                     <div style={{ color:"#e0ecff", fontWeight:"bold", fontSize:16, marginBottom:4 }}>Verify a Payment</div>
//                     <div style={{ color:C.muted, fontSize:13 }}>Got a record link from your HOC? Paste it below to submit your payment.</div>
//                   </div>
//                   <span style={{ background:"rgba(30,77,216,.15)", border:"1px solid rgba(30,77,216,.3)", borderRadius:8, padding:"4px 10px", color:"#7aa8ff", fontSize:11, fontFamily:"monospace", flexShrink:0, marginLeft:16 }}>Quick action</span>
//                 </div>
//                 <div style={{ display:"flex", gap:8, marginBottom:10 }}>
//                   <div style={{ flex:1, display:"flex", background:"#080f28", border:`1px solid ${verifyStatus?.ok===false?C.red:verifyStatus?.ok?C.green:C.border}`, borderRadius:10, padding:"0 14px", transition:"border-color .2s" }}>
//                     <input value={verifyLink} onChange={e=>setVerifyLink(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleVerify()} placeholder="Paste record link (e.g. pl-001)" style={{ flex:1, background:"transparent", border:"none", outline:"none", color:C.text, fontSize:13, padding:"12px 0", fontFamily:"monospace" }} />
//                   </div>
//                   <button onClick={handleVerify} style={{ background:`linear-gradient(135deg,${C.accent},${C.accent2})`, border:"none", borderRadius:10, padding:"0 22px", cursor:"pointer", color:"white", fontWeight:"bold", fontSize:13, fontFamily:"monospace" }}>Verify</button>
//                 </div>
//                 {verifyStatus && <div style={{ color: verifyStatus.ok ? C.green : C.red, fontSize:12, fontFamily:"monospace" }}>{verifyStatus.msg}</div>}
//                 <div style={{ borderTop:`1px solid ${C.border2}`, marginTop:16, paddingTop:12, textAlign:"center" }}>
//                   <span style={{ color:C.dimmed, fontSize:11, fontFamily:"monospace", textDecoration:"underline" }}>Powered by DESDERA Technologies</span>
//                 </div>
//               </div>

//               {/* My recent submissions */}
//               {myEntries.length > 0 && (
//                 <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
//                   <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border2}`, display:"flex", justifyContent:"space-between" }}>
//                     <span style={{ color:"#e0ecff", fontWeight:"bold", fontSize:14 }}>My Recent Submissions</span>
//                     <button onClick={()=>setTab("history")} style={{ background:"transparent", border:"none", color:C.muted, cursor:"pointer", fontSize:12, fontFamily:"monospace", textDecoration:"underline" }}>View all →</button>
//                   </div>
//                   <table style={{ width:"100%", borderCollapse:"collapse" }}>
//                     <thead><tr style={{ borderBottom:`1px solid ${C.border2}` }}>
//                       {["Payment List","Name on Account","Status","Entered At"].map(h=>(
//                         <th key={h} style={{ textAlign:"left", padding:"10px 20px", color:C.dimmed, fontSize:10, fontFamily:"monospace", letterSpacing:".1em", textTransform:"uppercase", fontWeight:"normal" }}>{h}</th>
//                       ))}
//                     </tr></thead>
//                     <tbody>
//                       {myEntries.slice(0,4).map((e,i)=>(
//                         <tr key={e.id} style={{ borderBottom: i<Math.min(myEntries.length,4)-1 ? `1px solid ${C.border2}` : "none" }}
//                           onMouseEnter={ev=>ev.currentTarget.style.background="#0a1530"}
//                           onMouseLeave={ev=>ev.currentTarget.style.background="transparent"}>
//                           <td style={{ padding:"12px 20px", color:C.text, fontSize:13 }}>{PAYMENT_LISTS.find(l=>l.id===e.paymentId)?.name||e.paymentId}</td>
//                           <td style={{ padding:"12px 20px", color:C.muted, fontSize:12, fontFamily:"monospace" }}>{e.nameOnAccount}</td>
//                           <td style={{ padding:"12px 20px" }}><Badge verified={e.isVerified}/></td>
//                           <td style={{ padding:"12px 20px", color:C.muted, fontSize:11, fontFamily:"monospace" }}>{e.enteredAt}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── VERIFY LINK TAB ── */}
//           {tab === "verify" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:20, maxWidth:620 }}>
//               <div>
//                 <h2 style={{ color:"#e0ecff", fontSize:20, fontWeight:"bold", margin:0 }}>Verify a Payment Link</h2>
//                 <p style={{ color:C.muted, fontSize:13, marginTop:4, fontFamily:"monospace" }}>Your HOC shares a record ID. Paste it below and fill in your details.</p>
//               </div>
//               <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"24px" }}>
//                 <label style={{ color:C.muted, fontSize:11, fontFamily:"monospace", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>Student Full Name (auto)</label>
//                 <div style={{ background:"#080f28", border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 16px", color:C.muted, fontSize:13, fontFamily:"monospace", marginBottom:16 }}>
//                   {STUDENT_USER.name}
//                 </div>

//                 <label style={{ color:C.muted, fontSize:11, fontFamily:"monospace", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>Matric Number (auto)</label>
//                 <div style={{ background:"#080f28", border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 16px", color:C.muted, fontSize:13, fontFamily:"monospace", marginBottom:16 }}>
//                   {STUDENT_USER.matric}
//                 </div>

//                 <label style={{ color:C.muted, fontSize:11, fontFamily:"monospace", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>Name on Account *</label>
//                 <input value={nameOnAccount} onChange={e=>setNameOnAccount(e.target.value)} placeholder="Name on bank account used for payment" style={{ width:"100%", background:"#080f28", border:`1px solid ${C.border}`, borderRadius:10, color:C.text, padding:"12px 16px", fontSize:13, outline:"none", fontFamily:"Georgia,serif", boxSizing:"border-box", marginBottom:16 }} />

//                 <label style={{ color:C.muted, fontSize:11, fontFamily:"monospace", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>Payment ID (from HOC message) *</label>
//                 <div style={{ display:"flex", gap:8, marginBottom:8 }}>
//                   <input value={verifyLink} onChange={e=>setVerifyLink(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleVerify()} placeholder="e.g. pl-001" style={{ flex:1, background:"#080f28", border:`1px solid ${verifyStatus?.ok===false?C.red:C.border}`, borderRadius:10, color:C.text, padding:"12px 16px", fontSize:13, outline:"none", fontFamily:"monospace" }} />
//                   <button onClick={handleVerify} style={{ background:`linear-gradient(135deg,${C.accent},${C.accent2})`, border:"none", borderRadius:10, padding:"0 24px", cursor:"pointer", color:"white", fontWeight:"bold", fontSize:13, fontFamily:"monospace" }}>Submit</button>
//                 </div>
//                 {verifyStatus && <div style={{ color: verifyStatus.ok ? C.green : C.red, fontSize:12, fontFamily:"monospace" }}>{verifyStatus.msg}</div>}

//                 <div style={{ marginTop:18, padding:"12px 16px", background:"rgba(30,77,216,.08)", border:"1px solid rgba(30,77,216,.2)", borderRadius:10 }}>
//                   <div style={{ color:"#7aa8ff", fontSize:12, fontFamily:"monospace", marginBottom:4 }}>ℹ Available record IDs (demo)</div>
//                   {PAYMENT_LISTS.map(l => (
//                     <div key={l.id} style={{ color:C.muted, fontSize:11, fontFamily:"monospace" }}>{l.id} → {l.name}</div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ── HISTORY TAB ── */}
//           {tab === "history" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
//               <div>
//                 <h2 style={{ color:"#e0ecff", fontSize:20, fontWeight:"bold", margin:0 }}>My Payment Records</h2>
//                 <p style={{ color:C.muted, fontSize:13, marginTop:4, fontFamily:"monospace" }}>All your submitted payment verifications.</p>
//               </div>
//               <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
//                 {myEntries.length === 0 ? (
//                   <div style={{ padding:48, textAlign:"center", color:C.dimmed, fontFamily:"monospace" }}>No submissions yet. Use "Verify Link" to add your first.</div>
//                 ) : (
//                   <table style={{ width:"100%", borderCollapse:"collapse" }}>
//                     <thead><tr style={{ borderBottom:`1px solid ${C.border2}` }}>
//                       {["Payment List","Name on Account","Status","Entered At"].map(h=>(
//                         <th key={h} style={{ textAlign:"left", padding:"11px 20px", color:C.dimmed, fontSize:10, fontFamily:"monospace", letterSpacing:".1em", textTransform:"uppercase", fontWeight:"normal" }}>{h}</th>
//                       ))}
//                     </tr></thead>
//                     <tbody>
//                       {myEntries.map((e,i)=>(
//                         <tr key={e.id} style={{ borderBottom: i<myEntries.length-1?`1px solid ${C.border2}`:"none" }}
//                           onMouseEnter={ev=>ev.currentTarget.style.background="#0a1530"}
//                           onMouseLeave={ev=>ev.currentTarget.style.background="transparent"}>
//                           <td style={{ padding:"14px 20px", color:C.text, fontSize:13 }}>{PAYMENT_LISTS.find(l=>l.id===e.paymentId)?.name||e.paymentId}</td>
//                           <td style={{ padding:"14px 20px", color:C.muted, fontSize:12, fontFamily:"monospace" }}>{e.nameOnAccount}</td>
//                           <td style={{ padding:"14px 20px" }}><Badge verified={e.isVerified}/></td>
//                           <td style={{ padding:"14px 20px", color:C.muted, fontSize:11, fontFamily:"monospace" }}>{e.enteredAt}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* ── ACCOUNT TAB ── */}
//           {tab === "account" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:20, maxWidth:500 }}>
//               <h2 style={{ color:"#e0ecff", fontSize:20, fontWeight:"bold", margin:0 }}>Account</h2>
//               <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:24 }}>
//                 <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24, paddingBottom:20, borderBottom:`1px solid ${C.border2}` }}>
//                   <Avatar name={STUDENT_USER.name} size={56} />
//                   <div>
//                     <div style={{ color:"#e0ecff", fontWeight:"bold", fontSize:18 }}>{STUDENT_USER.name}</div>
//                     <div style={{ color:C.muted, fontSize:13, fontFamily:"monospace" }}>{STUDENT_USER.matric}</div>
//                     <div style={{ color:C.dimmed, fontSize:12, marginTop:2 }}>{STUDENT_USER.dept} · {STUDENT_USER.level}</div>
//                   </div>
//                 </div>
//                 {[["Full Name",STUDENT_USER.name],["Matric Number",STUDENT_USER.matric],["Department",STUDENT_USER.dept],["Level",STUDENT_USER.level]].map(([l,v])=>(
//                   <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:`1px solid ${C.border2}` }}>
//                     <span style={{ color:C.muted, fontSize:13, fontFamily:"monospace" }}>{l}</span>
//                     <span style={{ color:C.text, fontSize:13 }}>{v}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
// function Login({ onLogin }) {
//   const [role, setRole] = useState(ROLES.STUDENT);
//   const [surname, setSurname] = useState("");
//   const [matric, setMatric] = useState("");
//   const [focused, setFocused] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   async function handleSubmit() {
//     if (!surname.trim() || !matric.trim()) { setErr("Please fill in all fields."); return; }
//     setErr(""); setLoading(true);
//     await new Promise(r => setTimeout(r, 1200));
//     setLoading(false);
//     onLogin(role);
//   }

//   return (
//     <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:C.bg, fontFamily:"Georgia,serif", position:"relative", overflow:"hidden" }}>
//       <div style={{ position:"absolute", top:"-10%", left:"-5%", width:500, height:500, borderRadius:"50%", background:"#0d2157", opacity:.4, filter:"blur(120px)", pointerEvents:"none" }} />
//       <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:400, height:400, borderRadius:"50%", background:"#0a1a4a", opacity:.5, filter:"blur(100px)", pointerEvents:"none" }} />
//       <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:.03, backgroundImage:"linear-gradient(#5b8dee 1px,transparent 1px),linear-gradient(90deg,#5b8dee 1px,transparent 1px)", backgroundSize:"40px 40px" }} />

//       <div style={{ position:"relative", width:"100%", maxWidth:420, margin:"0 16px" }}>
//         <div style={{ position:"absolute", inset:-1, borderRadius:20, background:`linear-gradient(135deg,#2a4a9e,#1a2d6b,transparent)`, opacity:.7, filter:"blur(1px)" }} />
//         <div style={{ position:"relative", background:C.card, borderRadius:20, padding:"36px 32px", boxShadow:"0 30px 80px rgba(0,0,0,.7)", border:`1px solid rgba(30,48,112,.6)` }}>
//           {/* Logo area */}
//           <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:28 }}>
//             <div style={{ width:56, height:56, borderRadius:14, background:`linear-gradient(135deg,${C.accent},${C.accent2})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 30px rgba(30,77,216,.4)", marginBottom:14 }}>
//               <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><path d="M4 22L14 6L24 22" stroke="#a0c4ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.5 16.5H20.5" stroke="#a0c4ff" strokeWidth="2.5" strokeLinecap="round"/><circle cx="14" cy="24" r="1.5" fill="#5b8dee"/></svg>
//             </div>
//             <h1 style={{ color:"white", fontSize:22, fontWeight:"bold", margin:0, letterSpacing:"-.02em" }}>Student Portal</h1>
//             <p style={{ color:C.muted, fontSize:10, marginTop:4, fontFamily:"monospace", letterSpacing:".14em", textTransform:"uppercase" }}>Academic Access System</p>
//           </div>

//           {/* Role toggle */}
//           <div style={{ display:"flex", background:"#080f28", border:`1px solid ${C.border}`, borderRadius:12, padding:4, marginBottom:22, gap:4 }}>
//             {[ROLES.STUDENT, ROLES.ADMIN].map(r => (
//               <button key={r} onClick={()=>setRole(r)} style={{ flex:1, padding:"9px", borderRadius:9, border:"none", background: role===r ? `linear-gradient(135deg,${C.accent},${C.accent2})` : "transparent", color: role===r ? "white" : C.muted, cursor:"pointer", fontWeight: role===r ? "bold" : "normal", fontSize:13, fontFamily:"Georgia,serif", transition:"all .2s", textTransform:"capitalize" }}>
//                 {r === ROLES.ADMIN ? "HOC / Admin" : "Student"}
//               </button>
//             ))}
//           </div>

//           {/* Fields */}
//           {[
//             { id:"surname", label:"Surname", val:surname, set:setSurname, ph:"Enter your surname" },
//             { id:"matric",  label:"Matric Number", val:matric, set:setMatric, ph:"e.g. CSC/2021/001", mono:true },
//           ].map(f => (
//             <div key={f.id} style={{ marginBottom:16 }}>
//               <label style={{ display:"block", color:C.muted, fontSize:11, fontFamily:"monospace", letterSpacing:".1em", textTransform:"uppercase", marginBottom:6 }}>{f.label}</label>
//               <div style={{ borderRadius:12, boxShadow: focused===f.id ? `0 0 0 2px ${C.accent},0 0 20px rgba(30,77,216,.25)` : `0 0 0 1px ${C.border}`, transition:"box-shadow .2s" }}>
//                 <input value={f.val} onChange={e=>f.set(e.target.value)} onFocus={()=>setFocused(f.id)} onBlur={()=>setFocused(null)} placeholder={f.ph} style={{ width:"100%", background:"#080f28", border:"none", outline:"none", borderRadius:12, color:"white", padding:"13px 16px", fontSize:13, fontFamily: f.mono?"monospace":"Georgia,serif", boxSizing:"border-box" }} />
//               </div>
//             </div>
//           ))}

//           {err && <div style={{ color:C.red, fontSize:12, fontFamily:"monospace", marginBottom:10 }}>{err}</div>}

//           <button onClick={handleSubmit} disabled={loading} style={{ width:"100%", padding:"14px", borderRadius:12, border:"none", background:`linear-gradient(135deg,${C.accent},${C.accent2})`, color:"white", fontWeight:"bold", fontSize:13, fontFamily:"monospace", letterSpacing:".08em", textTransform:"uppercase", cursor:"pointer", marginTop:4, opacity: loading ? .7 : 1 }}>
//             {loading ? "Signing in…" : "Sign In"}
//           </button>

//           <p style={{ textAlign:"center", color:C.dimmed, fontSize:11, marginTop:20, fontFamily:"monospace" }}>
//             Having trouble?{" "}
//             <span style={{ color:C.muted, textDecoration:"underline", cursor:"pointer" }}>Contact Registry</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── ROOT ─────────────────────────────────────────────────────────────────────
// export default function App() {
//   const [auth, setAuth] = useState(null); // null | 'admin' | 'student'
//   if (!auth) return <Login onLogin={setAuth} />;
//   if (auth === ROLES.ADMIN) return <AdminDashboard onLogout={()=>setAuth(null)} />;
//   return <StudentDashboard onLogout={()=>setAuth(null)} />;
// }
































"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import OverviewTab from "@/components/admin/OverviewTab";
import PaymentListsTab from "@/components/admin/PaymentListsTab";
import VerifyTab from "@/components/admin/VerifyTab";
import { PaymentEntry, PaymentList, TabSection } from "@/lib/types";
import { COLORS as C, INITIAL_ENTRIES, PAYMENT_LISTS, ADMIN_USER } from "@/lib/data";

// ── Icons ──────────────────────────────────────────────────────────────────────
const GridIcon   = () => <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="2" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></svg>;
const ListIcon   = () => <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M5 4h8M5 8h8M5 12h8M2 4h.5M2 8h.5M2 12h.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const ShieldIcon = () => <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 2L3 4.5v4C3 11.5 5.5 14 8 14s5-2.5 5-5.5v-4L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const MenuIcon   = () => <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><rect x="2" y="4" width="14" height="1.5" rx=".75" fill="currentColor"/><rect x="2" y="8.25" width="14" height="1.5" rx=".75" fill="currentColor"/><rect x="2" y="12.5" width="14" height="1.5" rx=".75" fill="currentColor"/></svg>;

const TABS: TabSection[] = [
  {
    section: "Main",
    items: [
      { id: "overview", label: "Overview",      icon: <GridIcon /> },
      { id: "records",  label: "Payment Lists", icon: <ListIcon /> },
    ],
  },
  {
    section: "Manage",
    items: [
      { id: "verify", label: "Verify Entries", icon: <ShieldIcon /> },
    ],
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab]             = useState("overview");
  const [sideOpen, setSideOpen]   = useState(true);
  const [entries, setEntries]     = useState<PaymentEntry[]>(INITIAL_ENTRIES);
  const [lists, setLists]         = useState<PaymentList[]>(PAYMENT_LISTS);
  const [activeList, setActiveList] = useState<PaymentList>(PAYMENT_LISTS[0]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleToggleVerify(id: string) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, isVerified: !e.isVerified } : e)));
  }

  function handleDelete(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function handleCreateList(name: string, endTime: string) {
    const newList: PaymentList = {
      id: "pl-" + Date.now(),
      name: name.toUpperCase(),
      createdAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      endTime: endTime || "—",
    };
    setLists((prev) => [...prev, newList]);
  }

  function handleLogout() {
    router.push("/");
  }

  return (
    <div
      style={{
        display: "flex", height: "100vh",
        background: C.bg, color: C.text,
        fontFamily: "Georgia,serif", overflow: "hidden",
      }}
    >
      {sideOpen && (
        <Sidebar
          user={ADMIN_USER}
          isAdmin
          tabs={TABS}
          activeTab={tab}
          setActiveTab={setTab}
          onLogout={handleLogout}
        />
      )}

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <header
          style={{
            height: 48, borderBottom: `1px solid ${C.border}`,
            display: "flex", alignItems: "center",
            padding: "0 20px", gap: 12,
            background: C.sidebar, flexShrink: 0,
          }}
        >
          <button
            onClick={() => setSideOpen(!sideOpen)}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: C.muted }}
          >
            <MenuIcon />
          </button>
          <div style={{ flex: 1 }} />
          {/* Admin badge */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)",
              borderRadius: 20, padding: "4px 12px",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.red, boxShadow: `0 0 6px ${C.red}`, display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "#ef8080", fontFamily: "monospace" }}>ADMIN</span>
          </div>
          <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>
            LASUSTECH IKORODU — PAYMENT PORTAL
          </span>
        </header>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {tab === "overview" && (
            <OverviewTab
              entries={entries}
              lists={lists}
              onViewAll={() => setTab("verify")}
            />
          )}
          {tab === "records" && (
            <PaymentListsTab
              lists={lists}
              entries={entries}
              onCreateList={handleCreateList}
            />
          )}
          {tab === "verify" && (
            <VerifyTab
              entries={entries}
              lists={lists}
              activeList={activeList}
              onSelectList={setActiveList}
              onToggleVerify={handleToggleVerify}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
}