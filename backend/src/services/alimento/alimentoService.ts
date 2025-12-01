/**
 * @summary
 * Business logic for Alimento (Food) entity.
 * Handles CRUD operations using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/alimento/alimentoService
 */

import { alimentoStore } from '@/instances';
import { ServiceError } from '@/utils';
import { AlimentoEntity, AlimentoListResponse } from './alimentoTypes';
import { createSchema, updateSchema, paramsSchema } from './alimentoValidation';

/**
 * @summary
 * Lists all foods from the in-memory store.
 *
 * @function alimentoList
 * @module services/alimento
 *
 * @returns {Promise<AlimentoListResponse[]>} List of food entities
 *
 * @example
 * const foods = await alimentoList();
 * // Returns: [{ id: 1, nome: 'Banana', calorias: 89, categoria: 'frutas', dataCadastro: '2025-01-01T00:00:00.000Z' }]
 */
export async function alimentoList(): Promise<AlimentoListResponse[]> {
  const records = alimentoStore.getAll();
  return records.map((a) => ({
    id: a.id,
    nome: a.nome,
    calorias: a.calorias,
    categoria: a.categoria,
    dataCadastro: a.dataCadastro,
  }));
}

/**
 * @summary
 * Creates a new food entity with validated data.
 *
 * @function alimentoCreate
 * @module services/alimento
 *
 * @param {unknown} body - Raw request body to validate against createSchema
 * @returns {Promise<AlimentoEntity>} The newly created food entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 *
 * @example
 * const newFood = await alimentoCreate({ nome: 'Banana', porcao: 100, unidadeMedida: 'g', calorias: 89, ... });
 * // Returns: { id: 1, nome: 'Banana', ... }
 */
export async function alimentoCreate(body: unknown): Promise<AlimentoEntity> {
  const validation = createSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;
  const now = new Date().toISOString();
  const id = alimentoStore.getNextId();

  const newAlimento: AlimentoEntity = {
    id,
    nome: params.nome,
    descricao: params.descricao,
    porcao: params.porcao,
    unidadeMedida: params.unidadeMedida,
    calorias: params.calorias,
    carboidratos: params.carboidratos,
    proteinas: params.proteinas,
    gordurasTotais: params.gordurasTotais,
    gordurasSaturadas: params.gordurasSaturadas,
    gordurasTrans: params.gordurasTrans,
    fibras: params.fibras,
    sodio: params.sodio,
    acucares: params.acucares,
    vitaminas: params.vitaminas ?? [],
    minerais: params.minerais ?? [],
    categoria: params.categoria,
    fonte: params.fonte,
    codigoBarras: params.codigoBarras,
    marca: params.marca,
    dataCadastro: now,
  };

  alimentoStore.add(newAlimento);
  return newAlimento;
}

/**
 * @summary
 * Retrieves a specific food by its unique identifier.
 *
 * @function alimentoGet
 * @module services/alimento
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<AlimentoEntity>} The found food entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When entity with given ID does not exist
 *
 * @example
 * const food = await alimentoGet({ id: '1' });
 * // Returns: { id: 1, nome: 'Banana', ... }
 */
export async function alimentoGet(params: unknown): Promise<AlimentoEntity> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const record = alimentoStore.getById(id);

  if (!record) {
    throw new ServiceError('NOT_FOUND', 'Food not found', 404);
  }

  return record as AlimentoEntity;
}

/**
 * @summary
 * Updates an existing food entity with new data.
 *
 * @function alimentoUpdate
 * @module services/alimento
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @param {unknown} body - Raw request body with update data to validate
 * @returns {Promise<AlimentoEntity>} The updated food entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID or body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When entity with given ID does not exist
 *
 * @example
 * const updated = await alimentoUpdate({ id: '1' }, { nome: 'Banana Prata', calorias: 92, ... });
 * // Returns: { id: 1, nome: 'Banana Prata', calorias: 92, ... }
 */
export async function alimentoUpdate(params: unknown, body: unknown): Promise<AlimentoEntity> {
  const paramsValidation = paramsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramsValidation.error.errors);
  }

  const bodyValidation = updateSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramsValidation.data;
  const existing = alimentoStore.getById(id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Food not found', 404);
  }

  const updateData = bodyValidation.data;
  const updated = alimentoStore.update(id, {
    nome: updateData.nome,
    descricao: updateData.descricao,
    porcao: updateData.porcao,
    unidadeMedida: updateData.unidadeMedida,
    calorias: updateData.calorias,
    carboidratos: updateData.carboidratos,
    proteinas: updateData.proteinas,
    gordurasTotais: updateData.gordurasTotais,
    gordurasSaturadas: updateData.gordurasSaturadas,
    gordurasTrans: updateData.gordurasTrans,
    fibras: updateData.fibras,
    sodio: updateData.sodio,
    acucares: updateData.acucares,
    vitaminas: updateData.vitaminas ?? existing.vitaminas,
    minerais: updateData.minerais ?? existing.minerais,
    categoria: updateData.categoria,
    fonte: updateData.fonte,
    codigoBarras: updateData.codigoBarras,
    marca: updateData.marca,
  });

  return updated as AlimentoEntity;
}

/**
 * @summary
 * Permanently deletes a food entity by its ID.
 *
 * @function alimentoDelete
 * @module services/alimento
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When entity with given ID does not exist
 *
 * @example
 * const result = await alimentoDelete({ id: '1' });
 * // Returns: { message: 'Food deleted successfully' }
 */
export async function alimentoDelete(params: unknown): Promise<{ message: string }> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;

  if (!alimentoStore.exists(id)) {
    throw new ServiceError('NOT_FOUND', 'Food not found', 404);
  }

  alimentoStore.delete(id);
  return { message: 'Food deleted successfully' };
}
