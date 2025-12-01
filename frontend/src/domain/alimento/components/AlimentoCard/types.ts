import type { Alimento } from '../../types/models';

export interface AlimentoCardProps {
  alimento: Alimento;
  onEdit?: (alimento: Alimento) => void;
  onDelete?: (id: number) => void;
}
