type TossWindow = Window & {
  AppsInToss?: {
    registerApp?: (options?: Record<string, unknown>) => void;
    storage?: {
      getItem?: (key: string) => Promise<string | null> | string | null;
      setItem?: (key: string, value: string) => Promise<void> | void;
    };
  };
};

export function registerMiniApp(): void {
  try {
    const appsInToss = (window as TossWindow).AppsInToss;
    appsInToss?.registerApp?.({ name: "hidden-chameleon" });
  } catch {
    // Browser-only fallback keeps local development independent of the SDK.
  }
}

export async function tossGetItem(key: string): Promise<string | null> {
  const storage = (window as TossWindow).AppsInToss?.storage;
  if (!storage?.getItem) return null;
  return await storage.getItem(key);
}

export async function tossSetItem(key: string, value: string): Promise<void> {
  const storage = (window as TossWindow).AppsInToss?.storage;
  if (!storage?.setItem) return;
  await storage.setItem(key, value);
}
