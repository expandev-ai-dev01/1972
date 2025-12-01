/**
 * @service alimentoService
 * @domain alimento
 * @type REST API
 * @description Service for Alimento CRUD operations
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Alimento, AlimentoFilters } from '../types/models';
import type { AlimentoFormOutput } from '../validations/alimento';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const alimentoService = {
  /**
   * List all foods with optional filters
   */
  async list(filters?: AlimentoFilters): Promise<Alimento[]> {
    const { data } = await authenticatedClient.get<ApiResponse<Alimento[]>>('/alimento', {
      params: filters,
    });
    return data.data;
  },

  /**
   * Get a single food by ID
   */
  async getById(id: number): Promise<Alimento> {
    const { data } = await authenticatedClient.get<ApiResponse<Alimento>>(`/alimento/${id}`);
    return data.data;
  },

  /**
   * Create a new food
   */
  async create(alimentoData: AlimentoFormOutput): Promise<Alimento> {
    const { data } = await authenticatedClient.post<ApiResponse<Alimento>>(
      '/alimento',
      alimentoData
    );
    return data.data;
  },

  /**
   * Update an existing food
   */
  async update(id: number, alimentoData: AlimentoFormOutput): Promise<Alimento> {
    const { data } = await authenticatedClient.put<ApiResponse<Alimento>>(
      `/alimento/${id}`,
      alimentoData
    );
    return data.data;
  },

  /**
   * Delete a food
   */
  async delete(id: number): Promise<{ message: string }> {
    const { data } = await authenticatedClient.delete<ApiResponse<{ message: string }>>(
      `/alimento/${id}`
    );
    return data.data;
  },
};
