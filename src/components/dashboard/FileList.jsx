import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Trash2, 
  FileText, 
  Image, 
  Video, 
  Music,
  Archive,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const mockFiles = [
  {
    id: '1',
    name: 'Project Presentation.pptx',
    type: 'document',
    size: '2.4 MB',
    uploadDate: '2024-01-15',
    tags: ['work', 'presentation'],
  },
  {
    id: '2',
    name: 'vacation-photo.jpg',
    type: 'image',
    size: '1.8 MB',
    uploadDate: '2024-01-14',
    tags: ['personal', 'vacation'],
  },
  {
    id: '3',
    name: 'Demo Video.mp4',
    type: 'video',
    size: '45.2 MB',
    uploadDate: '2024-01-13',
    tags: ['work', 'demo'],
  },
  {
    id: '4',
    name: 'Audio Recording.m4a',
    type: 'audio',
    size: '12.1 MB',
    uploadDate: '2024-01-12',
    tags: ['meeting', 'notes'],
  },
  {
    id: '5',
    name: 'backup-files.zip',
    type: 'archive',
    size: '156.7 MB',
    uploadDate: '2024-01-11',
    tags: ['backup', 'archive'],
  },
];

export function FileList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { toast } = useToast();

  const getFileIcon = (type) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'audio':
        return Music;
      case 'archive':
        return Archive;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'document':
        return 'text-blue-500';
      case 'image':
        return 'text-green-500';
      case 'video':
        return 'text-purple-500';
      case 'audio':
        return 'text-orange-500';
      case 'archive':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectFile = (fileId, checked) => {
    if (checked) {
      setSelectedFiles([...selectedFiles, fileId]);
    } else {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedFiles(filteredFiles.map(file => file.id));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleBatchAction = (action) => {
    toast({
      title: `${action} Files`,
      description: `${action} ${selectedFiles.length} selected file${selectedFiles.length > 1 ? 's' : ''}`,
    });
    setSelectedFiles([]);
  };

  const handleFileAction = (action, fileName) => {
    toast({
      title: `${action} File`,
      description: `${action} "${fileName}"`,
    });
  };

  return (
    <Card className="flex-1">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Your Files</CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {filteredFiles.length} files
          </Badge>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search files or AI suggestions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 transition-smooth focus:shadow-glow"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {selectedFiles.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
            <span className="text-sm font-medium">
              {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleBatchAction('Download')}
              >
                <Download className="mr-1 h-3 w-3" />
                Download
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleBatchAction('Share')}
              >
                <Share2 className="mr-1 h-3 w-3" />
                Share
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleBatchAction('Delete')}
              >
                <Trash2 className="mr-1 h-3 w-3" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex items-center space-x-4 p-3 border-b text-sm font-medium text-muted-foreground">
            <Checkbox
              checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <div className="flex-1">Name</div>
            <div className="w-20">Size</div>
            <div className="w-24">Date</div>
            <div className="w-8"></div>
          </div>

          {filteredFiles.map((file) => {
            const FileIcon = getFileIcon(file.type);
            const isSelected = selectedFiles.includes(file.id);
            
            return (
              <div
                key={file.id}
                className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 hover:bg-muted/30 ${
                  isSelected ? 'bg-primary/5 border border-primary/20' : ''
                }`}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) => handleSelectFile(file.id, checked)}
                />
                
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <FileIcon className={`h-5 w-5 ${getTypeColor(file.type)}`} />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{file.name}</div>
                    <div className="flex space-x-2 mt-1">
                      {file.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs bg-muted/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="w-20 text-sm text-muted-foreground">
                  {file.size}
                </div>
                
                <div className="w-24 text-sm text-muted-foreground">
                  {new Date(file.uploadDate).toLocaleDateString()}
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleFileAction('Download', file.name)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileAction('Share', file.name)}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleFileAction('Delete', file.name)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
