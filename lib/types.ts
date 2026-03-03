export type Role = "admin" | "student";

export interface PaymentList {
  id: string;
  name: string;
  createdAt: string;
  endTime: string;
}

export interface PaymentEntry {
  id: string;
  paymentId: string;
  student: string;
  matric: string;
  nameOnAccount: string;
  isVerified: boolean;
  enteredAt: string;
}

export interface StudentUser {
  name: string;
  matric: string;
  dept: string;
  level: string;
}

export interface AdminUser {
  name: string;
  role: string;
  dept: string;
}

export type TabItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export type TabSection = {
  section: string;
  items: TabItem[];
};