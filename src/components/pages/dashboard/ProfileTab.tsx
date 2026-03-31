import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader, Save, Lock } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { changePassword } from '@/lib/auth-service';
import { ClientProfile, CurrentUser } from './types';

interface ProfileTabProps {
  currentUser: CurrentUser;
  profile: ClientProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<ClientProfile | null>>;
  isLoadingProfile: boolean;
  userAccountId: string;
}

export default function ProfileTab({ 
  currentUser, 
  profile, 
  setProfile, 
  isLoadingProfile, 
  userAccountId 
}: ProfileTabProps) {
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setIsSavingProfile(true);

    try {
      const profileId = userAccountId || currentUser?.email || crypto.randomUUID();
      
      const profileData: ClientProfile = {
        _id: profileId,
        firstName: (e.target as any).firstName.value,
        lastName: (e.target as any).lastName.value,
        streetAddress: (e.target as any).streetAddress.value,
        city: (e.target as any).city.value,
        state: (e.target as any).state.value,
        zipCode: (e.target as any).zipCode.value,
        phoneNumber: (e.target as any).phoneNumber.value,
        emergencyContactName: (e.target as any).emergencyContactName.value,
        emergencyContactPhone: (e.target as any).emergencyContactPhone.value,
      };

      if (profile) {
        await BaseCrudService.update('clientprofiles', profileData);
      } else {
        await BaseCrudService.create('clientprofiles', profileData);
      }

      const { items } = await BaseCrudService.getAll<ClientProfile>('clientprofiles');
      const savedProfile = items?.find(p => p._id === profileId);
      
      if (!savedProfile) {
        setProfileError('Failed to verify profile save. Please refresh and try again.');
        setIsSavingProfile(false);
        return;
      }

      setProfile(savedProfile);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save profile:', error);
      setProfileError('Failed to save profile. Please try again.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordFormData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await changePassword(
        passwordFormData.currentPassword,
        passwordFormData.newPassword
      );

      if (response.success) {
        setPasswordSuccess(true);
        setPasswordFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setShowPasswordForm(false);
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        setPasswordError(response.message);
      }
    } catch (error) {
      console.error('Failed to change password:', error);
      setPasswordError('Failed to change password. Please try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-2xl">Personal Details</CardTitle>
        <CardDescription className="font-paragraph">
          Update your personal information and emergency contact details
        </CardDescription>
      </CardHeader>
      <CardContent>
        {profileSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-green-900 mb-1">Profile Updated!</h3>
              <p className="font-paragraph text-green-800">Your personal details have been saved successfully.</p>
            </div>
          </div>
        )}

        {passwordSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-green-900 mb-1">Password Changed!</h3>
              <p className="font-paragraph text-green-800">Your password has been updated successfully.</p>
            </div>
          </div>
        )}

        {profileError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="font-paragraph text-red-800">{profileError}</p>
          </div>
        )}

        {isLoadingProfile ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="font-paragraph text-foreground/80">Loading profile...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Personal Information Form */}
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block font-paragraph font-semibold text-foreground mb-2">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    defaultValue={profile?.firstName || ''}
                    placeholder="Enter your first name"
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block font-paragraph font-semibold text-foreground mb-2">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    defaultValue={profile?.lastName || ''}
                    placeholder="Enter your last name"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="streetAddress" className="block font-paragraph font-semibold text-foreground mb-2">
                  Street Address
                </label>
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  defaultValue={profile?.streetAddress || ''}
                  placeholder="Enter your street address"
                  className="border-gray-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block font-paragraph font-semibold text-foreground mb-2">
                    City
                  </label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={profile?.city || ''}
                    placeholder="City"
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block font-paragraph font-semibold text-foreground mb-2">
                    State/Province
                  </label>
                  <Input
                    id="state"
                    name="state"
                    defaultValue={profile?.state || ''}
                    placeholder="State/Province"
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block font-paragraph font-semibold text-foreground mb-2">
                    Zip/Postal Code
                  </label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    defaultValue={profile?.zipCode || ''}
                    placeholder="Zip Code"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block font-paragraph font-semibold text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  defaultValue={profile?.phoneNumber || ''}
                  placeholder="(555) 123-4567"
                  className="border-gray-300"
                />
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Emergency Contact</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="emergencyContactName" className="block font-paragraph font-semibold text-foreground mb-2">
                      Contact Name
                    </label>
                    <Input
                      id="emergencyContactName"
                      name="emergencyContactName"
                      defaultValue={profile?.emergencyContactName || ''}
                      placeholder="Emergency contact name"
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="emergencyContactPhone" className="block font-paragraph font-semibold text-foreground mb-2">
                      Contact Phone
                    </label>
                    <Input
                      id="emergencyContactPhone"
                      name="emergencyContactPhone"
                      type="tel"
                      defaultValue={profile?.emergencyContactPhone || ''}
                      placeholder="(555) 123-4567"
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSavingProfile}
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSavingProfile ? 'Saving...' : 'Save Profile'}
              </Button>
            </form>

            {/* Password Change Section */}
            <div className="pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Change Password
                  </h3>
                  <p className="font-paragraph text-sm text-foreground/70 mt-1">
                    Update your account password for security
                  </p>
                </div>
                {!showPasswordForm && (
                  <Button
                    onClick={() => setShowPasswordForm(true)}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    Change Password
                  </Button>
                )}
              </div>

              {showPasswordForm && (
                <div className="bg-pastelbeige/20 rounded-lg p-6 border border-pastelbeige">
                  {passwordError && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="font-paragraph text-red-800">{passwordError}</p>
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block font-paragraph font-semibold text-foreground mb-2">
                        Current Password *
                      </label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordFormData.currentPassword}
                        onChange={(e) => setPasswordFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        placeholder="Enter your current password"
                        className="border-gray-300"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block font-paragraph font-semibold text-foreground mb-2">
                        New Password *
                      </label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordFormData.newPassword}
                        onChange={(e) => setPasswordFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                        placeholder="Enter new password (min. 6 characters)"
                        className="border-gray-300"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block font-paragraph font-semibold text-foreground mb-2">
                        Confirm New Password *
                      </label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordFormData.confirmPassword}
                        onChange={(e) => setPasswordFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirm new password"
                        className="border-gray-300"
                        required
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isChangingPassword}
                        className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 flex items-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        {isChangingPassword ? 'Changing...' : 'Change Password'}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setShowPasswordForm(false);
                          setPasswordError('');
                          setPasswordFormData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                          });
                        }}
                        variant="outline"
                        className="border-gray-300 text-foreground hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
