import { lazy } from 'react';

// Traffic & Provincial Offences Pages
const TrafficTicketsPage = lazy(() => import('@/components/pages/TrafficTicketsPage'));
const SpeedingTicketDefencePage = lazy(() => import('@/components/pages/SpeedingTicketDefencePage'));
const CarelessDrivingDefencePage = lazy(() => import('@/components/pages/CarelessDrivingDefencePage'));
const StuntDrivingDefencePage = lazy(() => import('@/components/pages/StuntDrivingDefencePage'));
const DistractedDrivingDefencePage = lazy(() => import('@/components/pages/DistractedDrivingDefencePage'));
const RedLightDefencePage = lazy(() => import('@/components/pages/RedLightDefencePage'));
const NoInsuranceDefencePage = lazy(() => import('@/components/pages/NoInsuranceDefencePage'));
const DemeritPointsGuidePage = lazy(() => import('@/components/pages/DemeritPointsGuidePage'));
const G1G2ViolationsPage = lazy(() => import('@/components/pages/G1G2ViolationsPage'));
const CommercialVehicleViolationsPage = lazy(() => import('@/components/pages/CommercialVehicleViolationsPage'));
const HOVLaneViolationsPage = lazy(() => import('@/components/pages/HOVLaneViolationsPage'));
const StopSignTicketPage = lazy(() => import('@/components/pages/StopSignTicketPage'));
const StreetRacingPage = lazy(() => import('@/components/pages/StreetRacingPage'));
const FailToYieldPage = lazy(() => import('@/components/pages/FailToYieldPage'));
const UnsafeLaneChangePage = lazy(() => import('@/components/pages/UnsafeLaneChangePage'));
const FollowingTooCloselyPage = lazy(() => import('@/components/pages/FollowingTooCloselyPage'));
const DrivingWhileSuspendedPage = lazy(() => import('@/components/pages/DrivingWhileSuspendedPage'));
const SchoolZoneSpeedingPage = lazy(() => import('@/components/pages/SchoolZoneSpeedingPage'));
const SeatbeltViolationsPage = lazy(() => import('@/components/pages/SeatbeltViolationsPage'));
const ProvincialOffencesPage = lazy(() => import('@/components/pages/ProvincialOffencesPage'));
const MunicipalBylawPage = lazy(() => import('@/components/pages/MunicipalBylawPage'));

// Newly added Provincial Offences pages (May 2026)
const FailToStopSchoolBusPage = lazy(() => import('@/components/pages/FailToStopSchoolBusPage'));
const DisobeySignPage = lazy(() => import('@/components/pages/DisobeySignPage'));
const FailToSurrenderPage = lazy(() => import('@/components/pages/FailToSurrenderPage'));
const TrespassChargesPage = lazy(() => import('@/components/pages/TrespassChargesPage'));
const LiquorLicenceActPage = lazy(() => import('@/components/pages/LiquorLicenceActPage'));
const CannabisControlOffencePage = lazy(() => import('@/components/pages/CannabisControlOffencePage'));
const SmokeFreeOntarioOffencePage = lazy(() => import('@/components/pages/SmokeFreeOntarioOffencePage'));
const OffRoadVehiclePage = lazy(() => import('@/components/pages/OffRoadVehiclePage'));

export const trafficRoutes = [
  { path: '/services/traffic-tickets', element: TrafficTicketsPage },
  { path: '/services/speeding-ticket-defence', element: SpeedingTicketDefencePage },
  { path: '/services/careless-driving-defence', element: CarelessDrivingDefencePage },
  { path: '/services/stunt-driving-defence', element: StuntDrivingDefencePage },
  { path: '/services/distracted-driving', element: DistractedDrivingDefencePage },
  { path: '/services/red-light-tickets', element: RedLightDefencePage },
  { path: '/services/no-insurance-defence', element: NoInsuranceDefencePage },
  { path: '/services/demerit-points-guide', element: DemeritPointsGuidePage },
  { path: '/services/g1-g2-violations', element: G1G2ViolationsPage },
  { path: '/services/commercial-vehicle-violations', element: CommercialVehicleViolationsPage },
  { path: '/services/hov-lane-violations', element: HOVLaneViolationsPage },
  { path: '/services/stop-sign-ticket', element: StopSignTicketPage },
  { path: '/services/street-racing', element: StreetRacingPage },
  { path: '/services/fail-to-yield', element: FailToYieldPage },
  { path: '/services/unsafe-lane-change', element: UnsafeLaneChangePage },
  { path: '/services/following-too-closely', element: FollowingTooCloselyPage },
  { path: '/services/driving-while-suspended', element: DrivingWhileSuspendedPage },
  { path: '/services/school-zone-speeding', element: SchoolZoneSpeedingPage },
  { path: '/services/seatbelt-violations', element: SeatbeltViolationsPage },
  { path: '/services/provincial-offences', element: ProvincialOffencesPage },
  { path: '/services/municipal-bylaw', element: MunicipalBylawPage },
  // Newly added Provincial Offences (May 2026)
  { path: '/services/fail-to-stop-school-bus', element: FailToStopSchoolBusPage },
  { path: '/services/disobey-sign', element: DisobeySignPage },
  { path: '/services/fail-to-surrender', element: FailToSurrenderPage },
  { path: '/services/trespass-to-property', element: TrespassChargesPage },
  { path: '/services/liquor-licence-offences', element: LiquorLicenceActPage },
  { path: '/services/cannabis-control-offences', element: CannabisControlOffencePage },
  { path: '/services/smoke-free-ontario-offences', element: SmokeFreeOntarioOffencePage },
  { path: '/services/off-road-vehicle-offences', element: OffRoadVehiclePage },
];
