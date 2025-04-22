
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';

type HeatmapData = {
  name: string;
  value: number;
  x: number;
  y: number;
}[];

type HeatmapVisualizationProps = {
  data: HeatmapData;
  width?: number;
  height?: number;
};

const HeatmapVisualization = ({ data, width = 500, height = 300 }: HeatmapVisualizationProps) => {
  // Convert heatmap data to colors based on values
  const getColor = (value: number) => {
    // Color scale from light to dark based on value
    const minValue = Math.min(...data.map(item => item.value));
    const maxValue = Math.max(...data.map(item => item.value));
    const normalizedValue = (value - minValue) / (maxValue - minValue || 1);
    
    // Generate a heatmap color from blue to red
    return `rgb(${Math.round(normalizedValue * 255)}, ${Math.round((1 - normalizedValue) * 70)}, ${Math.round((1 - normalizedValue) * 255)})`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interaction Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis type="number" dataKey="x" name="X Position" domain={[0, 500]} />
              <YAxis type="number" dataKey="y" name="Y Position" domain={[0, 500]} />
              <ZAxis type="number" dataKey="value" range={[20, 100]} name="Interactions" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-2 bg-background border rounded-md shadow-md">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm">{`Interactions: ${data.value}`}</p>
                        <p className="text-sm">{`Position: (${data.x}, ${data.y})`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Interactions" data={data}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default HeatmapVisualization;
