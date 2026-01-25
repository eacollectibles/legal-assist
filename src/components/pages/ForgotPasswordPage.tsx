import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { requestPasswordReset } from '@/lib/auth-service';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (): boolean => {
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = await requestPasswordReset(email);

      if (!result.success) {
        setError(result.message);
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      setEmail('');

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/client-login');
      }, 3000);
    } catch (err) {
      setError('Failed to process password reset request. Please try again.');
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
              Reset Your Password
            </h1>
            <p className="font-paragraph text-lg text-foreground/80">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading font-bold text-green-900 mb-1">Check Your Email</h3>
                    <p className="font-paragraph text-green-800 text-sm">
                      If an account exists with this email, you will receive a password reset link. Redirecting to login...
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading font-bold text-red-900 mb-1">Error</h3>
                    <p className="font-paragraph text-red-800 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block font-paragraph font-semibold text-foreground mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="border-gray-300"
                  required
                  disabled={success}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || success}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
              >
                {isSubmitting ? 'Sending Reset Link...' : 'Send Reset Link'}
              </Button>

              {/* Back to Login Link */}
              <div className="text-center">
                <Link
                  to="/client-login"
                  className="inline-flex items-center gap-2 font-paragraph text-primary hover:underline text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-pastelbeige/20 rounded-lg p-6">
                <h3 className="font-heading font-bold text-foreground mb-4">Password Reset Instructions</h3>
                <ul className="space-y-3 font-paragraph text-foreground/80 text-sm">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">1.</span>
                    <span>Enter the email address associated with your account</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">2.</span>
                    <span>Check your email for a password reset link</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">3.</span>
                    <span>Click the link to create a new password</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">4.</span>
                    <span>Log in with your new password</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="font-paragraph text-sm text-foreground/80">
                  <strong>Still need help?</strong> Contact our support team at{' '}
                  <a href="mailto:support@legalassist.com" className="text-primary hover:underline">
                    support@legalassist.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
