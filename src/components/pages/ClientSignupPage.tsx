import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, Eye, EyeOff, Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useMember } from '@/integrations';
import { signup } from '@/lib/auth-service';

const ADMIN_PASSWORD = 'Hazar23!';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  adminPassword: string;
}

export default function ClientSignupPage() {
  useEffect(() => {
    document.title = 'Create Account | LegalAssist Client Portal';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Create your LegalAssist client account to access our secure portal, track your legal matters, and communicate with your paralegal team.');
    }
  }, []);

  const navigate = useNavigate();
  const { actions } = useMember();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    adminPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (): boolean => {
    setError('');

    // Check admin password first
    if (!formData.adminPassword || formData.adminPassword !== ADMIN_PASSWORD) {
      setError('Account creation is currently locked.');
      return false;
    }

    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }

    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Valid email address is required');
      return false;
    }

    if (!formData.password || formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Call signup service to create account and authenticate user
      const result = await signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      if (!result.success) {
        setError(result.message);
        setIsSubmitting(false);
        return;
      }

      // Store clientId and email in sessionStorage for intake form
      if (result.user?.clientId) {
        sessionStorage.setItem('clientId', result.user.clientId);
      }
      sessionStorage.setItem('signupEmail', formData.email);

      // Account created successfully and user is authenticated
      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        adminPassword: '',
      });

      // Redirect to intake form after successful signup
      setTimeout(() => {
        navigate('/client-intake');
      }, 1500);
    } catch (err) {
      setError('Failed to create account. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Pre-Launch Lock Notice */}
      <div className="w-full bg-amber-50 border-b-2 border-amber-200">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-4 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-paragraph text-amber-900 font-semibold">
              🚧 Account creation is temporarily locked while LegalAssist Paralegal Services prepares for launch.
            </p>
            <p className="font-paragraph text-amber-800 text-sm mt-1">
              Administrator access only at this time.
            </p>
          </div>
        </div>
      </div>

      {/* Signup Form Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          {!showSignupForm ? (
            // Initial state: Show buttons in the middle
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Get Started Today
                </h2>
                <p className="font-paragraph text-lg text-foreground/80 max-w-2xl">
                  Choose an option below to access your secure client portal.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  onClick={() => setShowSignupForm(true)}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 min-w-[200px]"
                >
                  Create an Account
                </Button>
                <Link to="/client-login" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/5 font-semibold py-3 px-8"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            // Form visible state
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success Message */}
                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-green-900 mb-1">Account Created Successfully!</h3>
                      <p className="font-paragraph text-green-800">Redirecting to your dashboard...</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-red-900 mb-1">Error</h3>
                      <p className="font-paragraph text-red-800">{error}</p>
                    </div>
                  </div>
                )}

                {/* Administrator Access Password */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <label htmlFor="adminPassword" className="block font-paragraph font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    Administrator Access Password *
                  </label>
                  <div className="relative">
                    <Input
                      id="adminPassword"
                      name="adminPassword"
                      type={showAdminPassword ? 'text' : 'password'}
                      value={formData.adminPassword}
                      onChange={handleInputChange}
                      placeholder="Enter administrator password"
                      className="border-blue-300 bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                    >
                      {showAdminPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="font-paragraph text-xs text-blue-700 mt-2">
                    This field is required to create an account during the pre-launch phase.
                  </p>
                </div>

                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block font-paragraph font-semibold text-foreground mb-2">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="border-gray-300"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block font-paragraph font-semibold text-foreground mb-2">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="border-gray-300"
                    required
                  />
                </div>

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
                      placeholder="At least 8 characters"
                      className="border-gray-300 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block font-paragraph font-semibold text-foreground mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="border-gray-300 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-3">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="w-5 h-5 mt-1 border-gray-300 rounded cursor-pointer"
                    required
                  />
                  <label htmlFor="agreeToTerms" className="font-paragraph text-foreground/80 cursor-pointer">
                    I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a> *
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>

                <p className="font-paragraph text-sm text-foreground/60 text-center">
                  Already have an account? <Link to="/client-login" className="text-primary hover:underline">Sign in here</Link>
                </p>
              </form>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-1">
              <div className="bg-pastelbeige/20 rounded-lg p-8 border border-pastelbeige sticky top-8">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Why Create an Account?
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">📁 Secure Document Upload</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Upload and store important documents securely in your personal client portal.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">📊 Case Tracking</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Monitor the status of your matter and stay informed of key developments.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">💬 Direct Communication</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Communicate securely with your licensed paralegal through protected messaging.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">🔒 Privacy & Confidentiality</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      All information is securely encrypted and handled in accordance with professional confidentiality obligations applicable to licensed paralegals in Ontario.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">⏰ 24/7 Access</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Access your documents and case information anytime, anywhere.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-pastelbeige">
                  <p className="font-paragraph text-sm text-foreground/80">
                    <strong>Need help?</strong> Contact our support team at <a href="mailto:support@legalassist.com" className="text-primary hover:underline">support@legalassist.com</a>
                  </p>
                </div>

                <Button
                  onClick={() => setShowSignupForm(false)}
                  variant="outline"
                  className="w-full mt-8 border-gray-300 text-foreground hover:bg-gray-50"
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
