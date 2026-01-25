import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { resetPassword } from '@/lib/auth-service';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  useEffect(() => {
    if (!token || !email) {
      setInvalidToken(true);
    }
  }, [token, email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    setError('');

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !token || !email) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = await resetPassword(email, token, formData.password);

      if (!result.success) {
        setError(result.message);
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      setFormData({
        password: '',
        confirmPassword: '',
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/client-login');
      }, 3000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (invalidToken) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
                Invalid Reset Link
              </h1>
              <p className="font-paragraph text-lg text-foreground/80">
                The password reset link is invalid or has expired.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="max-w-md mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex gap-4 mb-8">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-red-900 mb-2">Invalid or Expired Link</h3>
                  <p className="font-paragraph text-red-800 text-sm mb-4">
                    This password reset link is no longer valid. Please request a new one.
                  </p>
                  <Link
                    to="/forgot-password"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    Request New Reset Link
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-pastelbeige/30 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Create New Password
            </h1>
            <p className="font-paragraph text-lg text-foreground/80">
              Enter your new password below to reset your account access.
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
                    <h3 className="font-heading font-bold text-green-900 mb-1">Password Reset Successful!</h3>
                    <p className="font-paragraph text-green-800 text-sm">
                      Your password has been reset. Redirecting to login...
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

              {/* New Password */}
              <div>
                <label htmlFor="password" className="block font-paragraph font-semibold text-foreground mb-2">
                  New Password *
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your new password"
                    className="border-gray-300 pr-10"
                    required
                    disabled={success}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
                <p className="font-paragraph text-xs text-foreground/60 mt-1">
                  Must be at least 6 characters long
                </p>
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
                    placeholder="Confirm your new password"
                    className="border-gray-300 pr-10"
                    required
                    disabled={success}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                  >
                    {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || success}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
              >
                {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
              </Button>

              {/* Back to Login Link */}
              <div className="text-center">
                <Link
                  to="/client-login"
                  className="font-paragraph text-primary hover:underline text-sm"
                >
                  Back to Login
                </Link>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-pastelbeige/20 rounded-lg p-6">
                <h3 className="font-heading font-bold text-foreground mb-4">Password Requirements</h3>
                <ul className="space-y-2 font-paragraph text-foreground/80 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>At least 6 characters long</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Passwords must match</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Use a strong, unique password</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
