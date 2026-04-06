import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function BackToDashboard() {
  const navigate = useNavigate();
  return (
    <div className="bg-secondary text-white px-4 py-2">
      <button
        onClick={() => navigate('/paralegal-dashboard')}
        className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Dashboard
      </button>
    </div>
  );
}
