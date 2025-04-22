
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Image, Link as LinkIcon } from 'lucide-react';

type UploadAreaProps = {
  onFilesAccepted: (files: File[]) => void;
  onUrlSubmitted: (url: string) => void;
};

const UploadArea = ({ onFilesAccepted, onUrlSubmitted }: UploadAreaProps) => {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'files' | 'url'>('files');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      toast({
        title: 'Error',
        description: 'Please upload a valid image file (PNG, JPG, JPEG).',
        variant: 'destructive',
      });
      return;
    }
    
    onFilesAccepted(acceptedFiles);
    toast({
      title: 'Files accepted',
      description: `${acceptedFiles.length} file(s) ready for analysis.`,
    });
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    multiple: true,
  });

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid URL.',
        variant: 'destructive',
      });
      return;
    }

    try {
      new URL(url); // Validate URL format
      onUrlSubmitted(url);
      toast({
        title: 'URL submitted',
        description: 'The website URL is ready for analysis.',
      });
      setUrl('');
    } catch (error) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid URL including http:// or https://',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6 border">
      <div className="flex mb-4 border-b space-x-4">
        <button
          onClick={() => setActiveTab('files')}
          className={`pb-2 px-2 ${
            activeTab === 'files'
              ? 'border-b-2 border-darkux-500 text-darkux-500 font-medium'
              : 'text-muted-foreground'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Image size={18} />
            <span>Upload Screenshots</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('url')}
          className={`pb-2 px-2 ${
            activeTab === 'url'
              ? 'border-b-2 border-darkux-500 text-darkux-500 font-medium'
              : 'text-muted-foreground'
          }`}
        >
          <div className="flex items-center space-x-2">
            <LinkIcon size={18} />
            <span>Analyze Website URL</span>
          </div>
        </button>
      </div>

      {activeTab === 'files' ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
            isDragActive ? 'drop-zone-active' : 'border-border hover:border-darkux-400 hover:bg-muted/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-4">
            <Upload className="h-12 w-12 text-darkux-500" />
            <div className="space-y-1">
              <p className="text-lg font-medium">Drag & drop screenshots here</p>
              <p className="text-sm text-muted-foreground">or click to browse files</p>
              <p className="text-xs text-muted-foreground">Supports PNG, JPG, JPEG</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUrlSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              Website URL
            </label>
            <div className="flex space-x-2">
              <Input
                id="url"
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Analyze</Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Enter a complete URL including http:// or https://
          </p>
        </form>
      )}
    </div>
  );
};

export default UploadArea;
