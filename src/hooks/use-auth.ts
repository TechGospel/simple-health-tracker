import { useState, useEffect, useCallback, useRef } from "react";
import type { UserSession, Medication, VitalSigns } from "@shared/schema";

const SESSION_KEY = "healthtracka_session";
const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds
const WARNING_BEFORE_LOGOUT = 60 * 1000; // 1 minute warning before logout

export function useAuth() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInactivityWarning, setShowInactivityWarning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setShowInactivityWarning(false);
    clearTimers();
  }, [clearTimers]);

  const startTimers = useCallback(() => {
    clearTimers();
    setShowInactivityWarning(false);

    warningTimeoutRef.current = setTimeout(() => {
      setShowInactivityWarning(true);
    }, INACTIVITY_TIMEOUT - WARNING_BEFORE_LOGOUT);

    timeoutRef.current = setTimeout(() => {
      logout();
    }, INACTIVITY_TIMEOUT);
  }, [clearTimers, logout]);

  const login = useCallback((username: string) => {
    const session: UserSession = {
      username,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  }, []);

  const dismissWarning = useCallback(() => {
    setShowInactivityWarning(false);
    startTimers();
  }, [startTimers]);

  useEffect(() => {
    const savedSession = localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession) as UserSession;
        setUser(session);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!user) {
      clearTimers();
      return;
    }

    const handleActivity = () => {
      startTimers();
    };

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    
    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    startTimers();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimers();
    };
  }, [user, startTimers, clearTimers]);

  return {
    user,
    isLoading,
    login,
    logout,
    showInactivityWarning,
    dismissWarning,
  };
}

export function useMedications(username: string | undefined) {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = username ? `healthtracka_medications_${username}` : null;

  useEffect(() => {
    if (!storageKey) {
      setMedications([]);
      setIsLoading(false);
      return;
    }

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setMedications(JSON.parse(saved));
      } catch {
        setMedications([]);
      }
    }
    setIsLoading(false);
  }, [storageKey]);

  const addMedication = useCallback((medication: Omit<Medication, "id">) => {
    if (!storageKey) return;

    const newMedication: Medication = {
      ...medication,
      id: crypto.randomUUID(),
    };
    
    setMedications((prev) => {
      const updated = [...prev, newMedication];
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  }, [storageKey]);

  const removeMedication = useCallback((id: string) => {
    if (!storageKey) return;

    setMedications((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  }, [storageKey]);

  return {
    medications,
    isLoading,
    addMedication,
    removeMedication,
  };
}

export function useVitals(username: string | undefined) {
  const [vitals, setVitals] = useState<VitalSigns[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = username ? `healthtracka_vitals_${username}` : null;

  useEffect(() => {
    if (!storageKey) {
      setVitals([]);
      setIsLoading(false);
      return;
    }

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as VitalSigns[];
        setVitals(parsed.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ));
      } catch {
        setVitals([]);
      }
    }
    setIsLoading(false);
  }, [storageKey]);

  const addVitals = useCallback((vitalEntry: Omit<VitalSigns, "id" | "timestamp">) => {
    if (!storageKey) return;

    const newEntry: VitalSigns = {
      ...vitalEntry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    
    setVitals((prev) => {
      const updated = [newEntry, ...prev];
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  }, [storageKey]);

  return {
    vitals,
    isLoading,
    addVitals,
  };
}
