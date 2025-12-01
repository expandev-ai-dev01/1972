/**
 * @module domain/alimento/validations/alimento
 * @description Zod validation schemas for Alimento entity
 */

import { z } from 'zod';

const unidadesMedida = ['g', 'ml', 'unidade'] as const;
const categorias = [
  'frutas',
  'vegetais',
  'carnes',
  'laticínios',
  'grãos',
  'bebidas',
  'processados',
  'outros',
] as const;

const micronutrienteSchema = z.object({
  nome: z.string('Nome do micronutriente é obrigatório').min(1, 'Nome não pode estar vazio'),
  quantidade: z
    .number('Quantidade é obrigatória')
    .min(0, 'Quantidade deve ser maior ou igual a zero'),
  unidade: z.string('Unidade é obrigatória').min(1, 'Unidade não pode estar vazia'),
});

export const alimentoSchema = z
  .object({
    nome: z
      .string('Nome é obrigatório')
      .min(3, 'Nome deve ter pelo menos 3 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres'),
    descricao: z
      .string()
      .max(500, 'Descrição deve ter no máximo 500 caracteres')
      .nullable()
      .optional(),
    porcao: z.number('Porção é obrigatória').min(0.01, 'Porção deve ser maior que zero'),
    unidadeMedida: z.enum(unidadesMedida, 'Selecione uma unidade de medida válida'),
    calorias: z
      .number('Calorias são obrigatórias')
      .min(0, 'Calorias devem ser maior ou igual a zero'),
    carboidratos: z
      .number('Carboidratos são obrigatórios')
      .min(0, 'Carboidratos devem ser maior ou igual a zero'),
    proteinas: z
      .number('Proteínas são obrigatórias')
      .min(0, 'Proteínas devem ser maior ou igual a zero'),
    gordurasTotais: z
      .number('Gorduras totais são obrigatórias')
      .min(0, 'Gorduras totais devem ser maior ou igual a zero'),
    gordurasSaturadas: z
      .number()
      .min(0, 'Gorduras saturadas devem ser maior ou igual a zero')
      .nullable()
      .optional(),
    gordurasTrans: z
      .number()
      .min(0, 'Gorduras trans devem ser maior ou igual a zero')
      .nullable()
      .optional(),
    fibras: z.number().min(0, 'Fibras devem ser maior ou igual a zero').nullable().optional(),
    sodio: z.number().min(0, 'Sódio deve ser maior ou igual a zero').nullable().optional(),
    acucares: z.number().min(0, 'Açúcares devem ser maior ou igual a zero').nullable().optional(),
    vitaminas: z.array(micronutrienteSchema).optional().default([]),
    minerais: z.array(micronutrienteSchema).optional().default([]),
    categoria: z.enum(categorias, 'Selecione uma categoria válida'),
    fonte: z.string().max(200, 'Fonte deve ter no máximo 200 caracteres').nullable().optional(),
    codigoBarras: z
      .string()
      .regex(/^\d*$/, 'Código de barras deve conter apenas dígitos')
      .nullable()
      .optional(),
    marca: z.string().max(100, 'Marca deve ter no máximo 100 caracteres').nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.gordurasSaturadas !== null && data.gordurasSaturadas !== undefined) {
        return data.gordurasSaturadas <= data.gordurasTotais;
      }
      return true;
    },
    {
      message: 'Gorduras saturadas não podem exceder gorduras totais',
      path: ['gordurasSaturadas'],
    }
  )
  .refine(
    (data) => {
      if (data.gordurasTrans !== null && data.gordurasTrans !== undefined) {
        return data.gordurasTrans <= data.gordurasTotais;
      }
      return true;
    },
    {
      message: 'Gorduras trans não podem exceder gorduras totais',
      path: ['gordurasTrans'],
    }
  )
  .refine(
    (data) => {
      if (data.acucares !== null && data.acucares !== undefined) {
        return data.acucares <= data.carboidratos;
      }
      return true;
    },
    {
      message: 'Açúcares não podem exceder carboidratos',
      path: ['acucares'],
    }
  );

export type AlimentoFormInput = z.input<typeof alimentoSchema>;
export type AlimentoFormOutput = z.output<typeof alimentoSchema>;
