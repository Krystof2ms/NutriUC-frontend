import { z } from 'zod';

const updateTipSchema = z.object({
  title: z.string().min(5, {
    error: 'El título debe tener al menos 5 caracteres',
  }),
  content: z.string().min(10, {
    error: 'El contenido debe tener al menos 10 caracteres',
  }),
});

export const updateTipDefaultSchema = z.compile(
  updateTipSchema.extend({
    category: z.string().min(3, {
      error: 'La categoría debe tener al menos 3 caracteres',
    }),
  }),
);

export function dynamicEnum(categories: string[]) {
  return z.compile(
    updateTipSchema.extend({
      category: z.enum(categories as [string, ...string[]], {
        error: 'Selecciona una categoría válida',
      }),
    }),
  );
}

export type UpdateTip = z.infer<typeof updateTipDefaultSchema>;