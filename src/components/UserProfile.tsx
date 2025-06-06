
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';

const UserProfile = () => {
  const {
    user,
    profile,
    signOut,
    updateProfile
  } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [selectedLanguage, setSelectedLanguage] = useState(profile?.preferred_language || '');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    'Malayalam',
    'Spanish',
    'French',
    'German',
    'Japanese',
    'Korean',
    'Portuguese (Brazil)',
    'Portuguese (Portugal)',
    'Chinese (Simplified)',
    'Chinese (Traditional)',
    'Italian',
    'Dutch',
    'Russian',
    'Arabic',
    'Swedish',
    'Danish',
    'Finnish',
    'Polish',
    'Turkish',
    'Vietnamese',
    'Thai',
    'Greek',
    'Hebrew',
    'Indonesian',
    'Malay',
    'Ukrainian',
    'Romanian',
    'Czech',
    'Hungarian',
    'Catalan',
    'Slovak',
    'Croatian',
    'Bengali',
    'Urdu',
    'Persian (Farsi)',
    'Filipino (Tagalog)',
    'Swahili',
    'Serbian',
    'Lithuanian',
    'Latvian'
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        preferred_language: selectedLanguage
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFirstName(profile?.first_name || '');
    setLastName(profile?.last_name || '');
    setSelectedLanguage(profile?.preferred_language || '');
    setIsEditing(false);
  };

  const handleLanguageChange = async (newLanguage: string) => {
    setIsLoading(true);
    try {
      await updateProfile({
        preferred_language: newLanguage
      });
      setSelectedLanguage(newLanguage);
    } catch (error) {
      console.error('Error updating language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = () => {
    const first = profile?.first_name || user?.email?.charAt(0) || '';
    const last = profile?.last_name?.charAt(0) || '';
    return (first + last).toUpperCase();
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <Card className="language-card">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <div className="flex items-center space-x-4 flex-1">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">My Profile</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={signOut} className="flex items-center space-x-2">
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Preferred Language Selection - Always Visible */}
        <div className="space-y-2">
          <Label htmlFor="preferredLanguage" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Preferred Language for Translations</span>
          </Label>
          <Select 
            value={selectedLanguage} 
            onValueChange={handleLanguageChange}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your preferred language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isEditing ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editFirstName">First Name</Label>
                <Input 
                  id="editFirstName" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  placeholder="Enter your first name" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLastName">Last Name</Label>
                <Input 
                  id="editLastName" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  placeholder="Enter your last name" 
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button onClick={handleSave} disabled={isLoading} className="glow-button">
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">First Name</Label>
                <p className="font-medium">{profile.first_name || 'Not set'}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Last Name</Label>
                <p className="font-medium">{profile.last_name || 'Not set'}</p>
              </div>
            </div>

            <Button onClick={() => setIsEditing(true)} className="glow-button">
              Edit Profile
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
