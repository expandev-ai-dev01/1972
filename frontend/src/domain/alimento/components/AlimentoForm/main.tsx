import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  alimentoSchema,
  type AlimentoFormInput,
  type AlimentoFormOutput,
} from '../../validations/alimento';
import { useAlimentoMutations } from '../../hooks/useAlimentoMutations';
import type { AlimentoFormProps } from './types';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Textarea } from '@/core/components/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/core/components/card';
import { Separator } from '@/core/components/separator';

function AlimentoForm({ alimento, onSuccess, onCancel }: AlimentoFormProps) {
  const { create, update, isCreating, isUpdating } = useAlimentoMutations();
  const isEditing = !!alimento;

  const form = useForm<AlimentoFormInput, unknown, AlimentoFormOutput>({
    resolver: zodResolver(alimentoSchema),
    mode: 'onBlur',
    defaultValues: {
      nome: alimento?.nome ?? '',
      descricao: alimento?.descricao ?? null,
      porcao: alimento?.porcao ?? 100,
      unidadeMedida: alimento?.unidadeMedida ?? 'g',
      calorias: alimento?.calorias ?? 0,
      carboidratos: alimento?.carboidratos ?? 0,
      proteinas: alimento?.proteinas ?? 0,
      gordurasTotais: alimento?.gordurasTotais ?? 0,
      gordurasSaturadas: alimento?.gordurasSaturadas ?? null,
      gordurasTrans: alimento?.gordurasTrans ?? null,
      fibras: alimento?.fibras ?? null,
      sodio: alimento?.sodio ?? null,
      acucares: alimento?.acucares ?? null,
      vitaminas: alimento?.vitaminas ?? [],
      minerais: alimento?.minerais ?? [],
      categoria: alimento?.categoria ?? 'outros',
      fonte: alimento?.fonte ?? null,
      codigoBarras: alimento?.codigoBarras ?? null,
      marca: alimento?.marca ?? null,
    },
  });

  const onSubmit = async (data: AlimentoFormOutput) => {
    try {
      if (isEditing && alimento) {
        await update({ id: alimento.id, data });
      } else {
        await create(data);
      }
      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Editar Alimento' : 'Cadastrar Alimento'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações Básicas</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Arroz integral" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descrição detalhada do alimento"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="porcao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Porção *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unidadeMedida"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unidade *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="g">Gramas (g)</SelectItem>
                          <SelectItem value="ml">Mililitros (ml)</SelectItem>
                          <SelectItem value="unidade">Unidade</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="calorias"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calorias (kcal) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="marca"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Tio João" {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="codigoBarras"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código de Barras</FormLabel>
                      <FormControl>
                        <Input placeholder="Apenas números" {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Macronutrientes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Macronutrientes</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="carboidratos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carboidratos (g) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="proteinas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proteínas (g) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gordurasTotais"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gorduras Totais (g) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="gordurasSaturadas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gorduras Saturadas (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gordurasTrans"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gorduras Trans (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Outros Nutrientes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Outros Nutrientes</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="fibras"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fibras (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sodio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sódio (mg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="acucares"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Açúcares (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="fonte"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fonte da Informação</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Tabela TACO" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormDescription>Fonte das informações nutricionais</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating ? 'Salvando...' : isEditing ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export { AlimentoForm };
