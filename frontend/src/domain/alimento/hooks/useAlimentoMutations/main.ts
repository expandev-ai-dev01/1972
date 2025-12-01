/**
 * @hook useAlimentoMutations
 * @description Hook for food CRUD mutations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { alimentoService } from '../../services/alimentoService';
import { toast } from 'sonner';

export const useAlimentoMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: alimentoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alimentos'] });
      toast.success('Alimento cadastrado com sucesso');
    },
    onError: () => {
      toast.error('Erro ao cadastrar alimento');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Parameters<typeof alimentoService.update>[1];
    }) => alimentoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alimentos'] });
      toast.success('Alimento atualizado com sucesso');
    },
    onError: () => {
      toast.error('Erro ao atualizar alimento');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: alimentoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alimentos'] });
      toast.success('Alimento excluído com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir alimento');
    },
  });

  return {
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
