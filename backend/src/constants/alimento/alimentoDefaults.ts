/**
 * @summary
 * Default values and constants for Alimento entity.
 * Provides centralized configuration for entity creation and validation limits.
 *
 * @module constants/alimento/alimentoDefaults
 */

/**
 * @interface AlimentoLimitsType
 * @description Validation constraints for Alimento entity fields.
 *
 * @property {number} NOME_MIN_LENGTH - Minimum characters for name field (3)
 * @property {number} NOME_MAX_LENGTH - Maximum characters for name field (100)
 * @property {number} DESCRICAO_MAX_LENGTH - Maximum characters for description field (500)
 * @property {number} FONTE_MAX_LENGTH - Maximum characters for source field (200)
 * @property {number} MARCA_MAX_LENGTH - Maximum characters for brand field (100)
 */
export const ALIMENTO_LIMITS = {
  NOME_MIN_LENGTH: 3,
  NOME_MAX_LENGTH: 100,
  DESCRICAO_MAX_LENGTH: 500,
  FONTE_MAX_LENGTH: 200,
  MARCA_MAX_LENGTH: 100,
} as const;

/** Type representing the ALIMENTO_LIMITS constant */
export type AlimentoLimitsType = typeof ALIMENTO_LIMITS;

/**
 * @interface AlimentoCategoriesType
 * @description Available categories for Alimento entities.
 *
 * @property {string} FRUTAS - Fruits category ('frutas')
 * @property {string} VEGETAIS - Vegetables category ('vegetais')
 * @property {string} CARNES - Meats category ('carnes')
 * @property {string} LATICINIOS - Dairy category ('laticínios')
 * @property {string} GRAOS - Grains category ('grãos')
 * @property {string} BEBIDAS - Beverages category ('bebidas')
 * @property {string} PROCESSADOS - Processed foods category ('processados')
 * @property {string} OUTROS - Other category ('outros')
 */
export const ALIMENTO_CATEGORIES = {
  FRUTAS: 'frutas',
  VEGETAIS: 'vegetais',
  CARNES: 'carnes',
  LATICINIOS: 'laticínios',
  GRAOS: 'grãos',
  BEBIDAS: 'bebidas',
  PROCESSADOS: 'processados',
  OUTROS: 'outros',
} as const;

/** Type representing the ALIMENTO_CATEGORIES constant */
export type AlimentoCategoriesType = typeof ALIMENTO_CATEGORIES;

/** Union type of all valid category values */
export type AlimentoCategory = (typeof ALIMENTO_CATEGORIES)[keyof typeof ALIMENTO_CATEGORIES];

/**
 * @interface AlimentoUnitsType
 * @description Available units of measurement for Alimento entities.
 *
 * @property {string} GRAMAS - Grams unit ('g')
 * @property {string} MILILITROS - Milliliters unit ('ml')
 * @property {string} UNIDADE - Unit measurement ('unidade')
 */
export const ALIMENTO_UNITS = {
  GRAMAS: 'g',
  MILILITROS: 'ml',
  UNIDADE: 'unidade',
} as const;

/** Type representing the ALIMENTO_UNITS constant */
export type AlimentoUnitsType = typeof ALIMENTO_UNITS;

/** Union type of all valid unit values */
export type AlimentoUnit = (typeof ALIMENTO_UNITS)[keyof typeof ALIMENTO_UNITS];
