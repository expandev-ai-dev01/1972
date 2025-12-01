/**
 * @hook useAlimentoList
 * @description Hook for managing food list with filters
 */

import { useQuery } from '@tanstack/react-query';
import { alimentoService } from '../../services/alimentoService';
import type { AlimentoFilters } from '../../types/models';

export const useAlimentoList = (filters?: AlimentoFilters) => {
  return useQuery({
    queryKey: ['alimentos', filters],
    queryFn: () => alimentoService.list(filters),
  });
};
