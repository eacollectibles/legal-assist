import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader, Save, Lock, Shield, ShieldCheck, ShieldOff, Briefcase, Building2, FileCheck, AlertTriangle, Mail, Phone, Calendar, MapPin, User, Heart, Clock } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { changePassword, toggle2FA, get2FAStatus } from '@/lib/auth-service';
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

  // 2FA state
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [is2FALoading, setIs2FALoading] = useState(true);
  const [is2FAToggling, setIs2FAToggling] = useState(false);
  const [twoFASuccess, setTwoFASuccess] = useState('');
  const [twoFAError, setTwoFAError] = useState('');

  // Load 2FA status on mount
  useEffect(() => {
    let mounted = true;
    get2FAStatus().then((enabled) => {
      if (mounted) {
        setIs2FAEnabled(enabled);
        setIs2FALoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  // Handle 2FA toggle
  const handle2FAToggle = async () => {
    const newState = !is2FAEnabled;
    setIs2FAToggling(true);
    setTwoFAError('');
    setTwoFASuccess('');

    try {
      const result = await toggle2FA(newState);
      if (result.success) {
        setIs2FAEnabled(newState);
        setTwoFASuccess(result.message);
        setTimeout(() => setTwoFASuccess(''), 5000);
      } else {
        setTwoFAError(result.message);
      }
    } catch (err) {
      setTwoFAError('Failed to update two-factor authentication settings.');
    } finally {
      setIs2FAToggling(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setIsSavingProfile(true);

    try {
      const profileId = currentUser?.clientId || profile?._id || userAccountId || currentUser?.email || crypto.randomUUID();
      
      const form = e.target as any;
      const profileData: ClientProfile = {
        _id: profileId,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        preferredName: form.preferredName?.value || '',
        dateOfBirth: form.dateOfBirth?.value || undefined,
        preferredLanguage: form.preferredLanguage?.value || '',
        phoneNumber: form.phoneNumber.value,
        alternatePhone: form.alternatePhone?.value || '',
        preferredContactMethod: form.preferredContactMethod?.value || '',
        bestTimeToContact: form.bestTimeToContact?.value || '',
        streetAddress: form.streetAddress.value,
        unitNumber: form.unitNumber?.value || '',
        city: form.city.value,
        state: form.state.value,
        zipCode: form.zipCode.value,
        emergencyContactName: form.emergencyContactName.value,
        emergencyContactPhone: form.emergencyContactPhone.value,
        emergencyContactRelationship: form.emergencyContactRelationship?.value || '',
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
              {/* Basic Identity */}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preferredName" className="block font-paragraph font-semibold text-foreground mb-2">
                    Preferred Name
                  </label>
                  <Input
                    id="preferredName"
                    name="preferredName"
                    defaultValue={profile?.preferredName || ''}
                    placeholder="Name you prefer to be called"
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block font-paragraph font-semibold text-foreground mb-2">
                    Date of Birth
                  </label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    defaultValue={profile?.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : ''}
                    className="border-gray-300"
                  />
                </div>
              </div>

              {/* Email (read-only from account) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-paragraph font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    value={currentUser?.email || ''}
                    readOnly
                    className="border-gray-300 bg-gray-50 text-foreground/70"
                  />
                  <p className="text-xs text-foreground/50 mt-1">Email is linked to your account and cannot be changed here.</p>
                </div>

                <div>
                  <label htmlFor="preferredLanguage" className="block font-paragraph font-semibold text-foreground mb-2">
                    Preferred Language
                  </label>
                  <Input
                    id="preferredLanguage"
                    name="preferredLanguage"
                    defaultValue={profile?.preferredLanguage || ''}
                    placeholder="e.g., English, French"
                    className="border-gray-300"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div>
                    <label htmlFor="alternatePhone" className="block font-paragraph font-semibold text-foreground mb-2">
                      Alternate Phone
                    </label>
                    <Input
                      id="alternatePhone"
                      name="alternatePhone"
                      type="tel"
                      defaultValue={profile?.alternatePhone || ''}
                      placeholder="(555) 123-4567"
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label htmlFor="preferredContactMethod" className="block font-paragraph font-semibold text-foreground mb-2">
                      Preferred Contact Method
                    </label>
                    <Input
                      id="preferredContactMethod"
                      name="preferredContactMethod"
                      defaultValue={profile?.preferredContactMethod || ''}
                      placeholder="e.g., Phone, Email, Text"
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="bestTimeToContact" className="block font-paragraph font-semibold text-foreground mb-2">
                      Best Time to Contact
                    </label>
                    <Input
                      id="bestTimeToContact"
                      name="bestTimeToContact"
                      defaultValue={profile?.bestTimeToContact || ''}
                      placeholder="e.g., Mornings, Evenings"
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
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

                  <div>
                    <label htmlFor="unitNumber" className="block font-paragraph font-semibold text-foreground mb-2">
                      Unit/Apt #
                    </label>
                    <Input
                      id="unitNumber"
                      name="unitNumber"
                      defaultValue={profile?.unitNumber || ''}
                      placeholder="Unit #"
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
                      Province
                    </label>
                    <Input
                      id="state"
                      name="state"
                      defaultValue={profile?.state || ''}
                      placeholder="Province"
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block font-paragraph font-semibold text-foreground mb-2">
                      Postal Code
                    </label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      defaultValue={profile?.zipCode || ''}
                      placeholder="Postal Code"
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Emergency Contact
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                  <div>
                    <label htmlFor="emergencyContactRelationship" className="block font-paragraph font-semibold text-foreground mb-2">
                      Relationship
                    </label>
                    <Input
                      id="emergencyContactRelationship"
                      name="emergencyContactRelationship"
                      defaultValue={profile?.emergencyContactRelationship || ''}
                      placeholder="e.g., Spouse, Parent"
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Availability (read-only from intake) */}
              {(profile?.preferredDays || profile?.preferredTimes) && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Availability
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile?.preferredDays && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Preferred Days</p>
                        <p className="text-sm text-gray-900">{profile.preferredDays}</p>
                      </div>
                    )}
                    {profile?.preferredTimes && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Preferred Times</p>
                        <p className="text-sm text-gray-900">{profile.preferredTimes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* How They Heard About Us */}
              {profile?.howHeardAboutUs && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">How They Heard About Us</p>
                  <p className="text-sm text-gray-900">{profile.howHeardAboutUs}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSavingProfile}
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSavingProfile ? 'Saving...' : 'Save Profile'}
              </Button>
            </form>

            {/* LSO Compliance Information — Read Only (collected during intake) */}
            {profile?.occupation && (
              <div className="pt-8 border-t border-gray-200">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  LSO Compliance Information
                </h3>
                <p className="font-paragraph text-sm text-foreground/60 mb-6">
                  The following information was collected during your intake process as required by the Law Society of Ontario.
                  To update this information, please contact our office.
                </p>

                <div className="space-y-6">
                  {/* Occupation & Business */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-heading text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> Occupation & Employment
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Occupation</p>
                        <p className="text-sm text-gray-900 font-medium">{profile.occupation}</p>
                      </div>
                      {profile?.businessAddress && (
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Business Address</p>
                          <p className="text-sm text-gray-900">{profile?.businessAddress}</p>
                        </div>
                      )}
                      {profile?.businessPhone && (
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Business Phone</p>
                          <p className="text-sm text-gray-900">{profile?.businessPhone}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Identity Verification */}
                  {profile?.idType && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-heading text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                        <FileCheck className="w-4 h-4" /> Identity Verification
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">ID Type</p>
                          <p className="text-sm text-gray-900 font-medium">{profile?.idType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Verification Consent</p>
                          <p className="text-sm text-gray-900">
                            {profile?.idVerificationConsent ? '✓ Consent given' : 'Pending'}
                          </p>
                        </div>
                        {profile?.idIssuingAuthority && (
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Issuing Authority</p>
                            <p className="text-sm text-gray-900">{profile?.idIssuingAuthority}</p>
                          </div>
                        )}
                        {profile?.idExpiryDate && (
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Expiry Date</p>
                            <p className="text-sm text-gray-900">{new Date(profile?.idExpiryDate).toLocaleDateString('en-CA')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Organization Info */}
                  {profile?.isOrganization && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-heading text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                        <Building2 className="w-4 h-4" /> Organization Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Organization Name</p>
                          <p className="text-sm text-gray-900 font-medium">{profile?.orgName || 'Not provided'}</p>
                        </div>
                        {profile?.orgIncorporationNumber && (
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Incorporation Number</p>
                            <p className="text-sm text-gray-900">{profile?.orgIncorporationNumber}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Conflict Check Status */}
                  {profile?.conflictCheckCompleted && (
                    <div className={`rounded-lg p-4 ${
                      profile?.conflictCheckStatus === 'flagged' ? 'bg-amber-50 border border-amber-200' : 'bg-green-50 border border-green-200'
                    }`}>
                      <h4 className={`font-heading text-sm font-semibold mb-3 flex items-center gap-2 ${
                        profile?.conflictCheckStatus === 'flagged' ? 'text-amber-700' : 'text-green-700'
                      }`}>
                        {profile?.conflictCheckStatus === 'flagged'
                          ? <><AlertTriangle className="w-4 h-4" /> Conflict Check — Under Review</>
                          : <><CheckCircle className="w-4 h-4" /> Conflict Check — Passed</>
                        }
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Date Checked</p>
                          <p className="text-sm text-gray-900">
                            {profile?.conflictCheckDate ? new Date(profile?.conflictCheckDate).toLocaleDateString('en-CA') : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Status</p>
                          <p className="text-sm text-gray-900 font-medium">
                            {profile?.conflictCheckStatus === 'flagged'
                              ? 'Flagged for review — our paralegal will discuss at consultation'
                              : 'No conflicts found'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

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

            {/* Two-Factor Authentication Section */}
            <div className="pt-8 border-t border-gray-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Two-Factor Authentication
                  </h3>
                  <p className="font-paragraph text-sm text-foreground/70 mt-1">
                    Add an extra layer of security to your account. When enabled, you will receive a 6-digit verification code by email each time you sign in.
                  </p>
                </div>

                {is2FALoading ? (
                  <div className="flex items-center gap-2 text-foreground/50 mt-1">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="font-paragraph text-sm">Loading...</span>
                  </div>
                ) : (
                  <Button
                    onClick={handle2FAToggle}
                    disabled={is2FAToggling}
                    variant={is2FAEnabled ? 'outline' : 'default'}
                    className={
                      is2FAEnabled
                        ? 'border-red-300 text-red-700 hover:bg-red-50 flex items-center gap-2 mt-1'
                        : 'bg-primary hover:bg-primary/90 text-white flex items-center gap-2 mt-1'
                    }
                  >
                    {is2FAToggling ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : is2FAEnabled ? (
                      <ShieldOff className="w-4 h-4" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                    {is2FAToggling
                      ? 'Updating...'
                      : is2FAEnabled
                        ? 'Disable 2FA'
                        : 'Enable 2FA'}
                  </Button>
                )}
              </div>

              {/* 2FA status indicator */}
              {!is2FALoading && (
                <div className={`mt-4 rounded-lg p-4 flex items-center gap-3 ${
                  is2FAEnabled
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  {is2FAEnabled ? (
                    <>
                      <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="font-paragraph text-sm text-green-800">
                        Two-factor authentication is <strong>enabled</strong>. A verification code will be sent to your email when you sign in.
                      </p>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                      <p className="font-paragraph text-sm text-yellow-800">
                        Two-factor authentication is <strong>not enabled</strong>. We recommend enabling it for additional account security.
                      </p>
                    </>
                  )}
                </div>
              )}

              {/* 2FA success message */}
              {twoFASuccess && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="font-paragraph text-green-800 text-sm">{twoFASuccess}</p>
                </div>
              )}

              {/* 2FA error message */}
              {twoFAError && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="font-paragraph text-red-800 text-sm">{twoFAError}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
