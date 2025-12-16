import { z } from "zod";

// Medication schema
export const medicationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Medication name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
});

export const insertMedicationSchema = medicationSchema.omit({ id: true });

export type Medication = z.infer<typeof medicationSchema>;
export type InsertMedication = z.infer<typeof insertMedicationSchema>;

// Vital Signs schema
export const vitalSignsSchema = z.object({
  id: z.string(),
  systolic: z.number().min(60, "Systolic must be at least 60").max(250, "Systolic must be at most 250"),
  diastolic: z.number().min(40, "Diastolic must be at least 40").max(150, "Diastolic must be at most 150"),
  heartRate: z.number().min(30, "Heart rate must be at least 30").max(220, "Heart rate must be at most 220"),
  weight: z.number().min(1, "Weight must be positive").max(1000, "Weight must be at most 1000"),
  timestamp: z.string(),
});

export const insertVitalSignsSchema = vitalSignsSchema.omit({ id: true, timestamp: true });

export type VitalSigns = z.infer<typeof vitalSignsSchema>;
export type InsertVitalSigns = z.infer<typeof insertVitalSignsSchema>;

// User session schema (simple username-only auth)
export const userSessionSchema = z.object({
  username: z.string().min(1, "Username is required"),
  loginTime: z.string(),
});

export type UserSession = z.infer<typeof userSessionSchema>;

// Login form schema
export const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required").min(2, "Username must be at least 2 characters"),
});

export type LoginForm = z.infer<typeof loginFormSchema>;
