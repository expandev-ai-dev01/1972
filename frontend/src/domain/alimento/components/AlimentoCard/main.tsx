import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { Button } from '@/core/components/button';
import { Separator } from '@/core/components/separator';
import { Edit, Trash2 } from 'lucide-react';
import type { AlimentoCardProps } from './types';

function AlimentoCard({ alimento, onEdit, onDelete }: AlimentoCardProps) {
  const getCategoriaColor = (categoria: string) => {
    const colors: Record<string, string> = {
      frutas: 'bg-green-100 text-green-800 border-green-200',
      vegetais: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      carnes: 'bg-red-100 text-red-800 border-red-200',
      laticínios: 'bg-blue-100 text-blue-800 border-blue-200',
      grãos: 'bg-amber-100 text-amber-800 border-amber-200',
      bebidas: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      processados: 'bg-orange-100 text-orange-800 border-orange-200',
      outros: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[categoria] || colors.outros;
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{alimento.nome}</CardTitle>
            {alimento.marca && <p className="text-muted-foreground text-sm">{alimento.marca}</p>}
          </div>
          <Badge className={getCategoriaColor(alimento.categoria)}>{alimento.categoria}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {alimento.descricao && (
          <p className="text-muted-foreground text-sm">{alimento.descricao}</p>
        )}

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Porção:</span>
            <span className="ml-2 font-medium">
              {alimento.porcao} {alimento.unidadeMedida}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Calorias:</span>
            <span className="ml-2 font-medium">{alimento.calorias} kcal</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Macronutrientes</h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="rounded-md bg-blue-50 p-2 text-center">
              <div className="text-muted-foreground text-xs">Carboidratos</div>
              <div className="font-semibold text-blue-700">{alimento.carboidratos}g</div>
            </div>
            <div className="rounded-md bg-red-50 p-2 text-center">
              <div className="text-muted-foreground text-xs">Proteínas</div>
              <div className="font-semibold text-red-700">{alimento.proteinas}g</div>
            </div>
            <div className="rounded-md bg-yellow-50 p-2 text-center">
              <div className="text-muted-foreground text-xs">Gorduras</div>
              <div className="font-semibold text-yellow-700">{alimento.gordurasTotais}g</div>
            </div>
          </div>
        </div>

        {(alimento.fibras !== null || alimento.sodio !== null || alimento.acucares !== null) && (
          <>
            <Separator />
            <div className="grid grid-cols-3 gap-2 text-sm">
              {alimento.fibras !== null && (
                <div>
                  <span className="text-muted-foreground">Fibras:</span>
                  <span className="ml-1 font-medium">{alimento.fibras}g</span>
                </div>
              )}
              {alimento.sodio !== null && (
                <div>
                  <span className="text-muted-foreground">Sódio:</span>
                  <span className="ml-1 font-medium">{alimento.sodio}mg</span>
                </div>
              )}
              {alimento.acucares !== null && (
                <div>
                  <span className="text-muted-foreground">Açúcares:</span>
                  <span className="ml-1 font-medium">{alimento.acucares}g</span>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {onEdit && (
          <Button variant="outline" size="sm" onClick={() => onEdit(alimento)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        )}
        {onDelete && (
          <Button variant="destructive" size="sm" onClick={() => onDelete(alimento.id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export { AlimentoCard };
