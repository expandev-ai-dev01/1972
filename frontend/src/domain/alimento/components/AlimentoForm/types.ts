import type { Alimento } from '../../types/models';

export interface AlimentoFormProps {
  alimento?: Alimento;
  onSuccess?: () => void;
  onCancel?: () => void;
}
