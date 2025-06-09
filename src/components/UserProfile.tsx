
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Globe, ChevronDown } from 'lucide-react';
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
  const [isLanguageExpanded, setIsLanguageExpanded] = useState(false);

  const languages = ['Malayalam', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Portuguese (Brazil)', 'Portuguese (Portugal)', 'Chinese (Simplified)', 'Chinese (Traditional)', 'Italian', 'Dutch', 'Russian', 'Arabic', 'Swedish', 'Danish', 'Finnish', 'Polish', 'Turkish', 'Vietnamese', 'Thai', 'Greek', 'Hebrew', 'Indonesian', 'Malay', 'Ukrainian', 'Romanian', 'Czech', 'Hungarian', 'Catalan', 'Slovak', 'Croatian', 'Bengali', 'Urdu', 'Persian (Farsi)', 'Filipino (Tagalog)', 'Swahili', 'Serbian', 'Lithuanian', 'Latvian'];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName
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
    setIsEditing(false);
  };

  const handleLanguageChange = async (newLanguage: string) => {
    setIsLoading(true);
    try {
      await updateProfile({
        preferred_language: newLanguage
      });
      setSelectedLanguage(newLanguage);
      setIsLanguageExpanded(false);
    } catch (error) {
      console.error('Error updating language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <Card className="language-card">
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <div className="flex items-center space-x-4 flex-1">
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl mx-0 px-0 py-0 my-0 text-left">Profile</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleSignOut} className="flex items-center space-x-2">
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Email Display */}
        <div>
          <Label className="text-sm text-muted-foreground">Email</Label>
          <p className="font-medium">{user.email}</p>
        </div>

        {/* Name Section */}
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editFirstName">First Name</Label>
                <Input 
                  id="editFirstName" 
                  value={firstName} 
                  onChange={e => setFirstName(e.target.value)} 
                  placeholder="Enter your first name" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLastName">Last Name</Label>
                <Input 
                  id="editLastName" 
                  value={lastName} 
                  onChange={e => setLastName(e.target.value)} 
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
          </div>
        ) : (
          <div className="space-y-4">
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
          </div>
        )}

        {/* Preferred Language Section */}
        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Preferred Language</span>
          </Label>
          
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsLanguageExpanded(!isLanguageExpanded)}
              disabled={isLoading}
              className="w-full justify-between"
            >
              <span>{selectedLanguage || 'Select your preferred language'}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isLanguageExpanded ? 'rotate-180' : ''}`} />
            </Button>
            
            {isLanguageExpanded && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-border bg-background shadow-lg">
                <div className="p-1">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => handleLanguageChange(language)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                      disabled={isLoading}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
