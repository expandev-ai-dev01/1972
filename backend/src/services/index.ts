/**
 * @summary
 * Centralized service exports.
 * Provides single import point for all business logic services.
 *
 * @module services
 */

export {
  initExampleCreate,
  initExampleList,
  initExampleGet,
  initExampleUpdate,
  initExampleDelete,
  type InitExampleEntity,
  type InitExampleCreateRequest,
  type InitExampleUpdateRequest,
  type InitExampleListResponse,
  type InitExampleMetadata,
  type MetadataInput as InitExampleMetadataInput,
  type CreateInput as InitExampleCreateInput,
  type UpdateInput as InitExampleUpdateInput,
  type ParamsInput as InitExampleParamsInput,
  createSchema as initExampleCreateSchema,
  updateSchema as initExampleUpdateSchema,
  paramsSchema as initExampleParamsSchema,
} from './initExample';

export {
  alimentoCreate,
  alimentoList,
  alimentoGet,
  alimentoUpdate,
  alimentoDelete,
  type AlimentoEntity,
  type AlimentoCreateRequest,
  type AlimentoUpdateRequest,
  type AlimentoListResponse,
  type AlimentoMicronutriente,
  type MicronutrienteInput as AlimentoMicronutrienteInput,
  type CreateInput as AlimentoCreateInput,
  type UpdateInput as AlimentoUpdateInput,
  type ParamsInput as AlimentoParamsInput,
  createSchema as alimentoCreateSchema,
  updateSchema as alimentoUpdateSchema,
  paramsSchema as alimentoParamsSchema,
} from './alimento';
