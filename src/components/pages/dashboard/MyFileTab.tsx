import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield, CheckCircle, AlertTriangle, FileText, Calendar, User,
  Scale, FolderOpen, Briefcase, Building2, Phone, Mail, MapPin,
  CreditCard, MessageCircle, FileCheck, Lock, Clock, Upload,
  ChevronRight, Loader
} from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import type { ClientProfile, CurrentUser, ClientDocument } from './types';
import CaseStatusTimeline from '@/components/client/CaseStatusTimeline';

interface MyFileTabProps {
  currentUser: CurrentUser;
  profile: ClientProfile | null;
  documents: ClientDocument[];
  isLoadingProfile: boolean;
}

// LSO compliance sections that the client can see
const CLIENT_SECTIONS = [
  { id: 'identification', label: 'Personal Identification', icon: User, description: 'Your name, address, occupation, and contact details' },
  { id: 'verification', label: 'Identity Verification', icon: Shield, description: 'Government photo ID on file' },
  { id: 'conflict', label: 'Conflict of Interest Check', icon: Scale, description: 'Checked against our records for conflicts' },
  { id: 'retainer', label: 'Retainer Agreement', icon: FileCheck, description: 'Signed agreement outlining scope and fees' },
  { id: 'documents', label: 'Case Documents', icon: FileText, description: 'Documents uploaded for your matter' },
  { id: 'communications', label: 'Communication Log', icon: MessageCircle, description: 'Record of all communications' },
  { id: 'billing', label: 'Billing & Payments', icon: CreditCard, description: 'Invoices and payment history' },
];

export default function MyFileTab({ currentUser, profile, documents, isLoadingProfile }: MyFileTabProps) {
  const [fileAssignment, setFileAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFileAssignment();
  }, [currentUser?.email]);

  const loadFileAssignment = async () => {
    try {
      const { items } = await BaseCrudService.getAllPages<any>('fileassignments');
      // Find the file assignment for this client
      const { items: clients } = await BaseCrudService.getAllPages<any>('clientprofiles');
      const clientProfile = clients?.find((c: any) => {
        const userEmail = currentUser?.email?.toLowerCase();
        // Match by email from the user accounts
        return c._id === profile?._id;
      });

      if (clientProfile) {
        const assignment = items?.find((a: any) => a.clientId === clientProfile._id);
        setFileAssignment(assignment || null);
      }
    } catch (error) {
      console.error('Error loading file assignment:', error);
    } finally {
      setLoading(false);
    }
  };

  // Determine completion status for each section
  const getSectionStatus = (sectionId: string): 'complete' | 'pending' | 'flagged' => {
    if (!profile) return 'pending';

    switch (sectionId) {
      case 'identification':
        return profile.firstName && profile.lastName && profile.occupation ? 'complete' : 'pending';
      case 'verification':
        return profile.idType && profile.idVerificationConsent ? 'complete' : 'pending';
      case 'conflict':
        if (profile.conflictCheckStatus === 'flagged') return 'flagged';
        return profile.conflictCheckCompleted ? 'complete' : 'pending';
      case 'retainer':
        // Will be complete once retainer is signed — check file assignment
        return fileAssignment?.fileStatus === 'Active' ? 'complete' : 'pending';
      case 'documents':
        return documents.length > 0 ? 'complete' : 'pending';
      case 'communications':
        return 'complete'; // Messages are always tracked
      case 'billing':
        return 'pending'; // Will connect to payments
      default:
        return 'pending';
    }
  };

  const completedCount = CLIENT_SECTIONS.filter(s => getSectionStatus(s.id) === 'complete').length;
  const totalSections = CLIENT_SECTIONS.length;
  const completionPercent = Math.round((completedCount / totalSections) * 100);

  if (isLoadingProfile || loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <Loader className="w-8 h-8 text-primary animate-spin mr-3" />
          <p className="font-paragraph text-foreground/70">Loading your file...</p>
        </CardContent>
      </Card>
    );
  }

  if (!profile?.intakeCompleted) {
    return (
      <Card>
        <CardContent className="text-center py-16">
          <FolderOpen className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
          <h3 className="font-heading text-xl font-bold text-foreground mb-2">No File Yet</h3>
          <p className="font-paragraph text-foreground/60 mb-6 max-w-md mx-auto">
            Your client file will be created after you complete the intake form. The intake collects
            information required by the Law Society of Ontario.
          </p>
          <Button onClick={() => window.location.href = '/client-intake'} className="bg-primary hover:bg-primary/90 text-white">
            Complete Intake Form
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Where's my case? timeline — F-C. Read-only view of the
          paralegal-set status. Set fileStage 1-5 + fileStageNote on
          clientfiles to surface updates here. */}
      {fileAssignment && (
        <CaseStatusTimeline
          file={{
            _id: fileAssignment._id,
            fileNumber: fileAssignment.fileNumber,
            matterType: fileAssignment.matterType,
            fileStage: fileAssignment.fileStage,
            fileStageNote: fileAssignment.fileStageNote,
            fileStageUpdatedDate: fileAssignment.fileStageUpdatedDate,
          }}
        />
      )}

      {/* File Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                My Client File
              </CardTitle>
              <CardDescription className="font-paragraph mt-1">
                Your file is organized according to Law Society of Ontario requirements
              </CardDescription>
            </div>
            {/* Completion badge */}
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                completionPercent >= 80 ? 'text-green-600' : completionPercent >= 50 ? 'text-amber-600' : 'text-red-500'
              }`}>
                {completionPercent}%
              </div>
              <p className="text-xs text-gray-500">Complete</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className={`h-2.5 rounded-full transition-all ${
                completionPercent >= 80 ? 'bg-green-500' : completionPercent >= 50 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${completionPercent}%` }}
            />
          </div>

          {/* File details */}
          {fileAssignment && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Matter Type</p>
                <p className="text-sm font-medium text-gray-900">{profile?.caseType || 'Pending'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Assigned Paralegal</p>
                <p className="text-sm font-medium text-gray-900">{fileAssignment.paralegalName || 'Pending assignment'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">File Status</p>
                <Badge variant="outline" className="mt-0.5">{fileAssignment.fileStatus || 'Active'}</Badge>
              </div>
            </div>
          )}

          {/* Conflict flag notice */}
          {profile?.conflictCheckStatus === 'flagged' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Conflict Check Under Review</p>
                <p className="text-sm text-amber-700">
                  A potential match was found during your conflict check. Your paralegal will review this
                  and discuss it with you at your consultation. This is common and often not an actual conflict.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Sections Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">File Checklist</CardTitle>
          <CardDescription className="font-paragraph">
            Track the progress of your client file. Each section is required for LSO compliance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-100">
            {CLIENT_SECTIONS.map((section) => {
              const status = getSectionStatus(section.id);
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className={`flex items-center gap-4 py-4 ${
                    status === 'flagged' ? 'bg-amber-50/50 -mx-6 px-6 rounded-lg' : ''
                  }`}
                >
                  {/* Status indicator */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    status === 'complete' ? 'bg-green-100' :
                    status === 'flagged' ? 'bg-amber-100' :
                    'bg-gray-100'
                  }`}>
                    {status === 'complete' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : status === 'flagged' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Icon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  {/* Section info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-paragraph font-medium ${
                        status === 'complete' ? 'text-green-800' :
                        status === 'flagged' ? 'text-amber-800' :
                        'text-gray-600'
                      }`}>
                        {section.label}
                      </p>
                      {status === 'complete' && (
                        <Badge className="bg-green-100 text-green-700 text-xs">Complete</Badge>
                      )}
                      {status === 'flagged' && (
                        <Badge className="bg-amber-100 text-amber-700 text-xs">Under Review</Badge>
                      )}
                      {status === 'pending' && (
                        <Badge variant="outline" className="text-xs text-gray-400">Pending</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{section.description}</p>
                  </div>

                  {/* Action */}
                  {status === 'pending' && section.id === 'documents' && (
                    <Button variant="outline" size="sm" className="flex-shrink-0">
                      <Upload className="w-3.5 h-3.5 mr-1.5" />
                      Upload
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Documents on file */}
      {documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documents on File
            </CardTitle>
            <CardDescription className="font-paragraph">
              Documents uploaded to your client file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.documentName || 'Untitled Document'}</p>
                      <p className="text-xs text-gray-500">
                        {doc.documentCategory || 'General'}
                        {doc.uploadDate && ` • ${new Date(doc.uploadDate).toLocaleDateString('en-CA')}`}
                      </p>
                    </div>
                  </div>
                  {doc.fileUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(doc.fileUrl, '_blank')}
                    >
                      View
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Retention notice */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Your file is stored securely per Law Society of Ontario By-Law 7.1, s.23(14) — minimum 6-year retention
        </p>
      </div>
    </div>
  );
}
