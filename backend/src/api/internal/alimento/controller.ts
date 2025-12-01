/**
 * @summary
 * API controller for Alimento (Food) entity.
 * Handles food registration with complete nutritional information.
 *
 * @module api/internal/alimento/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  alimentoCreate,
  alimentoList,
  alimentoGet,
  alimentoUpdate,
  alimentoDelete,
} from '@/services/alimento';

/**
 * @api {get} /api/internal/alimento List Foods
 * @apiName ListAlimentos
 * @apiGroup Alimento
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data List of foods
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.nome Food name
 * @apiSuccess {Number} data.calorias Calories per serving (kcal)
 * @apiSuccess {String} data.categoria Category
 * @apiSuccess {String} data.dataCadastro ISO 8601 timestamp
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await alimentoList();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/alimento Create Food
 * @apiName CreateAlimento
 * @apiGroup Alimento
 *
 * @apiBody {String} nome Food name (3-100 chars)
 * @apiBody {String|null} descricao Description (max 500 chars)
 * @apiBody {Number} porcao Serving size (> 0)
 * @apiBody {String} unidadeMedida Unit (g | ml | unidade)
 * @apiBody {Number} calorias Calories per serving (>= 0)
 * @apiBody {Number} carboidratos Carbohydrates (g, >= 0)
 * @apiBody {Number} proteinas Proteins (g, >= 0)
 * @apiBody {Number} gordurasTotais Total fats (g, >= 0)
 * @apiBody {Number|null} gordurasSaturadas Saturated fats (g, >= 0)
 * @apiBody {Number|null} gordurasTrans Trans fats (g, >= 0)
 * @apiBody {Number|null} fibras Fiber (g, >= 0)
 * @apiBody {Number|null} sodio Sodium (mg, >= 0)
 * @apiBody {Number|null} acucares Sugars (g, >= 0)
 * @apiBody {Object[]} [vitaminas] Vitamins list
 * @apiBody {String} vitaminas.nome Vitamin name
 * @apiBody {Number} vitaminas.quantidade Quantity
 * @apiBody {String} vitaminas.unidade Unit
 * @apiBody {Object[]} [minerais] Minerals list
 * @apiBody {String} minerais.nome Mineral name
 * @apiBody {Number} minerais.quantidade Quantity
 * @apiBody {String} minerais.unidade Unit
 * @apiBody {String} categoria Category (frutas | vegetais | carnes | laticínios | grãos | bebidas | processados | outros)
 * @apiBody {String|null} fonte Information source
 * @apiBody {String|null} codigoBarras Barcode
 * @apiBody {String|null} marca Brand
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.nome Food name
 * @apiSuccess {String|null} data.descricao Description
 * @apiSuccess {Number} data.porcao Serving size
 * @apiSuccess {String} data.unidadeMedida Unit
 * @apiSuccess {Number} data.calorias Calories
 * @apiSuccess {Number} data.carboidratos Carbohydrates
 * @apiSuccess {Number} data.proteinas Proteins
 * @apiSuccess {Number} data.gordurasTotais Total fats
 * @apiSuccess {Number|null} data.gordurasSaturadas Saturated fats
 * @apiSuccess {Number|null} data.gordurasTrans Trans fats
 * @apiSuccess {Number|null} data.fibras Fiber
 * @apiSuccess {Number|null} data.sodio Sodium
 * @apiSuccess {Number|null} data.acucares Sugars
 * @apiSuccess {Object[]} data.vitaminas Vitamins
 * @apiSuccess {Object[]} data.minerais Minerals
 * @apiSuccess {String} data.categoria Category
 * @apiSuccess {String|null} data.fonte Source
 * @apiSuccess {String|null} data.codigoBarras Barcode
 * @apiSuccess {String|null} data.marca Brand
 * @apiSuccess {String} data.dataCadastro ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await alimentoCreate(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/alimento/:id Get Food
 * @apiName GetAlimento
 * @apiGroup Alimento
 *
 * @apiParam {Number} id Food ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.nome Food name
 * @apiSuccess {String|null} data.descricao Description
 * @apiSuccess {Number} data.porcao Serving size
 * @apiSuccess {String} data.unidadeMedida Unit
 * @apiSuccess {Number} data.calorias Calories
 * @apiSuccess {Number} data.carboidratos Carbohydrates
 * @apiSuccess {Number} data.proteinas Proteins
 * @apiSuccess {Number} data.gordurasTotais Total fats
 * @apiSuccess {Number|null} data.gordurasSaturadas Saturated fats
 * @apiSuccess {Number|null} data.gordurasTrans Trans fats
 * @apiSuccess {Number|null} data.fibras Fiber
 * @apiSuccess {Number|null} data.sodio Sodium
 * @apiSuccess {Number|null} data.acucares Sugars
 * @apiSuccess {Object[]} data.vitaminas Vitamins
 * @apiSuccess {Object[]} data.minerais Minerals
 * @apiSuccess {String} data.categoria Category
 * @apiSuccess {String|null} data.fonte Source
 * @apiSuccess {String|null} data.codigoBarras Barcode
 * @apiSuccess {String|null} data.marca Brand
 * @apiSuccess {String} data.dataCadastro ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await alimentoGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/alimento/:id Update Food
 * @apiName UpdateAlimento
 * @apiGroup Alimento
 *
 * @apiParam {Number} id Food ID
 *
 * @apiBody {String} nome Food name (3-100 chars)
 * @apiBody {String|null} descricao Description (max 500 chars)
 * @apiBody {Number} porcao Serving size (> 0)
 * @apiBody {String} unidadeMedida Unit (g | ml | unidade)
 * @apiBody {Number} calorias Calories per serving (>= 0)
 * @apiBody {Number} carboidratos Carbohydrates (g, >= 0)
 * @apiBody {Number} proteinas Proteins (g, >= 0)
 * @apiBody {Number} gordurasTotais Total fats (g, >= 0)
 * @apiBody {Number|null} gordurasSaturadas Saturated fats (g, >= 0)
 * @apiBody {Number|null} gordurasTrans Trans fats (g, >= 0)
 * @apiBody {Number|null} fibras Fiber (g, >= 0)
 * @apiBody {Number|null} sodio Sodium (mg, >= 0)
 * @apiBody {Number|null} acucares Sugars (g, >= 0)
 * @apiBody {Object[]} [vitaminas] Vitamins list
 * @apiBody {Object[]} [minerais] Minerals list
 * @apiBody {String} categoria Category
 * @apiBody {String|null} fonte Information source
 * @apiBody {String|null} codigoBarras Barcode
 * @apiBody {String|null} marca Brand
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.nome Food name
 * @apiSuccess {String|null} data.descricao Description
 * @apiSuccess {Number} data.porcao Serving size
 * @apiSuccess {String} data.unidadeMedida Unit
 * @apiSuccess {Number} data.calorias Calories
 * @apiSuccess {Number} data.carboidratos Carbohydrates
 * @apiSuccess {Number} data.proteinas Proteins
 * @apiSuccess {Number} data.gordurasTotais Total fats
 * @apiSuccess {Number|null} data.gordurasSaturadas Saturated fats
 * @apiSuccess {Number|null} data.gordurasTrans Trans fats
 * @apiSuccess {Number|null} data.fibras Fiber
 * @apiSuccess {Number|null} data.sodio Sodium
 * @apiSuccess {Number|null} data.acucares Sugars
 * @apiSuccess {Object[]} data.vitaminas Vitamins
 * @apiSuccess {Object[]} data.minerais Minerals
 * @apiSuccess {String} data.categoria Category
 * @apiSuccess {String|null} data.fonte Source
 * @apiSuccess {String|null} data.codigoBarras Barcode
 * @apiSuccess {String|null} data.marca Brand
 * @apiSuccess {String} data.dataCadastro ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await alimentoUpdate(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /api/internal/alimento/:id Delete Food
 * @apiName DeleteAlimento
 * @apiGroup Alimento
 *
 * @apiParam {Number} id Food ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await alimentoDelete(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
