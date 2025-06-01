
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type LanguageCode = 'malayalam' | 'english' | 'hindi' | 'spanish' | 'french' | 'german' | 
  'chinese' | 'japanese' | 'korean' | 'portuguese' | 'russian' | 'arabic' | 
  'indonesian' | 'italian' | 'turkish' | 'vietnamese' | 'thai' | 'polish' | 
  'dutch' | 'swedish' | 'telugu' | 'urdu' | 'kannada';

const UserProfile = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [preferredLanguage, setPreferredLanguage] = useState<LanguageCode>(profile?.preferred_language || 'english');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'malayalam' as LanguageCode, name: 'Malayalam' },
    { code: 'english' as LanguageCode, name: 'English' },
    { code: 'hindi' as LanguageCode, name: 'Hindi' },
    { code: 'spanish' as LanguageCode, name: 'Spanish' },
    { code: 'french' as LanguageCode, name: 'French' },
    { code: 'german' as LanguageCode, name: 'German' },
    { code: 'chinese' as LanguageCode, name: 'Chinese (Simplified)' },
    { code: 'japanese' as LanguageCode, name: 'Japanese' },
    { code: 'korean' as LanguageCode, name: 'Korean' },
    { code: 'portuguese' as LanguageCode, name: 'Portuguese' },
    { code: 'russian' as LanguageCode, name: 'Russian' },
    { code: 'arabic' as LanguageCode, name: 'Arabic' },
    { code: 'indonesian' as LanguageCode, name: 'Indonesian' },
    { code: 'italian' as LanguageCode, name: 'Italian' },
    { code: 'turkish' as LanguageCode, name: 'Turkish' },
    { code: 'vietnamese' as LanguageCode, name: 'Vietnamese' },
    { code: 'thai' as LanguageCode, name: 'Thai' },
    { code: 'polish' as LanguageCode, name: 'Polish' },
    { code: 'dutch' as LanguageCode, name: 'Dutch' },
    { code: 'swedish' as LanguageCode, name: 'Swedish' },
    { code: 'telugu' as LanguageCode, name: 'Telugu' },
    { code: 'urdu' as LanguageCode, name: 'Urdu' },
    { code: 'kannada' as LanguageCode, name: 'Kannada' }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        preferred_language: preferredLanguage,
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
    setPreferredLanguage(profile?.preferred_language || 'english');
    setIsEditing(false);
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
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {getInitials() || <User className="h-6 w-6" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">My Profile</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={signOut}
          className="flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
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

            <div className="space-y-2">
              <Label htmlFor="editPreferredLanguage">Preferred Language</Label>
              <Select value={preferredLanguage} onValueChange={(value: LanguageCode) => setPreferredLanguage(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button 
                onClick={handleSave} 
                disabled={isLoading}
                className="glow-button"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                disabled={isLoading}
              >
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

            <div>
              <Label className="text-sm text-muted-foreground">Preferred Language</Label>
              <p className="font-medium">
                {languages.find(lang => lang.code === profile.preferred_language)?.name || 'English'}
              </p>
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
