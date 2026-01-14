import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useMember } from '@/integrations';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function ClientLoginPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Use Wix Members authentication
      // Note: The Wix login action handles authentication via OAuth/redirect flow
      // Email and password would be handled by Wix's login UI
      await actions.login();

      setSuccess(true);
      setFormData({
        email: '',
        password: '',
        rememberMe: false,
      });

      // The login action will automatically redirect after successful authentication
      // The MemberProvider handles the redirect back to the current page
    } catch (err) {
      setError('Failed to log in. Please check your email and password and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Client Login
            </h1>
            <p className="font-paragraph text-lg text-foreground/80">
              Sign in to your account to access your secure client portal. Upload documents, track your case, and communicate with our legal team.
            </p>
          </div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success Message */}
                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-green-900 mb-1">Login Successful!</h3>
                      <p className="font-paragraph text-green-800">You have been authenticated. Redirecting to your dashboard...</p>
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
                  <a href="#" className="font-paragraph text-primary hover:underline text-sm">
                    Forgot password?
                  </a>
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
                  Don't have an account? <Link to="/client-signup" className="text-primary hover:underline">Create one here</Link>
                </p>
              </form>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1">
              <div className="bg-pastelbeige/20 rounded-lg p-8 border border-pastelbeige sticky top-8">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Client Portal Benefits
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">📁 Secure Document Upload</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Upload and store important documents securely in your personal portal.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">📊 Case Tracking</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Monitor the progress of your case and stay updated on important milestones.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">💬 Direct Communication</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      Communicate directly with your legal team through secure messaging.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-foreground mb-2">🔒 Complete Privacy</h4>
                    <p className="font-paragraph text-foreground/80 text-sm">
                      All information is encrypted and protected by solicitor-client privilege.
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
