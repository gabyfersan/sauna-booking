import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Längden ska vara minst vara 1 tecken")
    .max(255, "Längden ska vara max vara 255 tecken"),
  description: z
    .string()
    .min(1)
    .max(65535, "Längden ska vara max vara 65535 tecken"),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Längden ska vara minst vara 1 tecken")
    .max(255, "Längden ska vara max vara 255 tecken")
    .optional(),
  description: z
    .string()
    .min(1)
    .max(65535, "Längden ska vara max vara 65535 tecken")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "Längden ska vara minst vara 1 tecken")
    .max(255, "Längden ska vara max vara 255 tecken")
    .optional()
    .nullable(),
});
