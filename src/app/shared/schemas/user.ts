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
      username: z.string().min(1, { message: "Nombre de usuario inválido" }),
      email: z.email({ message: "Correo electrónico inválido" }),
      password: z.string().min(1, { message: "Contraseña inválida" }),
      confirmPassword: z
        .string()
        .min(1, { message: "Confirmación de contraseña inválida" }),
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
