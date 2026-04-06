/**
 * Thin wrapper components for heavy standalone pages.
 * Pre-caches modules on file load so they're ready when the user clicks.
 * Falls back to on-demand loading with generous timeout.
 */
import { useState, useEffect, ComponentType } from 'react';

// ============================================================
// MODULE CACHE — start loading immediately when this file is imported
// so the modules are ready by the time the user clicks a tab
// ============================================================
const moduleCache: Record<string, {
  promise: Promise<{ default: ComponentType<any> }>;
  resolved?: ComponentType<any>;
}> = {};

function preload(key: string, loader: () => Promise<{ default: ComponentType<any> }>) {
  if (!moduleCache[key]) {
    const promise = loader();
    moduleCache[key] = { promise };
    promise.then((mod) => {
      moduleCache[key].resolved = mod.default;
    }).catch((err) => {
      console.warn(`[Preload] ${key} failed:`, err);
    });
  }
}

// Start preloading all 4 pages right now (when DynamicModules.tsx is first imported)
preload('clientfiles', () => import('@/components/pages/ClientFileManagementPage'));
preload('docworkflow', () => import('@/components/pages/DocumentWorkflowPage'));
preload('meetings', () => import('@/components/pages/MeetingDashboardPage'));
preload('uploadtokens', () => import('@/components/pages/UploadTokenManagementPage'));

// ============================================================
// DYNAMIC LOADER COMPONENT
// ============================================================
function DynamicLoader({
  cacheKey,
  moduleName,
  props = {}
}: {
  cacheKey: string;
  moduleName: string;
  props?: Record<string, any>;
}) {
  // Check if already resolved from preload cache
  const cached = moduleCache[cacheKey]?.resolved;
  const [Loaded, setLoaded] = useState<ComponentType<any> | null>(cached || null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (Loaded) return; // already resolved

    let cancelled = false;

    // 60 second timeout — these are huge files in dev mode
    const timeout = setTimeout(() => {
      if (!cancelled && !Loaded) {
        setError(`Timed out loading ${moduleName} — try refreshing the page`);
      }
    }, 60000);

    const entry = moduleCache[cacheKey];
    if (entry) {
      entry.promise
        .then((mod) => {
          if (!cancelled) setLoaded(() => mod.default);
        })
        .catch((err) => {
          if (!cancelled) setError(err?.message || 'Import failed');
        })
        .finally(() => clearTimeout(timeout));
    } else {
      setError('Module not found');
      clearTimeout(timeout);
    }

    return () => { cancelled = true; clearTimeout(timeout); };
  }, [cacheKey]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-red-600 font-bold text-lg">{moduleName} — failed to load</p>
        <p className="text-sm text-gray-500">{error}</p>
        <button
          onClick={() => {
            setError('');
            setLoaded(null);
            // Re-trigger preload
            delete moduleCache[cacheKey];
            const loaders: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
              clientfiles: () => import('@/components/pages/ClientFileManagementPage'),
              docworkflow: () => import('@/components/pages/DocumentWorkflowPage'),
              meetings: () => import('@/components/pages/MeetingDashboardPage'),
              uploadtokens: () => import('@/components/pages/UploadTokenManagementPage'),
            };
            if (loaders[cacheKey]) preload(cacheKey, loaders[cacheKey]);
          }}
          className="mt-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!Loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <span className="ml-2 text-sm text-gray-400">Loading {moduleName}...</span>
      </div>
    );
  }

  return <Loaded {...props} />;
}

// ---- Exported wrapper components ----

export function ClientFilesModule() {
  return <DynamicLoader cacheKey="clientfiles" moduleName="Client Files" props={{ embedded: true }} />;
}

export function DocWorkflowModule() {
  return <DynamicLoader cacheKey="docworkflow" moduleName="Document Workflow" props={{ embedded: true }} />;
}

export function MeetingsModule() {
  return <DynamicLoader cacheKey="meetings" moduleName="Meetings" props={{ embedded: true }} />;
}

export function UploadTokensModule() {
  return <DynamicLoader cacheKey="uploadtokens" moduleName="Upload Links" props={{ embedded: true }} />;
}
