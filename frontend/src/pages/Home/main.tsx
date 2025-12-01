import { Button } from '@/core/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card';
import { useNavigation } from '@/core/hooks/useNavigation';
import { UtensilsCrossed, BarChart3, History, Target } from 'lucide-react';

function HomePage() {
  const { navigate } = useNavigation();

  const features = [
    {
      icon: UtensilsCrossed,
      title: 'Cadastro de Alimentos',
      description: 'Registre alimentos com informações nutricionais completas',
      action: () => navigate('/alimentos'),
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: BarChart3,
      title: 'Análise Nutricional',
      description: 'Visualize análises nutricionais em tempo real',
      action: () => {},
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: History,
      title: 'Histórico de Consumo',
      description: 'Acompanhe seu histórico completo de refeições',
      action: () => {},
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Target,
      title: 'Metas Nutricionais',
      description: 'Defina e acompanhe suas metas personalizadas',
      action: () => {},
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-8 py-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">FoodTrack</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Sistema completo para guardar e analisar suas dietas de comidas. Registre alimentos,
          acompanhe refeições e alcance suas metas nutricionais.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div
                  className={`mb-2 flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}
                >
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={feature.action}>
                  Acessar
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Start */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Comece Agora</CardTitle>
          <CardDescription>
            Cadastre seu primeiro alimento e comece a acompanhar sua nutrição
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/alimentos')} size="lg">
            <UtensilsCrossed className="mr-2 h-5 w-5" />
            Cadastrar Alimento
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export { HomePage };
