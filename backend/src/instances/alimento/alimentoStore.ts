/**
 * @summary
 * In-memory store instance for Alimento entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/alimento/alimentoStore
 */

import { AlimentoMicronutriente } from '@/services/alimento';

/**
 * Alimento record structure
 */
export interface AlimentoRecord {
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
 * In-memory store for Alimento records
 */
class AlimentoStore {
  private records: Map<number, AlimentoRecord> = new Map();
  private currentId: number = 0;

  /**
   * Get next available ID
   */
  getNextId(): number {
    this.currentId += 1;
    return this.currentId;
  }

  /**
   * Get all records
   */
  getAll(): AlimentoRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: number): AlimentoRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: AlimentoRecord): AlimentoRecord {
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Update existing record
   */
  update(id: number, data: Partial<AlimentoRecord>): AlimentoRecord | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data };
    this.records.set(id, updated);
    return updated;
  }

  /**
   * Delete record by ID
   */
  delete(id: number): boolean {
    return this.records.delete(id);
  }

  /**
   * Check if record exists
   */
  exists(id: number): boolean {
    return this.records.has(id);
  }

  /**
   * Get total count of records
   */
  count(): number {
    return this.records.size;
  }

  /**
   * Clear all records (useful for testing)
   */
  clear(): void {
    this.records.clear();
    this.currentId = 0;
  }
}

/**
 * Singleton instance of AlimentoStore
 */
export const alimentoStore = new AlimentoStore();
