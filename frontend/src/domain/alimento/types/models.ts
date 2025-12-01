/**
 * @module domain/alimento/types/models
 * @description Alimento entity type definitions
 */

export interface Micronutriente {
  nome: string;
  quantidade: number;
  unidade: string;
}

export interface Alimento {
  id: number;
  nome: string;
  descricao: string | null;
  porcao: number;
  unidadeMedida: 'g' | 'ml' | 'unidade';
  calorias: number;
  carboidratos: number;
  proteinas: number;
  gordurasTotais: number;
  gordurasSaturadas: number | null;
  gordurasTrans: number | null;
  fibras: number | null;
  sodio: number | null;
  acucares: number | null;
  vitaminas: Micronutriente[];
  minerais: Micronutriente[];
  categoria:
    | 'frutas'
    | 'vegetais'
    | 'carnes'
    | 'laticínios'
    | 'grãos'
    | 'bebidas'
    | 'processados'
    | 'outros';
  fonte: string | null;
  codigoBarras: string | null;
  marca: string | null;
  dataCadastro: string;
}

export interface AlimentoFilters {
  categoria?: Alimento['categoria'];
  termo?: string;
}

export type AlimentoFormInput = Omit<Alimento, 'id' | 'dataCadastro'>;
export type AlimentoFormOutput = Omit<Alimento, 'id' | 'dataCadastro'>;
