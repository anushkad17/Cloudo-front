import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFiles((current) => [...current, ...files]);
          toast({
            title: "Upload complete!",
            description: `Successfully uploaded ${files.length} file${files.length > 1 ? "s" : ""}`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = (index) => {
    setUploadedFiles((files) => files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card
        className={`relative border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/5 shadow-glow"
            : "border-muted-foreground/25 hover:border-primary/50"
        } ${isUploading ? "pointer-events-none opacity-75" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center space-y-4">
          <div
            className={`mx-auto w-16 h-16 rounded-full gradient-ai flex items-center justify-center transition-transform duration-300 ${
              isDragging ? "scale-110" : ""
            }`}
          >
            <Upload
              className={`h-8 w-8 text-primary transition-transform duration-300 ${
                isDragging ? "animate-bounce" : ""
              }`}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {isDragging ? "Drop files here" : "Upload your files"}
            </h3>
            <p className="text-muted-foreground">
              Drag & drop files here, or{" "}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:underline font-medium"
              >
                browse
              </button>
            </p>
          </div>

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="gradient-primary text-white shadow-lg hover:shadow-glow transition-all duration-300"
            disabled={isUploading}
          >
            Select Files
          </Button>
        </div>

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center space-y-4 max-w-xs">
              <div className="text-lg font-medium">Uploading...</div>
              <Progress value={uploadProgress} className="w-full" />
              <div className="text-sm text-muted-foreground">
                {uploadProgress}% complete
              </div>
            </div>
          </div>
        )}
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        accept="*/*"
      />

      {uploadedFiles.length > 0 && (
        <Card className="p-4">
          <h4 className="font-medium mb-3">Recently Uploaded</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <FileIcon className="h-4 w-4 text-primary" />
                  <div>
                    <div className="font-medium text-sm">{file.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
