import { PaymentList, PaymentEntry, StudentUser, AdminUser } from "./types";

export const PAYMENT_LISTS: PaymentList[] = [
  { id: "pl-001", name: "DEPARTMENTAL DUES", createdAt: "01 Feb 2026", endTime: "28 Feb 2026" },
  { id: "pl-002", name: "LAB FEES",          createdAt: "05 Feb 2026", endTime: "05 Mar 2026" },
  { id: "pl-003", name: "CLASS LIST",         createdAt: "10 Feb 2026", endTime: "10 Mar 2026" },
];

export const INITIAL_ENTRIES: PaymentEntry[] = [
  { id: "e1", paymentId: "pl-001", student: "DESIREE CHUKWUJI",  matric: "250303010024", nameOnAccount: "DESIREE C.",  isVerified: true,  enteredAt: "10 Feb 2026, 07:27PM" },
  { id: "e2", paymentId: "pl-001", student: "JAMES ADEYEMI",     matric: "250303010031", nameOnAccount: "JAMES A.",    isVerified: false, enteredAt: "10 Feb 2026, 06:14AM" },
  { id: "e3", paymentId: "pl-001", student: "AMAKA OKONKWO",     matric: "250303010018", nameOnAccount: "AMAKA O.",   isVerified: true,  enteredAt: "08 Feb 2026, 11:45AM" },
  { id: "e4", paymentId: "pl-002", student: "TUNDE BAKARE",      matric: "250303010045", nameOnAccount: "TUNDE B.",   isVerified: false, enteredAt: "09 Feb 2026, 03:00PM" },
  { id: "e5", paymentId: "pl-002", student: "FATIMA ALIYU",      matric: "250303010067", nameOnAccount: "FATIMA A.",  isVerified: true,  enteredAt: "08 Feb 2026, 09:10AM" },
  { id: "e6", paymentId: "pl-003", student: "EMEKA NWACHUKWU",   matric: "250303010055", nameOnAccount: "EMEKA N.",  isVerified: false,  enteredAt: "07 Feb 2026, 02:35PM" },
  { id: "e7", paymentId: "pl-003", student: "DESIREE CHUKWUJI",  matric: "250303010024", nameOnAccount: "DESIREE C.", isVerified: false, enteredAt: "07 Feb 2026, 05:00PM" },
];

export const STUDENT_USER: StudentUser = {
  name: "DESIREE CHUKWUJI",
  matric: "250303010024",
  dept: "Computer Science",
  level: "100 Level",
};

export const ADMIN_USER: AdminUser = {
  name: "Ayara Michael Udeme",
  role: "HOC — CS DEPT 100L",
  dept: "Computer Science",
};

export const COLORS = {
  bg:      "#08111f",
  sidebar: "#060e1a",
  card:    "#0d1a30",
  border:  "#1a2e50",
  border2: "#0f2040",
  accent:  "#1e4dd8",
  accent2: "#0d2a8a",
  text:    "#c8d8f0",
  muted:   "#4a6aad",
  dimmed:  "#2e4a80",
  green:   "#22c55e",
  red:     "#ef4444",
  yellow:  "#f59e0b",
} as const;