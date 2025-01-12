import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Interview = pgTable("interview", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("jsonMockResponse").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExp: varchar("jobExp").notNull(),
  createdBy: varchar("createdAt").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});
