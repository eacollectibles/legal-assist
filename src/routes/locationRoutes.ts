import { lazy } from 'react';

// Location Pages
const LondonParalegalPage = lazy(() => import('@/components/pages/LondonParalegalPage'));
const StThomasParalegalPage = lazy(() => import('@/components/pages/StThomasParalegalPage'));
const WoodstockParalegalPage = lazy(() => import('@/components/pages/WoodstockParalegalPage'));
const StrathroyChathamParalegalPage = lazy(() => import('@/components/pages/StrathroyChathamParalegalPage'));
const IngersollParalegalPage = lazy(() => import('@/components/pages/IngersollParalegalPage'));
const TillsonburgParalegalPage = lazy(() => import('@/components/pages/TillsonburgParalegalPage'));
const AylmerParalegalPage = lazy(() => import('@/components/pages/AylmerParalegalPage'));
const KitchenerParalegalPage = lazy(() => import('@/components/pages/KitchenerParalegalPage'));
const CambridgeParalegalPage = lazy(() => import('@/components/pages/CambridgeParalegalPage'));
const GuelphParalegalPage = lazy(() => import('@/components/pages/GuelphParalegalPage'));
const BrantfordParalegalPage = lazy(() => import('@/components/pages/BrantfordParalegalPage'));
const StratfordParalegalPage = lazy(() => import('@/components/pages/StratfordParalegalPage'));
const SarniaParalegalPage = lazy(() => import('@/components/pages/SarniaParalegalPage'));
const WindsorParalegalPage = lazy(() => import('@/components/pages/WindsorParalegalPage'));
const ChathamKentParalegalPage = lazy(() => import('@/components/pages/ChathamKentParalegalPage'));
const LeamingtonParalegalPage = lazy(() => import('@/components/pages/LeamingtonParalegalPage'));

export const locationRoutes = [
  { path: '/london-paralegal', element: LondonParalegalPage },
  { path: '/st-thomas-paralegal', element: StThomasParalegalPage },
  { path: '/woodstock-paralegal', element: WoodstockParalegalPage },
  { path: '/strathroy-chatham-paralegal', element: StrathroyChathamParalegalPage },
  { path: '/ingersoll-paralegal', element: IngersollParalegalPage },
  { path: '/tillsonburg-paralegal', element: TillsonburgParalegalPage },
  { path: '/aylmer-paralegal', element: AylmerParalegalPage },
  { path: '/locations/kitchener', element: KitchenerParalegalPage },
  { path: '/locations/cambridge', element: CambridgeParalegalPage },
  { path: '/locations/guelph', element: GuelphParalegalPage },
  { path: '/locations/brantford', element: BrantfordParalegalPage },
  { path: '/locations/stratford', element: StratfordParalegalPage },
  { path: '/locations/sarnia', element: SarniaParalegalPage },
  { path: '/locations/windsor', element: WindsorParalegalPage },
  { path: '/locations/chatham-kent', element: ChathamKentParalegalPage },
  { path: '/locations/leamington', element: LeamingtonParalegalPage },
];
