import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Shield, 
  Crown, 
  HardDrive,
  FileText,
  Image,
  Video,
  Music,
  Camera,
  Edit,
  Save
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Cloud",
    email: "alex@cloudsync.ai",
    username: "@alex_cloud",
    location: "San Francisco, CA",
    bio: "Cloud storage enthusiast and AI technology advocate. Passionate about organizing digital life efficiently.",
    joinDate: "January 2024"
  });

  const { toast } = useToast();

  const storageBreakdown = [
    { type: "Documents", count: "200 files", size: "15GB", color: "bg-blue-500", icon: FileText },
    { type: "Photos", count: "120 files", size: "10GB", color: "bg-green-500", icon: Image },
    { type: "Videos", count: "80 files", size: "20GB", color: "bg-purple-500", icon: Video },
    { type: "Music", count: "150 files", size: "5GB", color: "bg-orange-500", icon: Music },
  ];

  const activityData = [
    { action: "Uploaded new file", file: "Project_Plan.docx", time: "2 hours ago" },
    { action: "Shared folder", file: "Design Assets", time: "1 day ago" },
    { action: "Created backup", file: "Weekly Backup", time: "2 days ago" },
    { action: "AI organized files", file: "Smart Categories", time: "3 days ago" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleUpgradeClick = () => {
    toast({
      title: "Upgrade Plan",
      description: "Upgrade functionality would be implemented here.",
    });
  };

  return (
    <DashboardLayout title="Profile" showAIButton={true}>
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-card/50 to-accent/10 border-accent/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-primary/20">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Alex Cloud" />
                      <AvatarFallback className="gradient-primary text-white text-lg">AC</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 gradient-primary"
                    >
                      <Camera className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-2xl font-bold">{profileData.name}</h2>
                      <Badge className="gradient-primary text-white">
                        <Crown className="mr-1 h-3 w-3" />
                        Pro
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{profileData.username}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{profileData.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className={isEditing ? "gradient-primary text-white" : ""}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio" 
                      className="w-full min-h-[80px] px-3 py-2 text-sm border border-input rounded-md bg-background"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">{profileData.bio}</p>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Storage Usage Card */}
          <Card className="bg-gradient-to-br from-card/50 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HardDrive className="h-5 w-5 text-primary" />
                <span>Storage Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">150 GB</div>
                <div className="text-sm text-muted-foreground">of 200 GB used</div>
                <Progress value={75} className="h-2" />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                {storageBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{item.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{item.size}</div>
                      <div className="text-xs text-muted-foreground">{item.count}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button onClick={handleUpgradeClick} className="w-full gradient-primary text-white">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Settings and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Account Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>AI File Organization</Label>
                    <p className="text-sm text-muted-foreground">Auto-organize files with AI</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Smart Backup</Label>
                    <p className="text-sm text-muted-foreground">Automatic backup detection</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full">
                  Download Data
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityData.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.file}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
