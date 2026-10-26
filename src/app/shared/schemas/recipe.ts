import { z } from 'zod';

export const instructionSchema = z.compile(
  z.string().min(8, {
    error: 'La instrucción debe tener al menos 8 caracteres',
  }),
);

export const ingredientSchema = z.compile(
  z.object({
    name: z.string().min(3, {
      error: 'El nombre del ingrediente debe tener al menos 3 caracteres',
    }),
    quantity: z.string().min(2, {
      error: 'La cantidad debe tener al menos 2 caracteres',
    }),
  }),
);

const updateRecipeSchema = z.object({
  name: z.string().min(8, {
    error: 'El nombre de la receta debe tener al menos 8 caracteres',
  }),
  origin: z.string().min(3, {
    error: 'El origen debe tener al menos 3 caracteres',
  }),
  description: z.string().min(8, {
    error: 'La descripción debe tener al menos 8 caracteres',
  }),
  instructions: z.array(instructionSchema, {
    error: 'Las instrucciones deben ser una lista',
  }),
  ingredients: z.array(ingredientSchema, {
    error: 'Los ingredientes deben ser una lista',
  }),
});

export const updateRecipeDefaultSchema = z.compile(
  updateRecipeSchema.extend({
    category: z.string().min(3, {
      error: 'La categoría debe tener al menos 3 caracteres',
    }),
  }),
);

export function dynamicEnum(categories: string[]) {
  return z.compile(
    updateRecipeSchema.extend({
      category: z.enum(categories, {
        error: 'Selecciona una categoría válida',
      }),
    }),
  );
}

export type UpdateRecipe = z.infer<typeof updateRecipeDefaultSchema>;
