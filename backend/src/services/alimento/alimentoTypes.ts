/**
 * @summary
 * Type definitions for Alimento (Food) entity.
 *
 * @module services/alimento/alimentoTypes
 */

/**
 * @interface AlimentoMicronutriente
 * @description Represents a vitamin or mineral in food
 *
 * @property {string} nome - Micronutrient name
 * @property {number} quantidade - Quantity
 * @property {string} unidade - Unit of measurement
 */
export interface AlimentoMicronutriente {
  nome: string;
  quantidade: number;
  unidade: string;
}

/**
 * @interface AlimentoEntity
 * @description Represents a food entity with complete nutritional information
 *
 * @property {number} id - Unique identifier
 * @property {string} nome - Food name
 * @property {string | null} descricao - Detailed description
 * @property {number} porcao - Standard serving size
 * @property {string} unidadeMedida - Unit of measurement (g, ml, unidade)
 * @property {number} calorias - Calories per serving (kcal)
 * @property {number} carboidratos - Carbohydrates per serving (g)
 * @property {number} proteinas - Proteins per serving (g)
 * @property {number} gordurasTotais - Total fats per serving (g)
 * @property {number | null} gordurasSaturadas - Saturated fats per serving (g)
 * @property {number | null} gordurasTrans - Trans fats per serving (g)
 * @property {number | null} fibras - Fiber per serving (g)
 * @property {number | null} sodio - Sodium per serving (mg)
 * @property {number | null} acucares - Sugars per serving (g)
 * @property {AlimentoMicronutriente[]} vitaminas - List of vitamins
 * @property {AlimentoMicronutriente[]} minerais - List of minerals
 * @property {string} categoria - Food category
 * @property {string | null} fonte - Information source
 * @property {string | null} codigoBarras - Product barcode
 * @property {string | null} marca - Product brand
 * @property {string} dataCadastro - Registration timestamp (ISO 8601)
 */
export interface AlimentoEntity {
  id: number;
  nome: string;
  descricao: string | null;
  porcao: number;
  unidadeMedida: string;
  calorias: number;
  carboidratos: number;
  proteinas: number;
  gordurasTotais: number;
  gordurasSaturadas: number | null;
  gordurasTrans: number | null;
  fibras: number | null;
  sodio: number | null;
  acucares: number | null;
  vitaminas: AlimentoMicronutriente[];
  minerais: AlimentoMicronutriente[];
  categoria: string;
  fonte: string | null;
  codigoBarras: string | null;
  marca: string | null;
  dataCadastro: string;
}

/**
 * @interface AlimentoCreateRequest
 * @description Request payload for creating a food
 */
export interface AlimentoCreateRequest {
  nome: string;
  descricao: string | null;
  porcao: number;
  unidadeMedida: string;
  calorias: number;
  carboidratos: number;
  proteinas: number;
  gordurasTotais: number;
  gordurasSaturadas: number | null;
  gordurasTrans: number | null;
  fibras: number | null;
  sodio: number | null;
  acucares: number | null;
  vitaminas?: AlimentoMicronutriente[];
  minerais?: AlimentoMicronutriente[];
  categoria: string;
  fonte: string | null;
  codigoBarras: string | null;
  marca: string | null;
}

/**
 * @interface AlimentoUpdateRequest
 * @description Request payload for updating a food
 */
export interface AlimentoUpdateRequest {
  nome: string;
  descricao: string | null;
  porcao: number;
  unidadeMedida: string;
  calorias: number;
  carboidratos: number;
  proteinas: number;
  gordurasTotais: number;
  gordurasSaturadas: number | null;
  gordurasTrans: number | null;
  fibras: number | null;
  sodio: number | null;
  acucares: number | null;
  vitaminas?: AlimentoMicronutriente[];
  minerais?: AlimentoMicronutriente[];
  categoria: string;
  fonte: string | null;
  codigoBarras: string | null;
  marca: string | null;
}

/**
 * @interface AlimentoListResponse
 * @description Response structure for listing foods
 */
export interface AlimentoListResponse {
  id: number;
  nome: string;
  calorias: number;
  categoria: string;
  dataCadastro: string;
}
