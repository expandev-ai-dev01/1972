import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/core/components/dialog';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/core/components/empty';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { useAlimentoList } from '@/domain/alimento/hooks/useAlimentoList';
import { useAlimentoMutations } from '@/domain/alimento/hooks/useAlimentoMutations';
import { AlimentoForm } from '@/domain/alimento/components/AlimentoForm';
import { AlimentoCard } from '@/domain/alimento/components/AlimentoCard';
import type { Alimento, AlimentoFilters } from '@/domain/alimento/types/models';
import { UtensilsCrossed } from 'lucide-react';

function AlimentosPage() {
  const [filters, setFilters] = useState<AlimentoFilters>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAlimento, setEditingAlimento] = useState<Alimento | undefined>();

  const { data: alimentos, isLoading } = useAlimentoList(filters);
  const { delete: deleteAlimento } = useAlimentoMutations();

  const handleEdit = (alimento: Alimento) => {
    setEditingAlimento(alimento);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este alimento?')) {
      await deleteAlimento(id);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingAlimento(undefined);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingAlimento(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alimentos</h1>
          <p className="text-muted-foreground">
            Gerencie o cadastro de alimentos e suas informações nutricionais
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Cadastrar Alimento
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card flex flex-col gap-4 rounded-lg border p-4 shadow-sm sm:flex-row">
        <Input
          placeholder="Buscar por nome..."
          value={filters.termo ?? ''}
          onChange={(e) => setFilters({ ...filters, termo: e.target.value || undefined })}
          className="flex-1"
        />
        <Select
          value={filters.categoria ?? 'all'}
          onValueChange={(value) =>
            setFilters({
              ...filters,
              categoria: value === 'all' ? undefined : (value as AlimentoFilters['categoria']),
            })
          }
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="frutas">Frutas</SelectItem>
            <SelectItem value="vegetais">Vegetais</SelectItem>
            <SelectItem value="carnes">Carnes</SelectItem>
            <SelectItem value="laticínios">Laticínios</SelectItem>
            <SelectItem value="grãos">Grãos</SelectItem>
            <SelectItem value="bebidas">Bebidas</SelectItem>
            <SelectItem value="processados">Processados</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      ) : alimentos && alimentos.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {alimentos.map((alimento) => (
            <AlimentoCard
              key={alimento.id}
              alimento={alimento}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <Empty className="min-h-[400px]">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UtensilsCrossed className="h-6 w-6" />
            </EmptyMedia>
            <EmptyTitle>Nenhum alimento encontrado</EmptyTitle>
            <EmptyDescription>
              {filters.termo || filters.categoria
                ? 'Tente ajustar os filtros de busca'
                : 'Comece cadastrando seu primeiro alimento'}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Cadastrar Alimento
            </Button>
          </EmptyContent>
        </Empty>
      )}

      {/* Form Dialog */}
      <Dialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingAlimento(undefined);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAlimento ? 'Editar Alimento' : 'Cadastrar Alimento'}</DialogTitle>
          </DialogHeader>
          <AlimentoForm
            alimento={editingAlimento}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { AlimentosPage };
