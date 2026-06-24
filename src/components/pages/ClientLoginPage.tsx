import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, Eye, EyeOff, ShieldCheck, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useMember } from '@/integrations';
import { login, getPostLoginRoute, verifyOTP, resendOTP } from '@/lib/auth-service';
import { EMAIL_PRIMARY } from '@/lib/contact';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function ClientLoginPage() {
  // SEO handled by AutoSEO component

  const navigate = useNavigate();
  const { actions } = useMember();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // 2FA state
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorEmail, setTwoFactorEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (): boolean => {
    setError('');

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Valid email address is required');
      return false;
    }

    if (!formData.password || formData.password.length < 1) {
      setError('Password is required');
      return false;
    }

    return true;
  };

  // Handle OTP digit input
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    // Auto-advance to next input
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length > 0) {
      const newDigits = [...otpDigits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || '';
      }
      setOtpDigits(newDigits);
      const nextEmpty = newDigits.findIndex(d => !d);
      otpInputRefs.current[nextEmpty >= 0 ? nextEmpty : 5]?.focus();
    }
  };

  // Finalize login after successful auth
  const finalizeLogin = (result: any) => {
    const profileRowId = result.user?._id || result.user?.clientId;
    if (profileRowId) {
      sessionStorage.setItem('clientId', profileRowId);
    }
    setSuccess(true);
    setFormData({ email: '', password: '', rememberMe: false });
    setTimeout(() => {
      navigate(getPostLoginRoute(result.user));
    }, 1500);
  };

  // Handle 2FA OTP verification
  const handleVerifyOTP = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const code = otpDigits.join('');
    if (code.length !== 6) {
      setError('Please enter the full 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const result = await verifyOTP(twoFactorEmail, code);
      if (!result.success) {
        setError(result.message);
        setIsVerifying(false);
        return;
      }
      finalizeLogin(result);
    } catch (err) {
      setError('Failed to verify code. Please try again.');
      setIsVerifying(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    setIsResending(true);
    setError('');

    try {
      const result = await resendOTP(twoFactorEmail);
      if (result.success) {
        setOtpDigits(['', '', '', '', '', '']);
        otpInputRefs.current[0]?.focus();
        setResendCooldown(30);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (!result.success) {
        setError(result.message);
        setIsSubmitting(false);
        return;
      }

      // 2FA required — switch to OTP verification screen
      if (result.requires2FA) {
        setTwoFactorEmail(result.twoFactorEmail || formData.email);
        setShow2FA(true);
        setIsSubmitting(false);
        setResendCooldown(30);
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
        return;
      }

      // No 2FA — finalize login directly
      finalizeLogin(result);
    } catch (err) {
      setError('Failed to log in. Please check your email and password and try again.');
      setIsSubmitting(false);
    }
  };

  // Mask email for display: j***@example.com
  const maskedEmail = twoFactorEmail
    ? twoFactorEmail.replace(/^(.{1,2})(.*)(@.*)$/, (_, a, b, c) => a + '*'.repeat(Math.min(b.length, 5)) + c)
    : '';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              {show2FA ? 'Verify Your Identity' : 'Client Login'}
            </h1>
            <p className="font-paragraph text-lg text-foreground/80">
              {show2FA
                ? 'Enter the verification code sent to your email to complete sign-in.'
                : 'Sign in to your account to access your secure client portal. Upload documents, track your case, and communicate with our legal team.'}
            </p>
          </div>
        </div>
      </section>

      {/* Login / 2FA Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Success Message (shared) */}
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3 mb-6">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading font-bold text-green-900 mb-1">Login Successful!</h3>
                    <p className="font-paragraph text-green-800">You have been authenticated. Redirecting to your dashboard...</p>
                  </div>
                </div>
              )}

              {/* Error Message (shared) */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading font-bold text-red-900 mb-1">Error</h3>
                    <p className="font-paragraph text-red-800">{error}</p>
                  </div>
                </div>
              )}

              {/* ===== 2FA VERIFICATION SCREEN ===== */}
              {show2FA && !success ? (
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                      Two-Factor Authentication
                    </h2>
                    <p className="font-paragraph text-foreground/70">
                      We sent a 6-digit verification code to <strong>{maskedEmail}</strong>. Enter it below to continue.
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOTP} className="space-y-6">
                    {/* OTP Input — 6 individual boxes */}
                    <div className="flex justify-center gap-3">
                      {otpDigits.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => { otpInputRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          onPaste={i === 0 ? handleOtpPaste : undefined}
                          className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg
                                     focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none
                                     transition-colors"
                          aria-label={`Digit ${i + 1}`}
                        />
                      ))}
                    </div>

                    {/* Verify Button */}
                    <Button
                      type="submit"
                      disabled={isVerifying || otpDigits.join('').length !== 6}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                    >
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      {isVerifying ? 'Verifying...' : 'Verify & Sign In'}
                    </Button>

                    {/* Resend / Back */}
                    <div className="flex items-center justify-between text-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setShow2FA(false);
                          setOtpDigits(['', '', '', '', '', '']);
                          setError('');
                        }}
                        className="font-paragraph text-foreground/60 hover:text-foreground transition-colors"
                      >
                        Back to login
                      </button>

                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={resendCooldown > 0 || isResending}
                        className="font-paragraph text-primary hover:text-primary/80 transition-colors disabled:text-foreground/40 flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        {isResending
                          ? 'Sending...'
                          : resendCooldown > 0
                            ? `Resend code (${resendCooldown}s)`
                            : 'Resend code'}
                      </button>
                    </div>

                    <p className="font-paragraph text-xs text-foreground/50 text-center">
                      The code expires in 5 minutes. Check your spam folder if you don&apos;t see the email.
                    </p>
                  </form>
                </div>
              ) : !success ? (
                /* ===== NORMAL LOGIN FORM ===== */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block font-paragraph font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="border-gray-300"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block font-paragraph font-semibold text-foreground mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="border-gray-300 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                      >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 border-gray-300 rounded cursor-pointer"
                      />
                      <label htmlFor="rememberMe" className="font-paragraph text-foreground/80 cursor-pointer">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="font-paragraph text-primary hover:underline text-sm">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                  >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </Button>

                  <p className="font-paragraph text-sm text-foreground/60 text-center">
                    Don&apos;t have an account? <Link to="/client-signup" className="text-primary hover:underline">Create one here</Link>
                  </p>
                </form>
              ) : null}
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1">
              <div className="bg-pastelbeige/20 rounded-lg p-8 border border-pastelbeige sticky top-8">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Client Portal Benefits
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Secure Document Upload</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Upload and store important documents securely in your personal portal.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Case Tracking</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Monitor the progress of your case and stay updated on important milestones.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Direct Communication</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Communicate directly with your legal team through secure messaging.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">Complete Privacy</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      All information is encrypted and handled securely in accordance with our professional obligations.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">24/7 Access</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Access your documents and case information anytime, anywhere.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-pastelbeige">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Need help?</strong> Contact our support team at <a href={`mailto:${EMAIL_PRIMARY}`} className="text-primary hover:underline">{EMAIL_PRIMARY}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
