/**
 * TrafficTicketOnboarding.tsx
 *
 * Admin-facing component that auto-detects a client's city from their profile,
 * pulls the matching court info + city-specific forms, and lets the paralegal
 * generate pre-filled documents for the client's traffic ticket case.
 */

import { useState, useMemo, useCallback } from 'react';
import {
  MapPin, Phone, Mail, Clock, Globe, FileText, Download,
  ExternalLink, CheckCircle, AlertTriangle, Car, Scale, Gavel,
  DollarSign, ChevronDown, ChevronUp, Info, Send, Wand2, Loader2,
  Upload, AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { findCourtByCity, CITY_COURTS, type CityCourtInfo, type CityForm } from '@/lib/city-court-data';
import { fetchAndFillPDF, fillUploadedPDF, FIRM_INFO, CORS_BLOCKED } from '@/lib/pdf-form-filler';
import { sendCourtFormsEmail } from '@/lib/email-service';
import type { ClientProfiles } from '@/entities';

interface TrafficTicketOnboardingProps {
  clientProfile: ClientProfiles | null;
  onGenerateDocument?: (formName: string, courtInfo: CityCourtInfo, clientData: ClientProfiles) => void;
}

export default function TrafficTicketOnboarding({ clientProfile, onGenerateDocument }: TrafficTicketOnboardingProps) {
  const [manualCity, setManualCity] = useState('');
  const [selectedForms, setSelectedForms] = useState<Set<number>>(new Set());
  const [showCourtDetails, setShowCourtDetails] = useState(true);
  const [generatingForm, setGeneratingForm] = useState<string | null>(null);
  const [generatedForms, setGeneratedForms] = useState<Set<string>>(new Set());

  // Auto-fill state
  const [fillingForm, setFillingForm] = useState<string | null>(null);
  const [filledForms, setFilledForms] = useState<Set<string>>(new Set());
  const [fillErrors, setFillErrors] = useState<Record<string, string>>({});
  const [showCaseFields, setShowCaseFields] = useState(true);

  // Filled form blobs (stored after auto-fill for re-download / email reference)
  const [filledFormBlobs, setFilledFormBlobs] = useState<Map<string, { blob: Blob; filename: string }>>(new Map());

  // Email state
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showEmailCompose, setShowEmailCompose] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Case-specific fields that the paralegal fills in manually
  const [ticketNumber, setTicketNumber] = useState('');
  const [offenceDate, setOffenceDate] = useState('');
  const [courtDate, setCourtDate] = useState(
    clientProfile?.courtDeadline
      ? new Date(clientProfile.courtDeadline as string).toISOString().slice(0, 10)
      : ''
  );

  // Auto-detect court from client's city
  const detectedCourt = useMemo(() => {
    const city = manualCity || clientProfile?.city || '';
    return findCourtByCity(city);
  }, [clientProfile?.city, manualCity]);

  const clientCity = clientProfile?.city || '';
  const clientName = [clientProfile?.firstName, clientProfile?.lastName].filter(Boolean).join(' ') || 'Unknown Client';

  // Toggle form selection
  const toggleForm = (idx: number) => {
    setSelectedForms(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  // Select all forms
  const selectAllForms = () => {
    if (!detectedCourt?.cityForms) return;
    if (selectedForms.size === detectedCourt.cityForms.length) {
      setSelectedForms(new Set());
    } else {
      setSelectedForms(new Set(detectedCourt.cityForms.map((_, i) => i)));
    }
  };

  // Handle document generation for a single form
  const handleGenerateForm = async (form: CityForm, idx: number) => {
    if (!detectedCourt || !clientProfile) return;
    setGeneratingForm(form.name);

    try {
      // If form has a direct URL, open it; otherwise generate a pre-filled document
      if (form.url) {
        window.open(form.url, '_blank');
      }

      if (onGenerateDocument) {
        onGenerateDocument(form.name, detectedCourt, clientProfile);
      }

      setGeneratedForms(prev => new Set(prev).add(form.name));
    } finally {
      setGeneratingForm(null);
    }
  };

  // Build manual overrides from case-specific fields
  const manualOverrides = useMemo(() => {
    const overrides: Record<string, string> = {};
    if (ticketNumber) overrides['offenceNumber'] = ticketNumber;
    if (offenceDate) overrides['offenceDate'] = offenceDate;
    if (courtDate) overrides['courtDate'] = courtDate;
    return overrides;
  }, [ticketNumber, offenceDate, courtDate]);

  // Auto-fill a single form PDF
  const handleAutoFill = useCallback(async (form: CityForm) => {
    if (!detectedCourt || !clientProfile || !form.url) return;

    setFillingForm(form.name);
    setFillErrors(prev => {
      const next = { ...prev };
      delete next[form.name];
      return next;
    });

    try {
      const result = await fetchAndFillPDF(
        form.url,
        form.name,
        clientProfile,
        FIRM_INFO,
        detectedCourt,
        Object.keys(manualOverrides).length > 0 ? manualOverrides : undefined,
      );

      if (result.success) {
        setFilledForms(prev => new Set(prev).add(form.name));
        // Store the filled blob for email attachment / re-download
        if (result.blob && result.filename) {
          setFilledFormBlobs(prev => {
            const next = new Map(prev);
            next.set(form.name, { blob: result.blob!, filename: result.filename! });
            return next;
          });
        }
      } else if (result.error?.includes('CORS')) {
        // CORS blocked — open the blank form and prompt upload
        window.open(form.url, '_blank');
        setFillErrors(prev => ({
          ...prev,
          [form.name]: 'CORS blocked — download the form above, then use "Upload & Fill"',
        }));
      } else {
        setFillErrors(prev => ({ ...prev, [form.name]: result.error || 'Failed to auto-fill' }));
      }
    } catch (err: any) {
      if (err?.code === CORS_BLOCKED || (err instanceof Error && err.message.includes('CORS'))) {
        // Open blank form for manual download, then user can Upload & Fill
        window.open(form.url, '_blank');
        setFillErrors(prev => ({
          ...prev,
          [form.name]: 'Download opened — use "Upload & Fill" below to auto-populate it',
        }));
      } else {
        setFillErrors(prev => ({
          ...prev,
          [form.name]: err instanceof Error ? err.message : 'Unexpected error',
        }));
      }
    } finally {
      setFillingForm(null);
    }
  }, [detectedCourt, clientProfile, manualOverrides]);

  // Handle uploaded PDF for forms without direct URL
  const handleUploadAndFill = useCallback(async (form: CityForm) => {
    if (!detectedCourt || !clientProfile) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setFillingForm(form.name);
      setFillErrors(prev => {
        const next = { ...prev };
        delete next[form.name];
        return next;
      });

      try {
        const result = await fillUploadedPDF(
          file,
          clientProfile,
          FIRM_INFO,
          detectedCourt,
          Object.keys(manualOverrides).length > 0 ? manualOverrides : undefined,
        );

        // Trigger download of the filled PDF
        const url = URL.createObjectURL(result.blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = result.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setFilledForms(prev => new Set(prev).add(form.name));
      } catch (err) {
        setFillErrors(prev => ({
          ...prev,
          [form.name]: err instanceof Error ? err.message : 'Failed to fill uploaded PDF',
        }));
      } finally {
        setFillingForm(null);
      }
    };
    input.click();
  }, [detectedCourt, clientProfile, manualOverrides]);

  // Bulk auto-fill all selected forms that have URLs
  const handleBulkAutoFill = useCallback(async () => {
    if (!detectedCourt?.cityForms || !clientProfile) return;

    const formsToFill = [...selectedForms]
      .map(idx => detectedCourt.cityForms![idx])
      .filter(f => f.url);

    for (const form of formsToFill) {
      await handleAutoFill(form);
      // Small delay between downloads to avoid browser blocking
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }, [detectedCourt, clientProfile, selectedForms, handleAutoFill]);

  // No client profile loaded yet
  if (!clientProfile) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Car className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-paragraph">Loading client profile...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Court Detection Card */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            Traffic Ticket Onboarding
          </CardTitle>
          <CardDescription className="font-paragraph">
            Auto-detected court and forms based on client location. Select forms to generate for {clientName}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* City Detection Status */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${detectedCourt ? 'bg-green-100' : 'bg-amber-100'}`}>
                <MapPin className={`w-5 h-5 ${detectedCourt ? 'text-green-600' : 'text-amber-600'}`} />
              </div>
              <div>
                <p className="font-paragraph text-sm font-semibold text-foreground">
                  {detectedCourt
                    ? `Court detected: ${detectedCourt.city}${detectedCourt.region ? ` (${detectedCourt.region})` : ''}`
                    : clientCity
                      ? `No court found for "${clientCity}"`
                      : 'No city on client profile'
                  }
                </p>
                <p className="font-paragraph text-xs text-foreground/60">
                  {detectedCourt
                    ? `Client city: ${clientCity || manualCity} → ${detectedCourt.courtAddress}`
                    : 'Enter a city below or update the client profile'
                  }
                </p>
              </div>
            </div>

            {/* Manual city override */}
            {!detectedCourt && (
              <div className="flex gap-2 mt-3">
                <select
                  value={manualCity}
                  onChange={(e) => setManualCity(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-paragraph focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select court city...</option>
                  {CITY_COURTS.map(c => (
                    <option key={c.city} value={c.city}>
                      {c.city}{c.region ? ` (${c.region})` : ''}{c.servesAreas ? ` — serves: ${c.servesAreas.join(', ')}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Override even when detected */}
            {detectedCourt && (
              <details className="mt-2">
                <summary className="text-xs text-primary cursor-pointer hover:underline">
                  Wrong court? Select a different one
                </summary>
                <select
                  value={manualCity}
                  onChange={(e) => setManualCity(e.target.value)}
                  className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-paragraph focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Use auto-detected ({detectedCourt.city})</option>
                  {CITY_COURTS.map(c => (
                    <option key={c.city} value={c.city}>
                      {c.city}{c.region ? ` (${c.region})` : ''}
                    </option>
                  ))}
                </select>
              </details>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Court Info Card */}
      {detectedCourt && (
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => setShowCourtDetails(!showCourtDetails)}>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <Gavel className="w-5 h-5 text-primary" />
                {detectedCourt.city} Court Information
              </CardTitle>
              {showCourtDetails
                ? <ChevronUp className="w-5 h-5 text-gray-400" />
                : <ChevronDown className="w-5 h-5 text-gray-400" />
              }
            </div>
          </CardHeader>
          {showCourtDetails && (
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground/80">{detectedCourt.courtAddress}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <a href={`tel:${detectedCourt.phone.replace(/\s/g, '')}`} className="text-primary font-medium hover:underline">
                      {detectedCourt.phone}
                    </a>
                  </div>
                  {detectedCourt.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <a href={`mailto:${detectedCourt.email}`} className="text-primary hover:underline">
                        {detectedCourt.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{detectedCourt.hours}</span>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-2">
                  {detectedCourt.paymentUrl && (
                    <a
                      href={detectedCourt.paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm bg-green-50 text-green-800 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <DollarSign className="w-4 h-4" />
                      Pay Online: {detectedCourt.paymentPortal}
                      <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                    </a>
                  )}
                  {detectedCourt.disputeUrl && (
                    <a
                      href={detectedCourt.disputeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm bg-blue-50 text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Scale className="w-4 h-4" />
                      Dispute a Ticket
                      <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                    </a>
                  )}
                  <a
                    href={detectedCourt.municipalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm bg-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Municipal Court Info
                    <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                  </a>
                </div>
              </div>

              {/* Serves Areas */}
              {detectedCourt.servesAreas && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-foreground/50">
                    <strong>Serves:</strong> {detectedCourt.servesAreas.join(', ')}
                  </p>
                </div>
              )}

              {/* Notes */}
              {detectedCourt.notes && (
                <div className="mt-2 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg">
                  <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>{detectedCourt.notes}</span>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Case-Specific Fields (for auto-fill overrides) */}
      {detectedCourt && (
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => setShowCaseFields(!showCaseFields)}>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                Case Details (for Auto-Fill)
              </CardTitle>
              {showCaseFields
                ? <ChevronUp className="w-5 h-5 text-gray-400" />
                : <ChevronDown className="w-5 h-5 text-gray-400" />
              }
            </div>
          </CardHeader>
          {showCaseFields && (
            <CardContent>
              <p className="text-xs text-foreground/60 mb-4">
                Enter case-specific details below. These will be merged with the client's profile data when auto-filling forms.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Ticket / Offence Number
                  </label>
                  <input
                    type="text"
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    placeholder="e.g. AB-12345678"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-paragraph focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Offence Date
                  </label>
                  <input
                    type="date"
                    value={offenceDate}
                    onChange={(e) => setOffenceDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-paragraph focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Court / Trial Date
                  </label>
                  <input
                    type="date"
                    value={courtDate}
                    onChange={(e) => setCourtDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-paragraph focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="mt-3 p-2 bg-blue-50 rounded-lg flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                  Auto-fill uses <strong>{FIRM_INFO.paralegalName}</strong> ({FIRM_INFO.firmName}) as the representative.
                  Client info is pulled from the profile: {clientProfile?.firstName} {clientProfile?.lastName}, {clientProfile?.city || 'no city'}.
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* City-Specific Forms Card */}
      {detectedCourt && detectedCourt.cityForms && detectedCourt.cityForms.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {detectedCourt.city} Court Forms ({detectedCourt.cityForms.length})
                </CardTitle>
                <CardDescription className="font-paragraph mt-1">
                  Select forms to open or generate for {clientName}. Client data will be pre-filled where possible.
                </CardDescription>
              </div>
              {detectedCourt.formsPageUrl && (
                <a
                  href={detectedCourt.formsPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1 flex-shrink-0"
                >
                  All Forms <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {/* Select All */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <button
                onClick={selectAllForms}
                className="text-sm text-primary hover:underline font-medium"
              >
                {selectedForms.size === detectedCourt.cityForms.length ? 'Deselect All' : 'Select All'}
              </button>
              <span className="text-xs text-foreground/50">
                {selectedForms.size} of {detectedCourt.cityForms.length} selected
              </span>
            </div>

            {/* Form List */}
            <div className="space-y-3">
              {detectedCourt.cityForms.map((form, idx) => {
                const isSelected = selectedForms.has(idx);
                const isGenerated = generatedForms.has(form.name);
                const isGenerating = generatingForm === form.name;

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 rounded-lg p-3 border transition-colors cursor-pointer ${
                      isSelected ? 'border-primary/30 bg-primary/5' : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => toggleForm(idx)}
                  >
                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? 'border-primary bg-primary' : 'border-gray-300'
                    }`}>
                      {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>

                    {/* Form Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-paragraph text-sm font-medium text-foreground flex items-center gap-2">
                            {form.name}
                            {isGenerated && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Opened</span>
                            )}
                          </p>
                          <p className="font-paragraph text-xs text-foreground/60 mt-0.5">{form.description}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex-shrink-0 flex flex-col gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {form.url ? (
                            <>
                              {/* Auto-Fill & Download */}
                              <button
                                onClick={() => handleAutoFill(form)}
                                disabled={fillingForm === form.name}
                                className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1 disabled:opacity-50 whitespace-nowrap"
                              >
                                {fillingForm === form.name ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : filledForms.has(form.name) ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <Wand2 className="w-3 h-3" />
                                )}
                                {fillingForm === form.name
                                  ? 'Filling...'
                                  : filledForms.has(form.name)
                                    ? 'Filled!'
                                    : 'Auto-Fill'
                                }
                              </button>
                              {/* Open Blank */}
                              <button
                                onClick={() => handleGenerateForm(form, idx)}
                                disabled={isGenerating}
                                className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-1 disabled:opacity-50 whitespace-nowrap"
                              >
                                <Download className="w-3 h-3" />
                                {isGenerating ? 'Opening...' : 'Open Blank'}
                              </button>
                              {/* Upload & Fill fallback (shown after CORS error) */}
                              {fillErrors[form.name]?.includes('Upload') && (
                                <button
                                  onClick={() => handleUploadAndFill(form)}
                                  disabled={fillingForm === form.name}
                                  className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-1 disabled:opacity-50 whitespace-nowrap"
                                >
                                  <Upload className="w-3 h-3" />
                                  Upload & Fill
                                </button>
                              )}
                            </>
                          ) : form.submitMethod ? (
                            <>
                              {/* Upload & Fill for forms without direct URL */}
                              <button
                                onClick={() => handleUploadAndFill(form)}
                                disabled={fillingForm === form.name}
                                className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1 disabled:opacity-50 whitespace-nowrap"
                              >
                                {fillingForm === form.name ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : filledForms.has(form.name) ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <Upload className="w-3 h-3" />
                                )}
                                {fillingForm === form.name
                                  ? 'Filling...'
                                  : filledForms.has(form.name)
                                    ? 'Filled!'
                                    : 'Upload & Fill'
                                }
                              </button>
                              <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg inline-block text-center">
                                {form.submitMethod}
                              </span>
                            </>
                          ) : null}
                          {/* Error message */}
                          {fillErrors[form.name] && (
                            <div className="flex items-center gap-1 text-xs text-red-600 max-w-[180px]">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate" title={fillErrors[form.name]}>{fillErrors[form.name]}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bulk Actions */}
            {selectedForms.size > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
                {/* Bulk Auto-Fill */}
                {[...selectedForms].some(idx => detectedCourt.cityForms![idx]?.url) && (
                  <button
                    onClick={handleBulkAutoFill}
                    disabled={fillingForm !== null}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {fillingForm ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Wand2 className="w-4 h-4" />
                    )}
                    {fillingForm
                      ? `Filling: ${fillingForm}...`
                      : `Auto-Fill Selected (${[...selectedForms].filter(idx => detectedCourt.cityForms![idx]?.url).length})`
                    }
                  </button>
                )}
                {/* Open Blank Selected */}
                <button
                  onClick={() => {
                    if (!detectedCourt.cityForms) return;
                    selectedForms.forEach(idx => {
                      const form = detectedCourt.cityForms![idx];
                      if (form.url) {
                        window.open(form.url, '_blank');
                        setGeneratedForms(prev => new Set(prev).add(form.name));
                      }
                    });
                  }}
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Open Blank ({[...selectedForms].filter(idx => detectedCourt.cityForms![idx]?.url).length})
                </button>
                {/* Email Court */}
                <button
                  onClick={() => {
                    if (!detectedCourt.cityForms) return;
                    const formNames = [...selectedForms].map(idx => detectedCourt.cityForms![idx].name);
                    const courtEmail = detectedCourt.email || '';
                    setEmailTo(courtEmail);
                    setEmailSubject(`POA Forms - ${clientName}`);
                    setEmailBody(`Dear Sir/Madam,\n\nRE: POA Forms - ${clientName}\n\nPlease find the following forms submitted on behalf of our client:\n\n${formNames.map((n, i) => `${i + 1}. ${n}`).join('\n')}\n\nClient: ${clientName}\nAddress: ${clientProfile?.streetAddress || ''}, ${clientProfile?.city || ''}, ON ${clientProfile?.zipCode || ''}\nPhone: ${clientProfile?.phoneNumber || ''}\n\nShould you require any further information, please do not hesitate to contact our office.\n\nYours truly,\n\n${FIRM_INFO.paralegalName}\n${FIRM_INFO.firmName}\n${FIRM_INFO.phone}\n${FIRM_INFO.email}`);
                    setShowEmailCompose(true);
                    setEmailSent(false);
                    setEmailError('');
                  }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Email Court
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* In-App Email Compose */}
      {showEmailCompose && detectedCourt && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Compose Email
              </CardTitle>
              <button
                onClick={() => setShowEmailCompose(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* To */}
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">To</label>
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-paragraph focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              {/* Subject */}
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-paragraph focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              {/* Body */}
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">Message</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-paragraph font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
                />
              </div>

              {/* Filled Forms Available for Re-download */}
              {filledFormBlobs.size > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs font-medium text-blue-800 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Filled forms available — re-download to attach manually:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[...filledFormBlobs.entries()].map(([name, { blob, filename }]) => (
                      <button
                        key={name}
                        onClick={() => {
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = filename;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          URL.revokeObjectURL(url);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs bg-white text-blue-700 border border-blue-300 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        {filename}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Messages */}
              {emailSent && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                  Email sent successfully!
                </div>
              )}
              {emailError && (
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {emailError}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={async () => {
                    if (!emailTo || !emailSubject) return;
                    setSendingEmail(true);
                    setEmailError('');
                    try {
                      const selectedFormObjects = detectedCourt.cityForms
                        ? [...selectedForms].map(idx => detectedCourt.cityForms![idx])
                        : [];
                      const formNames = selectedFormObjects.map(f => f.name);
                      const formUrls = selectedFormObjects.map(f => f.url || '');

                      await sendCourtFormsEmail({
                        to: emailTo,
                        subject: emailSubject,
                        body: emailBody,
                        courtName: detectedCourt.city,
                        clientName,
                        formNames,
                        formUrls,
                        paralegalName: FIRM_INFO.paralegalName,
                      });

                      setEmailSent(true);
                    } catch (err) {
                      setEmailError(err instanceof Error ? err.message : 'Failed to send email');
                    } finally {
                      setSendingEmail(false);
                    }
                  }}
                  disabled={sendingEmail || !emailTo}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {sendingEmail ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {sendingEmail ? 'Sending...' : 'Send Email'}
                </button>
                <button
                  onClick={() => setShowEmailCompose(false)}
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Client Info Summary (for reference while working) */}
      {detectedCourt && (
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Client Information (for form filling)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-foreground/60">Full Name</span>
                <span className="font-medium">{clientName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-foreground/60">Phone</span>
                <span className="font-medium">{clientProfile?.phoneNumber || '—'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-foreground/60">Address</span>
                <span className="font-medium">
                  {[clientProfile?.streetAddress, clientProfile?.unitNumber && `Unit ${clientProfile.unitNumber}`].filter(Boolean).join(', ') || '—'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-foreground/60">City</span>
                <span className="font-medium">{clientProfile?.city || '—'}, ON {clientProfile?.zipCode || ''}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-foreground/60">Case Type</span>
                <span className="font-medium">{clientProfile?.caseType || '—'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-foreground/60">Court Deadline</span>
                <span className="font-medium">
                  {clientProfile?.courtDeadline
                    ? new Date(clientProfile.courtDeadline as string).toLocaleDateString()
                    : '—'
                  }
                </span>
              </div>
            </div>
            {clientProfile?.caseDescription && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-foreground/60 mb-1">Case Description</p>
                <p className="text-sm text-foreground">{clientProfile.caseDescription}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* No Court Detected - Helpful Message */}
      {!detectedCourt && (
        <Card>
          <CardContent className="py-8 text-center">
            <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <p className="font-paragraph text-foreground/70 mb-2">
              Select a court city above to see available forms and court information.
            </p>
            <p className="font-paragraph text-xs text-foreground/50">
              The client's city ({clientCity || 'not set'}) didn't match any Ontario POA court.
              You can select one manually from the dropdown, or update the client's profile.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
