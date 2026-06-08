/**
 * Route-level role guards.
 *
 * Wrap any route component in adminRoutes.ts with withRoleGate() to
 * enforce who may render it. This exists because individual pages were
 * inconsistently gated — several admin pages (client files, trust
 * accounting, conflict search, grant-admin) historically had NO gate at
 * all and were reachable by any user who typed the URL.
 *
 * Gating here, at the single point where routes are declared, means a
 * new admin page is protected by default the moment it is registered.
 *
 * NOTE: this is a client-side gate. True data protection also depends on
 * Wix CMS collection permissions / server-side checks — keep those tight.
 *
 * Roles:
 *   'paralegal'            — admins/paralegals only. Students are sent to
 *                            their own dashboard, clients to theirs.
 *   'student-or-paralegal' — staff routes students may also use
 *                            (student dashboard, new-file intake, and the
 *                            document workflow, which self-scopes for
 *                            students — see DocumentWorkflowPage F-J).
 */

import { useEffect, type ComponentType } from 'react';
import { getCurrentUser } from '@/lib/auth-service';

export type GateRole = 'paralegal' | 'student-or-paralegal';

function evaluate(role: GateRole): { ok: boolean; redirect: string } {
  let u: any = null;
  try { u = getCurrentUser(); } catch { /* treat as anonymous */ }
  if (!u) return { ok: false, redirect: '/login' };

  const student = u.userType === 'paralegal_student';
  const paralegal = u.isAdmin === true || u.userType === 'paralegal' || u.userType === 'admin';

  if (role === 'paralegal') {
    // Student check FIRST so a mis-set isAdmin flag can never widen a
    // student account's access.
    if (student) return { ok: false, redirect: '/student-dashboard' };
    if (paralegal) return { ok: true, redirect: '' };
    return { ok: false, redirect: '/client-dashboard' };
  }

  // 'student-or-paralegal'
  if (student || paralegal) return { ok: true, redirect: '' };
  return { ok: false, redirect: '/client-dashboard' };
}

export function withRoleGate<P extends object>(
  Component: ComponentType<P>,
  role: GateRole = 'paralegal'
): ComponentType<P> {
  function Gated(props: P) {
    const { ok, redirect } = evaluate(role);
    useEffect(() => {
      if (!ok) window.location.href = redirect;
    }, [ok, redirect]);
    // Render nothing while redirecting so no protected data is fetched.
    if (!ok) return null;
    return <Component {...props} />;
  }
  Gated.displayName = `withRoleGate(${(Component as any).displayName || (Component as any).name || 'Component'})`;
  return Gated;
}
