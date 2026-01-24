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
import { ClientProfiles, ClientDocuments, FileAssignments } from '@/entities';
import { ChevronLeft, ChevronRight, Check, Calendar, User, MapPin, Phone, Briefcase, Clock, Shield, AlertTriangle, CheckCircle, Search, CheckCircle2, Loader, Plus, XCircle, ExternalLink } from 'lucide-react';
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
  
  // Conflict Check
  conflictCheckCompleted: boolean;
  conflictCheckDate: string;
  conflictCheckStatus: string;
  opposingPartyNames: string;
  opposingPartyRelationship: string;
  conflictMatchesFound: string;
  conflictAcknowledged: boolean;
  conflictMatterCity: string;
}

const sections = [
  { id: 'conflict', title: 'Conflict of Interest', icon: Shield },      // STEP 1
  { id: 'personal', title: 'Personal Information', icon: User },        // STEP 2
  { id: 'contact', title: 'Contact Information', icon: Phone },         // STEP 3
  { id: 'address', title: 'Address', icon: MapPin },                    // STEP 4
  { id: 'emergency', title: 'Emergency Contact', icon: Phone },         // STEP 5
  { id: 'case', title: 'Case Information', icon: Briefcase },           // STEP 6
  { id: 'availability', title: 'Availability', icon: Clock },           // STEP 7
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['Morning (9am-12pm)', 'Afternoon (12pm-5pm)', 'Evening (5pm-8pm)'];

export default function ClientIntakePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClientId] = useState<string>('');
  const [conflictCheckLoading, setConflictCheckLoading] = useState(false);
  const [opposingParties, setOpposingParties] = useState<string[]>(['']);
  const [opposingRelationship, setOpposingRelationship] = useState('');
  const [matterCity, setMatterCity] = useState('');
  const [conflictCheckResult, setConflictCheckResult] = useState<{
    status: string;
    matches: any[];
    checkedNames: string[];
    checkedDate: string;
  } | null>(null);
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
    conflictCheckCompleted: false,
    conflictCheckDate: '',
    conflictCheckStatus: '',
    opposingPartyNames: '',
    opposingPartyRelationship: '',
    conflictMatchesFound: '',
    conflictAcknowledged: false,
    conflictMatterCity: '',
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
          conflictCheckCompleted: profile.conflictCheckCompleted || false,
          conflictCheckDate: profile.conflictCheckDate ? new Date(profile.conflictCheckDate).toISOString() : '',
          conflictCheckStatus: profile.conflictCheckStatus || '',
          opposingPartyNames: profile.opposingPartyNames || '',
          opposingPartyRelationship: profile.opposingPartyRelationship || '',
          conflictMatchesFound: profile.conflictMatchesFound || '',
          conflictAcknowledged: profile.conflictAcknowledged || false,
          conflictMatterCity: profile.conflictMatterCity || '',
        });
        
        if (profile.conflictCheckCompleted) {
          const parsedMatches = profile.conflictMatchesFound ? JSON.parse(profile.conflictMatchesFound) : [];
          setConflictCheckResult({
            status: profile.conflictCheckStatus || '',
            matches: parsedMatches,
            checkedNames: profile.opposingPartyNames?.split(',').map((s: string) => s.trim()) || [],
            checkedDate: profile.conflictCheckDate ? new Date(profile.conflictCheckDate).toISOString() : '',
          });
          setOpposingParties(profile.opposingPartyNames?.split(',').map((s: string) => s.trim()) || ['']);
          setOpposingRelationship(profile.opposingPartyRelationship || '');
          setMatterCity(profile.conflictMatterCity || '');
        }
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

  const handleConflictCheck = async () => {
    const partyNames = opposingParties.filter(p => p.trim()).map(p => p.trim());
    
    if (partyNames.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please enter at least one opposing party name.',
        variant: 'destructive',
      });
      return;
    }

    if (!opposingRelationship) {
      toast({
        title: 'Missing Information',
        description: 'Please select the relationship type.',
        variant: 'destructive',
      });
      return;
    }

    if (!matterCity.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please enter the city where the legal matter occurred.',
        variant: 'destructive',
      });
      return;
    }

    setConflictCheckLoading(true);

    try {
      // Fetch ALL data sources to search
      const [clientsRes, documentsRes, assignmentsRes] = await Promise.all([
        BaseCrudService.getAll<ClientProfiles>('clientprofiles'),
        BaseCrudService.getAll<ClientDocuments>('clientdocuments'),
        BaseCrudService.getAll<FileAssignments>('fileassignments'),
      ]);

      const allClients = clientsRes.items || [];
      const allDocuments = documentsRes.items || [];
      const allAssignments = assignmentsRes.items || [];
      
      const matches: Array<{
        matchType: 'client' | 'document' | 'file';
        matchedName: string;
        matchedIn: string;
        matchedAgainst: string;
      }> = [];

      // Helper function to check if search terms match a target string
      const checkMatch = (searchName: string, targetString: string): boolean => {
        if (!targetString) return false;
        
        const searchLower = searchName.trim().toLowerCase();
        const targetLower = targetString.toLowerCase();
        const searchTerms = searchLower.split(' ').filter(t => t.length > 1);
        
        // Exact match
        if (targetLower.includes(searchLower)) return true;
        
        // All search terms appear in target
        if (searchTerms.length > 0) {
          const matchCount = searchTerms.filter(term => targetLower.includes(term)).length;
          if (matchCount >= Math.ceil(searchTerms.length / 2)) return true;
        }
        
        return false;
      };

      // Search each opposing party name
      partyNames.forEach(searchName => {
        
        // 1. Search CLIENT PROFILES (names)
        allClients.forEach(client => {
          if (client._id === clientId) return; // Skip current user
          
          const clientFullName = `${client.firstName || ''} ${client.lastName || ''}`.trim();
          
          if (checkMatch(searchName, clientFullName)) {
            matches.push({
              matchType: 'client',
              matchedName: clientFullName,
              matchedIn: 'Client Records',
              matchedAgainst: searchName,
            });
          }
        });

        // 2. Search DOCUMENTS (document names, client names in notes)
        allDocuments.forEach(doc => {
          // Check document name
          if (checkMatch(searchName, doc.documentName || '')) {
            matches.push({
              matchType: 'document',
              matchedName: doc.documentName || 'Unknown Document',
              matchedIn: 'Document: ' + (doc.documentName || 'Unnamed'),
              matchedAgainst: searchName,
            });
          }
          
          // Check notes field
          if (checkMatch(searchName, doc.notes || '')) {
            matches.push({
              matchType: 'document',
              matchedName: searchName,
              matchedIn: 'Document Notes',
              matchedAgainst: searchName,
            });
          }
        });

        // 3. Search FILE ASSIGNMENTS (case notes)
        allAssignments.forEach(assignment => {
          if (checkMatch(searchName, assignment.notes || '')) {
            matches.push({
              matchType: 'file',
              matchedName: searchName,
              matchedIn: 'Case File Notes',
              matchedAgainst: searchName,
            });
          }
        });
      });

      // Remove duplicate matches
      const uniqueMatches = matches.filter((match, index, self) =>
        index === self.findIndex(m => 
          m.matchType === match.matchType && 
          m.matchedName === match.matchedName && 
          m.matchedAgainst === match.matchedAgainst
        )
      );

      // Determine status
      const hasConflict = uniqueMatches.length > 0;
      const status: 'passed' | 'blocked' = hasConflict ? 'blocked' : 'passed';
      const checkedDate = new Date().toISOString();

      // Save to database
      await BaseCrudService.update('clientprofiles', {
        _id: clientId,
        conflictCheckCompleted: true,
        conflictCheckDate: checkedDate,
        conflictCheckStatus: status,
        opposingPartyNames: partyNames.join(', '),
        opposingPartyRelationship: opposingRelationship,
        conflictMatterCity: matterCity.trim(),
        conflictMatchesFound: JSON.stringify(uniqueMatches),
      });

      // Update local state
      setConflictCheckResult({
        status,
        matches: uniqueMatches,
        checkedNames: partyNames,
        checkedDate,
      });

      // Update form data
      handleInputChange('conflictCheckCompleted', true);
      handleInputChange('conflictCheckStatus', status);
      handleInputChange('opposingPartyNames', partyNames.join(', '));
      handleInputChange('opposingPartyRelationship', opposingRelationship);
      handleInputChange('conflictMatterCity', matterCity.trim());
      handleInputChange('conflictMatchesFound', JSON.stringify(uniqueMatches));

      if (hasConflict) {
        toast({
          title: 'Potential Conflict Detected',
          description: 'We found matching records. Please contact our office to proceed.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'No Conflicts Found ✓',
          description: 'You may proceed with the intake form.',
        });
      }

    } catch (error) {
      console.error('Conflict check error:', error);
      toast({
        title: 'Error',
        description: 'Failed to run conflict check. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setConflictCheckLoading(false);
    }
  };

  const validateSection = (sectionIndex: number): boolean => {
    const section = sections[sectionIndex].id;
    
    switch (section) {
      case 'conflict':
        // Can only proceed if passed AND acknowledged
        // BLOCKED status = cannot proceed at all
        if (formData.conflictCheckStatus === 'blocked') {
          return false; // Never valid, cannot proceed
        }
        return formData.conflictCheckCompleted && formData.conflictAcknowledged;
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
                    {currentSection === 0 && 'Conflict of Interest Check (LSO Compliance)'}
                    {currentSection === 1 && 'Tell us about yourself'}
                    {currentSection === 2 && 'How can we reach you?'}
                    {currentSection === 3 && 'Where do you live?'}
                    {currentSection === 4 && 'Who should we contact in case of emergency?'}
                    {currentSection === 5 && 'Tell us about your legal matter'}
                    {currentSection === 6 && 'When are you available for appointments?'}
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
                  {/* Conflict of Interest Check - SECTION 0 (FIRST STEP) */}
                  {currentSection === 0 && (
                    <div className="space-y-6">
                      {/* Welcome & Explanation */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                        <h4 className="font-heading font-bold text-blue-900 mb-2 flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          Before We Begin: Conflict of Interest Check
                        </h4>
                        <p className="font-paragraph text-sm text-blue-800 mb-2">
                          The Law Society of Ontario requires us to check for conflicts of interest 
                          <strong> before </strong> we can collect your information or discuss your case.
                        </p>
                        <p className="font-paragraph text-sm text-blue-800">
                          Please provide the names of the other party/parties in your legal matter so we can 
                          ensure we haven't previously represented someone with opposing interests.
                        </p>
                      </div>

                      {/* Already Completed - Show Results */}
                      {formData.conflictCheckCompleted && (
                        <div className={`border-2 rounded-lg p-6 ${
                          formData.conflictCheckStatus === 'passed'
                            ? 'bg-green-50 border-green-400'
                            : 'bg-red-50 border-red-400'
                        }`}>
                          {/* PASSED */}
                          {formData.conflictCheckStatus === 'passed' && (
                            <>
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                  <CheckCircle2 className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-heading font-bold text-xl text-green-800">NO CONFLICTS FOUND</h4>
                                  <p className="text-sm text-green-700">You may proceed with the intake process</p>
                                </div>
                              </div>

                              <div className="bg-white/50 rounded-lg p-4 space-y-2 text-sm mb-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-foreground/60">Opposing Parties Checked</p>
                                    <p className="font-medium">{formData.opposingPartyNames}</p>
                                  </div>
                                  <div>
                                    <p className="text-foreground/60">City/Location</p>
                                    <p className="font-medium">{formData.conflictMatterCity}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Acknowledgment for passed */}
                              {!formData.conflictAcknowledged && (
                                <div className="flex items-start space-x-3 pt-4 border-t border-green-200">
                                  <Checkbox
                                    id="conflictAcknowledge"
                                    checked={formData.conflictAcknowledged}
                                    onCheckedChange={(checked) => handleInputChange('conflictAcknowledged', checked)}
                                  />
                                  <Label htmlFor="conflictAcknowledge" className="font-paragraph text-sm cursor-pointer leading-relaxed">
                                    I confirm that I have provided accurate names for all opposing parties. I understand 
                                    LegalAssist has checked for conflicts of interest and I may proceed.
                                  </Label>
                                </div>
                              )}

                              {formData.conflictAcknowledged && (
                                <div className="flex items-center gap-2 pt-4 border-t border-green-200 text-green-700">
                                  <CheckCircle2 className="w-5 h-5" />
                                  <span className="font-medium">Acknowledged — Click "Save & Continue" to proceed</span>
                                </div>
                              )}
                            </>
                          )}

                          {/* BLOCKED - CONFLICT FOUND */}
                          {formData.conflictCheckStatus === 'blocked' && (
                            <>
                              {/* Status Header */}
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                                  <AlertTriangle className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-heading font-bold text-xl text-amber-800">POTENTIAL CONFLICT DETECTED</h4>
                                  <p className="text-sm text-amber-700">Additional review required before proceeding</p>
                                </div>
                              </div>

                              {/* Simple Explanation - NO DETAILS */}
                              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-amber-800">
                                  Potential matching records exist in our system. To ensure compliance with the Law Society 
                                  of Ontario's conflict of interest rules, we are unable to proceed with online registration 
                                  at this time.
                                </p>
                              </div>

                              {/* Schedule Callback */}
                              <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 text-center mb-6">
                                <h4 className="font-heading font-bold text-lg text-foreground mb-2">
                                  Schedule a Callback
                                </h4>
                                <p className="font-paragraph text-sm text-foreground/80 mb-4">
                                  Please contact our office to discuss your matter. We will review the situation and 
                                  advise you on next steps.
                                </p>
                                <a 
                                  href="/contact" 
                                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                  <Phone className="w-5 h-5" />
                                  Schedule a Callback
                                </a>
                                <p className="text-xs text-foreground/60 mt-3">
                                  Or call us directly at: <strong>(519) 123-4567</strong>
                                </p>
                              </div>

                              {/* Referral Resources - Required by LSO */}
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                                <h5 className="font-heading font-semibold text-foreground mb-3">
                                  Alternative Legal Resources
                                </h5>
                                <p className="text-sm text-foreground/70 mb-4">
                                  If we are unable to assist you, the following resources can help you find alternative representation:
                                </p>
                                
                                <div className="space-y-3 text-sm">
                                  <div className="flex items-start gap-3">
                                    <ExternalLink className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                      <a 
                                        href="https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/law-society-referral-service"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-primary hover:underline"
                                      >
                                        Law Society of Ontario Referral Service
                                      </a>
                                      <p className="text-foreground/60">Free 30-minute consultation — 1-800-268-8326</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <ExternalLink className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                      <a 
                                        href="https://www.legalaid.on.ca/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-primary hover:underline"
                                      >
                                        Legal Aid Ontario
                                      </a>
                                      <p className="text-foreground/60">Free legal help if you qualify — 1-800-668-8258</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <ExternalLink className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                      <a 
                                        href="https://www.legalaid.on.ca/legal-clinics/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-primary hover:underline"
                                      >
                                        Community Legal Clinics
                                      </a>
                                      <p className="text-foreground/60">Free services for eligible individuals in your area</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Footer Notice */}
                              <p className="text-xs text-center text-foreground/50 mt-4">
                                This check has been recorded as required by the Law Society of Ontario.
                              </p>
                            </>
                          )}
                        </div>
                      )}

                      {/* Not Yet Completed - Show Form */}
                      {!formData.conflictCheckCompleted && (
                        <>
                          {/* Opposing Party Names */}
                          <div>
                            <Label className="font-paragraph font-medium text-base">
                              Opposing Party Name(s) <span className="text-destructive">*</span>
                            </Label>
                            <p className="text-sm text-foreground/60 mb-3">
                              Enter the full legal name of EACH person or business on the other side of your legal matter.
                            </p>
                            
                            {opposingParties.map((party, index) => (
                              <div key={index} className="flex gap-2 mb-3">
                                <div className="flex-1">
                                  <Input
                                    value={party}
                                    onChange={(e) => {
                                      const newParties = [...opposingParties];
                                      newParties[index] = e.target.value;
                                      setOpposingParties(newParties);
                                    }}
                                    placeholder={index === 0 
                                      ? "e.g., John Smith or ABC Property Management Inc."
                                      : `Opposing party ${index + 1}`}
                                    className="h-12"
                                  />
                                </div>
                                {opposingParties.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setOpposingParties(opposingParties.filter((_, i) => i !== index))}
                                    className="h-12 w-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setOpposingParties([...opposingParties, ''])}
                              className="w-full mt-2 border-dashed border-2 h-12"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Another Opposing Party
                            </Button>
                          </div>

                          {/* Relationship Type */}
                          <div>
                            <Label className="font-paragraph font-medium text-base">
                              Their Role in Your Legal Matter <span className="text-destructive">*</span>
                            </Label>
                            <Select value={opposingRelationship} onValueChange={setOpposingRelationship}>
                              <SelectTrigger className="mt-2 h-12">
                                <SelectValue placeholder="Select their role..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Landlord">Landlord</SelectItem>
                                <SelectItem value="Tenant">Tenant</SelectItem>
                                <SelectItem value="Employer">Employer</SelectItem>
                                <SelectItem value="Former Employer">Former Employer</SelectItem>
                                <SelectItem value="Business/Company">Business/Company</SelectItem>
                                <SelectItem value="Individual">Individual</SelectItem>
                                <SelectItem value="Government Agency">Government Agency</SelectItem>
                                <SelectItem value="Insurance Company">Insurance Company</SelectItem>
                                <SelectItem value="Creditor">Creditor/Collection Agency</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* City/Location of Legal Matter */}
                          <div>
                            <Label className="font-paragraph font-medium text-base">
                              City Where Legal Matter Occurred <span className="text-destructive">*</span>
                            </Label>
                            <p className="text-sm text-foreground/60 mb-2">
                              This helps us check for conflicts in the same geographic area.
                            </p>
                            <Input
                              value={matterCity}
                              onChange={(e) => setMatterCity(e.target.value)}
                              placeholder="e.g., London, Toronto, Windsor"
                              className="mt-1 h-12"
                            />
                          </div>

                          {/* Warning */}
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <div className="flex gap-3">
                              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-amber-800 mb-1">Important: One-Time Check</p>
                                <p className="text-sm text-amber-700">
                                  You can only run this conflict check <strong>once</strong>. Please ensure all 
                                  opposing party names are entered correctly before proceeding.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Run Check Button */}
                          <Button
                            type="button"
                            onClick={handleConflictCheck}
                            disabled={conflictCheckLoading || opposingParties.filter(p => p.trim()).length === 0 || !opposingRelationship || !matterCity}
                            className="w-full py-6 text-lg font-semibold"
                            size="lg"
                          >
                            {conflictCheckLoading ? (
                              <>
                                <Loader className="w-5 h-5 mr-2 animate-spin" />
                                Searching Client Database...
                              </>
                            ) : (
                              <>
                                <Shield className="w-5 h-5 mr-2" />
                                Run Conflict of Interest Check
                              </>
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Personal Information - NOW SECTION 1 */}
                  {currentSection === 1 && (
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

                  {/* Contact Information - NOW SECTION 2 */}
                  {currentSection === 2 && (
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

                  {/* Address Information - NOW SECTION 3 */}
                  {currentSection === 3 && (
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

                  {/* Emergency Contact - NOW SECTION 4 */}
                  {currentSection === 4 && (
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

                  {/* Case Information - NOW SECTION 5 */}
                  {currentSection === 5 && (
                    <div className="space-y-6">
                      {/* LSO Compliance Disclaimer */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-foreground/80">
                          <strong>Please Note:</strong> Completing this form does not create a paralegal-client 
                          relationship. The information provided will be kept confidential and used solely to 
                          determine if we can assist with your matter. A paralegal-client relationship is only 
                          formed upon signing a written retainer agreement.
                        </p>
                      </div>

                      {/* Type of Legal Matter */}
                      <div>
                        <Label htmlFor="caseType" className="font-paragraph">
                          Type of Legal Matter <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.caseType}
                          onValueChange={(value) => handleInputChange('caseType', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select the type of matter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Small Claims Court">Small Claims Court</SelectItem>
                            <SelectItem value="Landlord and Tenant Board">Landlord and Tenant Board</SelectItem>
                            <SelectItem value="Human Rights Tribunal">Human Rights Tribunal</SelectItem>
                            <SelectItem value="Traffic Ticket">Traffic Ticket</SelectItem>
                            <SelectItem value="Provincial Offences">Provincial Offences</SelectItem>
                            <SelectItem value="Criminal Summary Conviction">Criminal Summary Conviction</SelectItem>
                            <SelectItem value="Employment Matter">Employment Matter</SelectItem>
                            <SelectItem value="WSIB Appeal">WSIB Appeal</SelectItem>
                            <SelectItem value="Social Benefits Tribunal">Social Benefits Tribunal</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Brief Summary */}
                      <div>
                        <Label htmlFor="caseDescription" className="font-paragraph">
                          Brief Summary of Your Matter <span className="text-destructive">*</span>
                        </Label>
                        <p className="text-sm text-foreground/60 mb-2">
                          Please describe your situation in 2-3 sentences. We will gather more details during our consultation.
                        </p>
                        <Textarea
                          id="caseDescription"
                          value={formData.caseDescription}
                          onChange={(e) => handleInputChange('caseDescription', e.target.value)}
                          className="mt-1 min-h-24"
                          placeholder="Example: I received an eviction notice from my landlord on January 10th. I believe the notice is invalid because..."
                          maxLength={500}
                        />
                        <p className="text-xs text-foreground/50 mt-1 text-right">
                          {formData.caseDescription.length}/500 characters
                        </p>
                      </div>

                      {/* Court Documents */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasCourtDocuments"
                          checked={formData.hasCourtDocuments}
                          onCheckedChange={(checked) => handleInputChange('hasCourtDocuments', checked)}
                        />
                        <Label htmlFor="hasCourtDocuments" className="font-paragraph cursor-pointer">
                          I have received court documents or forms related to this matter
                        </Label>
                      </div>

                      {/* Court Deadline */}
                      <div>
                        <Label htmlFor="courtDeadline" className="font-paragraph">
                          Upcoming Deadline or Court Date (if any)
                        </Label>
                        <p className="text-sm text-foreground/60 mb-2">
                          If you have a deadline to respond or a scheduled court/tribunal date, please provide it below.
                        </p>
                        <Input
                          id="courtDeadline"
                          type="date"
                          value={formData.courtDeadline}
                          onChange={(e) => handleInputChange('courtDeadline', e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      {/* Prior Consultations */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="consultedOther"
                          checked={formData.consultedOther}
                          onCheckedChange={(checked) => handleInputChange('consultedOther', checked)}
                        />
                        <Label htmlFor="consultedOther" className="font-paragraph cursor-pointer">
                          I have previously consulted with a lawyer or paralegal about this matter
                        </Label>
                      </div>

                      {/* How can we help - replaces Additional Notes */}
                      <div>
                        <Label htmlFor="additionalNotes" className="font-paragraph">
                          How can we help you? (Optional)
                        </Label>
                        <p className="text-sm text-foreground/60 mb-2">
                          Briefly tell us what outcome you are hoping to achieve.
                        </p>
                        <Textarea
                          id="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                          className="mt-1 min-h-20"
                          placeholder="Example: I want to fight the eviction and stay in my apartment."
                          maxLength={300}
                        />
                        <p className="text-xs text-foreground/50 mt-1 text-right">
                          {formData.additionalNotes.length}/300 characters
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Availability - NOW SECTION 6 */}
                  {currentSection === 6 && (
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
                {/* Only show Skip if NOT blocked */}
                {!(currentSection === 0 && formData.conflictCheckStatus === 'blocked') && (
                  <Button
                    variant="outline"
                    onClick={handleSkip}
                    className="w-full sm:w-auto order-3 sm:order-1"
                  >
                    Skip for Now
                  </Button>
                )}

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
                  {/* Only show Save & Continue if NOT blocked */}
                  {!(currentSection === 0 && formData.conflictCheckStatus === 'blocked') && (
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
                  )}
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
