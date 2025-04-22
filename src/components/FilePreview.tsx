
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FilePreviewProps = {
  files: File[];
  onRemove: (index: number) => void;
};

const FilePreview = ({ files, onRemove }: FilePreviewProps) => {
  if (files.length === 0) return null;
  
  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium">Uploaded Files</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <div key={index} className="relative group">
            <div className="border rounded-lg overflow-hidden bg-muted/30">
              <div className="aspect-video relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-2 truncate text-sm">
                {file.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilePreview;
