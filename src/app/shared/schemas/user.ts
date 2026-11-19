import z from "zod";

export const loginSchema = z.compile(
  z.object({
    email: z.email({ error: "Correo electrónico no válido" }),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
  }),
);

export const registerSchema = z.compile(
  z
    .object({
      name: z
        .string()
        .trim()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
      email: z.email({ message: "Correo electrónico no válido" }),
      password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .max(20, { message: "La contraseña no puede exceder los 20 caracteres" }),
      confirmPassword: z
        .string()
        .min(1, { message: "Confirma tu contraseña" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    }),
);

export const updateSchema = z.compile(
  z
    .object({
      username: z.union([
        z.literal(""),
        z.string().min(3, { message: "Nombre de usuario inválido" }),
      ]),
      email: z
        .union([
          z.literal(""),
          z.email({ message: "Correo electrónico inválido" }),
        ]),
      newPassword: z.union([
        z.literal(""),
        z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
      ]),
      confirmPassword: z.union([
        z.literal(""),
        z.string().min(8, { message: "Confirmación de contraseña inválida" }),
      ]),
    })
    .refine(
      (data) => !data.newPassword || data.newPassword === data.confirmPassword,
      {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      },
    ),
);

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type UpdateSchema = z.infer<typeof updateSchema>;