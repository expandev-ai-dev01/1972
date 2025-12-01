/**
 * @summary
 * Validation schemas for Alimento entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/alimento/alimentoValidation
 */

import { z } from 'zod';
import { ALIMENTO_LIMITS, ALIMENTO_CATEGORIES, ALIMENTO_UNITS } from '@/constants';

/**
 * Schema for micronutrient validation
 */
export const micronutrienteSchema = z.object({
  nome: z.string().min(1).max(100),
  quantidade: z.number().min(0),
  unidade: z.string().min(1).max(20),
});

/**
 * Schema for create request validation
 */
export const createSchema = z
  .object({
    nome: z.string().min(ALIMENTO_LIMITS.NOME_MIN_LENGTH).max(ALIMENTO_LIMITS.NOME_MAX_LENGTH),
    descricao: z.string().max(ALIMENTO_LIMITS.DESCRICAO_MAX_LENGTH).nullable(),
    porcao: z.number().positive(),
    unidadeMedida: z.enum([
      ALIMENTO_UNITS.GRAMAS,
      ALIMENTO_UNITS.MILILITROS,
      ALIMENTO_UNITS.UNIDADE,
    ]),
    calorias: z.number().min(0),
    carboidratos: z.number().min(0),
    proteinas: z.number().min(0),
    gordurasTotais: z.number().min(0),
    gordurasSaturadas: z.number().min(0).nullable(),
    gordurasTrans: z.number().min(0).nullable(),
    fibras: z.number().min(0).nullable(),
    sodio: z.number().min(0).nullable(),
    acucares: z.number().min(0).nullable(),
    vitaminas: z.array(micronutrienteSchema).optional(),
    minerais: z.array(micronutrienteSchema).optional(),
    categoria: z.enum([
      ALIMENTO_CATEGORIES.FRUTAS,
      ALIMENTO_CATEGORIES.VEGETAIS,
      ALIMENTO_CATEGORIES.CARNES,
      ALIMENTO_CATEGORIES.LATICINIOS,
      ALIMENTO_CATEGORIES.GRAOS,
      ALIMENTO_CATEGORIES.BEBIDAS,
      ALIMENTO_CATEGORIES.PROCESSADOS,
      ALIMENTO_CATEGORIES.OUTROS,
    ]),
    fonte: z.string().max(ALIMENTO_LIMITS.FONTE_MAX_LENGTH).nullable(),
    codigoBarras: z.string().max(50).nullable(),
    marca: z.string().max(ALIMENTO_LIMITS.MARCA_MAX_LENGTH).nullable(),
  })
  .refine(
    (data) => {
      if (data.gordurasSaturadas !== null && data.gordurasSaturadas > data.gordurasTotais) {
        return false;
      }
      return true;
    },
    {
      message: 'Saturated fats cannot exceed total fats',
      path: ['gordurasSaturadas'],
    }
  )
  .refine(
    (data) => {
      if (data.gordurasTrans !== null && data.gordurasTrans > data.gordurasTotais) {
        return false;
      }
      return true;
    },
    {
      message: 'Trans fats cannot exceed total fats',
      path: ['gordurasTrans'],
    }
  )
  .refine(
    (data) => {
      if (data.acucares !== null && data.acucares > data.carboidratos) {
        return false;
      }
      return true;
    },
    {
      message: 'Sugars cannot exceed carbohydrates',
      path: ['acucares'],
    }
  );

/**
 * Schema for update request validation
 */
export const updateSchema = createSchema;

/**
 * Schema for ID parameter validation
 */
export const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * Inferred types from schemas
 */
export type MicronutrienteInput = z.infer<typeof micronutrienteSchema>;
export type CreateInput = z.infer<typeof createSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;
export type ParamsInput = z.infer<typeof paramsSchema>;
