import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { BaseCrudService } from '@/integrations';
import { ClientProfiles } from '@/entities';
import { ChevronLeft, ChevronRight, Check, Calendar, User, MapPin, Phone, Briefcase, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  preferredName: string;
  dateOfBirth: string;
  preferredLanguage: string;
  howHeardAboutUs: string;
  
  // Contact Information
  phoneNumber: string;
  alternatePhone: string;
  preferredContactMethod: string;
  bestTimeToContact: string;
  
  // Address Information
  streetAddress: string;
  unitNumber: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  
  // Case Information
  caseType: string;
  caseDescription: string;
  hasCourtDocuments: boolean;
  courtDeadline: string;
  consultedOther: boolean;
  additionalNotes: string;
  
  // Availability
  preferredDays: string[];
  preferredTimes: string[];
}

const sections = [
  { id: 'personal', title: 'Personal Information', icon: User },
  { id: 'contact', title: 'Contact Information', icon: Phone },
  { id: 'address', title: 'Address', icon: MapPin },
  { id: 'emergency', title: 'Emergency Contact', icon: Phone },
  { id: 'case', title: 'Case Information', icon: Briefcase },
  { id: 'availability', title: 'Availability', icon: Clock },
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['Morning (9am-12pm)', 'Afternoon (12pm-5pm)', 'Evening (5pm-8pm)'];

export default function ClientIntakePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClientId] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    preferredName: '',
    dateOfBirth: '',
    preferredLanguage: '',
    howHeardAboutUs: '',
    phoneNumber: '',
    alternatePhone: '',
    preferredContactMethod: '',
    bestTimeToContact: '',
    streetAddress: '',
    unitNumber: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    caseType: '',
    caseDescription: '',
    hasCourtDocuments: false,
    courtDeadline: '',
    consultedOther: false,
    additionalNotes: '',
    preferredDays: [],
    preferredTimes: [],
  });

  useEffect(() => {
    loadClientProfile();
  }, []);

  const loadClientProfile = async () => {
    const storedClientId = sessionStorage.getItem('clientId');
    if (!storedClientId) {
      toast({
        title: 'Error',
        description: 'Please sign up or log in first.',
        variant: 'destructive',
      });
      navigate('/client-signup');
      return;
    }

    setClientId(storedClientId);

    try {
      const profile = await BaseCrudService.getById<ClientProfiles>('clientprofiles', storedClientId);
      
      if (profile?.intakeCompleted) {
        toast({
          title: 'Intake Already Completed',
          description: 'You have already completed the intake form.',
        });
        navigate('/client-dashboard');
        return;
      }

      if (profile) {
        setFormData({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          preferredName: profile.preferredName || '',
          dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : '',
          preferredLanguage: profile.preferredLanguage || '',
          howHeardAboutUs: profile.howHeardAboutUs || '',
          phoneNumber: profile.phoneNumber || '',
          alternatePhone: profile.alternatePhone || '',
          preferredContactMethod: profile.preferredContactMethod || '',
          bestTimeToContact: profile.bestTimeToContact || '',
          streetAddress: profile.streetAddress || '',
          unitNumber: profile.unitNumber || '',
          city: profile.city || '',
          state: profile.state || '',
          zipCode: profile.zipCode || '',
          emergencyContactName: profile.emergencyContactName || '',
          emergencyContactPhone: profile.emergencyContactPhone || '',
          emergencyContactRelationship: profile.emergencyContactRelationship || '',
          caseType: profile.caseType || '',
          caseDescription: profile.caseDescription || '',
          hasCourtDocuments: profile.hasCourtDocuments || false,
          courtDeadline: profile.courtDeadline ? new Date(profile.courtDeadline).toISOString().split('T')[0] : '',
          consultedOther: profile.consultedOther || false,
          additionalNotes: profile.additionalNotes || '',
          preferredDays: profile.preferredDays ? profile.preferredDays.split(',').map(d => d.trim()) : [],
          preferredTimes: profile.preferredTimes ? profile.preferredTimes.split(',').map(t => t.trim()) : [],
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxArrayChange = (field: 'preferredDays' | 'preferredTimes', value: string) => {
    setFormData(prev => {
      const currentArray = prev[field];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const validateSection = (sectionIndex: number): boolean => {
    const section = sections[sectionIndex].id;
    
    switch (section) {
      case 'personal':
        return !!(formData.firstName && formData.lastName);
      case 'contact':
        return !!formData.phoneNumber;
      case 'address':
        return !!(formData.streetAddress && formData.city && formData.state && formData.zipCode);
      case 'emergency':
        return !!(formData.emergencyContactName && formData.emergencyContactPhone);
      case 'case':
        return !!(formData.caseType && formData.caseDescription);
      case 'availability':
        return formData.preferredDays.length > 0 && formData.preferredTimes.length > 0;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (!validateSection(currentSection)) {
      toast({
        title: 'Required Fields Missing',
        description: 'Please fill in all required fields before continuing.',
        variant: 'destructive',
      });
      return;
    }

    await saveProgress();

    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const saveProgress = async () => {
    if (!clientId) return;

    try {
      await BaseCrudService.update<ClientProfiles>('clientprofiles', {
        _id: clientId,
        ...formData,
        dateOfBirth: formData.dateOfBirth || undefined,
        courtDeadline: formData.courtDeadline || undefined,
        preferredDays: formData.preferredDays.join(', '),
        preferredTimes: formData.preferredTimes.join(', '),
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await BaseCrudService.update<ClientProfiles>('clientprofiles', {
        _id: clientId,
        ...formData,
        dateOfBirth: formData.dateOfBirth || undefined,
        courtDeadline: formData.courtDeadline || undefined,
        preferredDays: formData.preferredDays.join(', '),
        preferredTimes: formData.preferredTimes.join(', '),
        intakeCompleted: true,
        intakeCompletedDate: new Date().toISOString(),
      });

      sessionStorage.setItem('intakeJustCompleted', 'true');
      
      toast({
        title: 'Intake Form Completed!',
        description: 'Thank you for completing your intake form. We will be in touch soon.',
      });

      navigate('/client-dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit intake form. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    await saveProgress();
    sessionStorage.setItem('intakeSkipped', 'true');
    navigate('/client-dashboard');
  };

  const progress = ((currentSection + 1) / sections.length) * 100;
  const SectionIcon = sections[currentSection].icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Client Intake Form
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
              Help us understand your needs better by completing this intake form. You can save your progress and return anytime.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="font-paragraph text-sm text-foreground/70">
                Step {currentSection + 1} of {sections.length}
              </span>
              <span className="font-paragraph text-sm text-foreground/70">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Section Navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-2">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-paragraph text-sm transition-colors ${
                      index === currentSection
                        ? 'bg-primary text-primary-foreground'
                        : index < currentSection
                        ? 'bg-pastelgreen text-foreground'
                        : 'bg-background border border-foreground/20 text-foreground/70'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="whitespace-nowrap">{section.title}</span>
                    {index < currentSection && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <Card className="border-2 border-foreground/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <SectionIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-heading text-2xl text-foreground">
                    {sections[currentSection].title}
                  </CardTitle>
                  <CardDescription className="font-paragraph">
                    {currentSection === 0 && 'Tell us about yourself'}
                    {currentSection === 1 && 'How can we reach you?'}
                    {currentSection === 2 && 'Where do you live?'}
                    {currentSection === 3 && 'Who should we contact in case of emergency?'}
                    {currentSection === 4 && 'Tell us about your legal matter'}
                    {currentSection === 5 && 'When are you available for appointments?'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Personal Information */}
                  {currentSection === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="font-paragraph">
                          First Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="font-paragraph">
                          Last Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredName" className="font-paragraph">
                          Preferred Name
                        </Label>
                        <Input
                          id="preferredName"
                          value={formData.preferredName}
                          onChange={(e) => handleInputChange('preferredName', e.target.value)}
                          className="mt-1"
                          placeholder="What should we call you?"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth" className="font-paragraph">
                          Date of Birth
                        </Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredLanguage" className="font-paragraph">
                          Preferred Language
                        </Label>
                        <Select
                          value={formData.preferredLanguage}
                          onValueChange={(value) => handleInputChange('preferredLanguage', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="howHeardAboutUs" className="font-paragraph">
                          How did you hear about us?
                        </Label>
                        <Select
                          value={formData.howHeardAboutUs}
                          onValueChange={(value) => handleInputChange('howHeardAboutUs', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Google Search">Google Search</SelectItem>
                            <SelectItem value="Social Media">Social Media</SelectItem>
                            <SelectItem value="Referral">Referral</SelectItem>
                            <SelectItem value="Advertisement">Advertisement</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  {currentSection === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phoneNumber" className="font-paragraph">
                          Primary Phone <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="alternatePhone" className="font-paragraph">
                          Alternate Phone
                        </Label>
                        <Input
                          id="alternatePhone"
                          type="tel"
                          value={formData.alternatePhone}
                          onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredContactMethod" className="font-paragraph">
                          Preferred Contact Method
                        </Label>
                        <Select
                          value={formData.preferredContactMethod}
                          onValueChange={(value) => handleInputChange('preferredContactMethod', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Phone Call">Phone Call</SelectItem>
                            <SelectItem value="Text Message">Text Message</SelectItem>
                            <SelectItem value="Email">Email</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="bestTimeToContact" className="font-paragraph">
                          Best Time to Contact
                        </Label>
                        <Select
                          value={formData.bestTimeToContact}
                          onValueChange={(value) => handleInputChange('bestTimeToContact', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Morning">Morning (9am-12pm)</SelectItem>
                            <SelectItem value="Afternoon">Afternoon (12pm-5pm)</SelectItem>
                            <SelectItem value="Evening">Evening (5pm-8pm)</SelectItem>
                            <SelectItem value="Anytime">Anytime</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Address Information */}
                  {currentSection === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="streetAddress" className="font-paragraph">
                          Street Address <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="streetAddress"
                          value={formData.streetAddress}
                          onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="unitNumber" className="font-paragraph">
                          Unit/Apt Number
                        </Label>
                        <Input
                          id="unitNumber"
                          value={formData.unitNumber}
                          onChange={(e) => handleInputChange('unitNumber', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city" className="font-paragraph">
                          City <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="font-paragraph">
                          Province/State <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="font-paragraph">
                          Postal/Zip Code <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Emergency Contact */}
                  {currentSection === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="emergencyContactName" className="font-paragraph">
                          Emergency Contact Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyContactPhone" className="font-paragraph">
                          Emergency Contact Phone <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="emergencyContactPhone"
                          type="tel"
                          value={formData.emergencyContactPhone}
                          onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="emergencyContactRelationship" className="font-paragraph">
                          Relationship
                        </Label>
                        <Input
                          id="emergencyContactRelationship"
                          value={formData.emergencyContactRelationship}
                          onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
                          className="mt-1"
                          placeholder="e.g., Spouse, Parent, Sibling, Friend"
                        />
                      </div>
                    </div>
                  )}

                  {/* Case Information */}
                  {currentSection === 4 && (
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="caseType" className="font-paragraph">
                          Type of Legal Matter <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.caseType}
                          onValueChange={(value) => handleInputChange('caseType', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select case type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Small Claims">Small Claims</SelectItem>
                            <SelectItem value="Landlord Tenant">Landlord Tenant</SelectItem>
                            <SelectItem value="Human Rights">Human Rights</SelectItem>
                            <SelectItem value="Traffic Tickets">Traffic Tickets</SelectItem>
                            <SelectItem value="Criminal Matters">Criminal Matters</SelectItem>
                            <SelectItem value="Employment Issues">Employment Issues</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="caseDescription" className="font-paragraph">
                          Case Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="caseDescription"
                          value={formData.caseDescription}
                          onChange={(e) => handleInputChange('caseDescription', e.target.value)}
                          className="mt-1 min-h-32"
                          placeholder="Please provide a brief description of your legal matter..."
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasCourtDocuments"
                          checked={formData.hasCourtDocuments}
                          onCheckedChange={(checked) => handleInputChange('hasCourtDocuments', checked)}
                        />
                        <Label htmlFor="hasCourtDocuments" className="font-paragraph cursor-pointer">
                          I have existing court documents related to this matter
                        </Label>
                      </div>
                      <div>
                        <Label htmlFor="courtDeadline" className="font-paragraph">
                          Court Deadline (if applicable)
                        </Label>
                        <Input
                          id="courtDeadline"
                          type="date"
                          value={formData.courtDeadline}
                          onChange={(e) => handleInputChange('courtDeadline', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="consultedOther"
                          checked={formData.consultedOther}
                          onCheckedChange={(checked) => handleInputChange('consultedOther', checked)}
                        />
                        <Label htmlFor="consultedOther" className="font-paragraph cursor-pointer">
                          I have consulted other legal services for this matter
                        </Label>
                      </div>
                      <div>
                        <Label htmlFor="additionalNotes" className="font-paragraph">
                          Additional Notes
                        </Label>
                        <Textarea
                          id="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                          className="mt-1 min-h-24"
                          placeholder="Any other information you'd like us to know..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Availability */}
                  {currentSection === 5 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="font-paragraph mb-3 block">
                          Preferred Days <span className="text-destructive">*</span>
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {daysOfWeek.map((day) => (
                            <div key={day} className="flex items-center space-x-2">
                              <Checkbox
                                id={`day-${day}`}
                                checked={formData.preferredDays.includes(day)}
                                onCheckedChange={() => handleCheckboxArrayChange('preferredDays', day)}
                              />
                              <Label htmlFor={`day-${day}`} className="font-paragraph cursor-pointer">
                                {day}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="font-paragraph mb-3 block">
                          Preferred Times <span className="text-destructive">*</span>
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {timeSlots.map((time) => (
                            <div key={time} className="flex items-center space-x-2">
                              <Checkbox
                                id={`time-${time}`}
                                checked={formData.preferredTimes.includes(time)}
                                onCheckedChange={() => handleCheckboxArrayChange('preferredTimes', time)}
                              />
                              <Label htmlFor={`time-${time}`} className="font-paragraph cursor-pointer">
                                {time}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-foreground/10">
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="w-full sm:w-auto order-3 sm:order-1"
                >
                  Skip for Now
                </Button>

                <div className="flex gap-3 w-full sm:w-auto order-1 sm:order-2">
                  {currentSection > 0 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1 sm:flex-none"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={isLoading}
                    className="flex-1 sm:flex-none"
                  >
                    {currentSection === sections.length - 1 ? (
                      <>
                        {isLoading ? 'Submitting...' : 'Complete'}
                        <Check className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Save & Continue
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
