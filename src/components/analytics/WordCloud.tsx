
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef } from 'react';

type WordCloudProps = {
  words: Array<{ text: string; value: number }>;
};

const WordCloud = ({ words }: WordCloudProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !words.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Simple word cloud rendering
    words.forEach((word, index) => {
      const fontSize = Math.min(40, Math.max(12, word.value));
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = `hsl(${index * 30 % 360}, 70%, 50%)`;
      ctx.fillText(word.text, 
        (index * 100) % canvas.width, 
        50 + ((index * 50) % (canvas.height - 100))
      );
    });
  }, [words]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Analysis Word Cloud</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          width={500}
          height={300}
          className="w-full h-[300px] bg-muted/30"
        />
      </CardContent>
    </Card>
  );
};

export default WordCloud;
