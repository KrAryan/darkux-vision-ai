
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';

type WordCloudProps = {
  words: Array<{ text: string; value: number }>;
};

const WordCloud = ({ words }: WordCloudProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredWord, setHoveredWord] = useState<{ text: string; value: number } | null>(null);
  const [wordPositions, setWordPositions] = useState<Array<{
    text: string;
    value: number;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    fontSize: number;
  }>>([]);

  useEffect(() => {
    if (!canvasRef.current || !words.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get actual canvas dimensions
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Sort words by value (for layering: biggest words first)
    const sortedWords = [...words].sort((a, b) => b.value - a.value);
    
    // Prepare new positions array
    const positions: typeof wordPositions = [];
    
    // Calculate center of canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw each word
    sortedWords.forEach((word, index) => {
      // Scale font size relative to word value (min 12px, max 48px)
      const fontSize = Math.min(48, Math.max(12, 12 + (word.value / 10)));
      
      // Set font and measure text
      ctx.font = `${fontSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const metrics = ctx.measureText(word.text);
      const textWidth = metrics.width;
      const textHeight = fontSize;

      // Generate a position using a spiral pattern
      let angle = 0;
      let radius = 0;
      let x = centerX;
      let y = centerY;
      let attempts = 0;
      let placed = false;
      
      // Spiral algorithm to place words
      while (!placed && attempts < 200) {
        // Move along a spiral
        angle += (index % 2 === 0 ? 1 : -1) * 0.3;
        radius += 0.3;
        x = centerX + radius * Math.cos(angle);
        y = centerY + radius * Math.sin(angle);
        
        // Check if this position overlaps with any existing word
        const overlaps = positions.some(pos => {
          const xOverlap = Math.abs(pos.x - x) < (pos.width / 2 + textWidth / 2 + 5);
          const yOverlap = Math.abs(pos.y - y) < (pos.height / 2 + textHeight / 2 + 5);
          return xOverlap && yOverlap;
        });
        
        if (!overlaps &&
            x > textWidth / 2 && 
            x < canvas.width - textWidth / 2 && 
            y > textHeight / 2 && 
            y < canvas.height - textHeight / 2) {
          placed = true;
        }
        
        attempts++;
      }
      
      // If we couldn't place it after max attempts, place it anyway
      if (!placed) {
        x = 50 + (index * 70) % (canvas.width - 100);
        y = 50 + (index * 40) % (canvas.height - 100);
      }
      
      // Generate a color based on the word's value and index
      const hue = (index * 37) % 360;
      const color = `hsl(${hue}, 70%, 55%)`;
      ctx.fillStyle = color;
      
      // Draw the word
      ctx.fillText(word.text, x, y);
      
      // Store the word's position for hover detection
      positions.push({
        text: word.text,
        value: word.value,
        x,
        y,
        width: textWidth,
        height: textHeight,
        color,
        fontSize,
      });
    });
    
    setWordPositions(positions);
  }, [words]);

  // Handle mouse movement for hover effects
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if mouse is over any word
    const hoveredWord = wordPositions.find(word => {
      const xDistance = Math.abs(word.x - x);
      const yDistance = Math.abs(word.y - y);
      return xDistance < word.width / 2 && yDistance < word.height / 2;
    }) || null;
    
    setHoveredWord(hoveredWord);
    
    // Change cursor style
    canvas.style.cursor = hoveredWord ? 'pointer' : 'default';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Analysis Word Cloud</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          className="w-full h-[300px] bg-background"
        />
        {hoveredWord && (
          <div
            className="absolute px-2 py-1 text-sm bg-background border rounded shadow pointer-events-none"
            style={{
              left: `${hoveredWord.x}px`,
              top: `${hoveredWord.y - hoveredWord.fontSize - 30}px`,
              transform: 'translateX(-50%)',
              zIndex: 10
            }}
          >
            <div className="font-medium">{hoveredWord.text}</div>
            <div className="text-xs text-muted-foreground">Score: {hoveredWord.value}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WordCloud;
