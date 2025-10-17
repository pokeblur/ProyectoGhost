import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BodyCompositionData {
  date: string;
  bodyFat?: number;
  muscle?: number;
}

interface BodyCompositionChartProps {
  data: BodyCompositionData[];
}

const BodyCompositionChart = ({ data }: BodyCompositionChartProps) => {
  const months: { [key: number]: string } = {
    1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun',
    7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic'
  };

  const chartData = data.map(item => {
    const [year, month, day] = item.date.split('-').map(Number);
    return {
      date: `${day} ${months[month]}`,
      fullDate: item.date,
      'Grasa Corporal': item.bodyFat,
      'Masa Muscular': item.muscle
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
        <XAxis 
          dataKey="date" 
          className="text-xs font-bold"
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis 
          className="text-xs font-bold"
          stroke="hsl(var(--muted-foreground))"
          label={{ value: 'Porcentaje (%)', angle: -90, position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))' } }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            border: '2px solid hsl(var(--primary) / 0.3)',
            borderRadius: '12px',
            fontWeight: 'bold'
          }}
        />
        <Legend 
          wrapperStyle={{ 
            paddingTop: '20px',
            fontWeight: 'bold'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="Grasa Corporal" 
          stroke="hsl(var(--primary))" 
          strokeWidth={3}
          dot={{ fill: 'hsl(var(--primary))', r: 6 }}
          activeDot={{ r: 8 }}
        />
        <Line 
          type="monotone" 
          dataKey="Masa Muscular" 
          stroke="hsl(var(--foreground))" 
          strokeWidth={3}
          dot={{ fill: 'hsl(var(--foreground))', r: 6 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BodyCompositionChart;
