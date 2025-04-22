
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveHeatMap } from 'recharts';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interaction Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveHeatMap
            data={data}
            width={width}
            height={height}
            margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
          >
            <ChartTooltip
              content={({ active, payload }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  formatter={(value) => [`${value} interactions`, 'Count']}
                />
              )}
            />
          </ResponsiveHeatMap>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default HeatmapVisualization;
