"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

const safelyParseJSON = (json: string | null, defaultValue: any) => {
  if (json === null) return defaultValue;
  try {
    return JSON.parse(json);
  } catch (error) {
    return defaultValue;
  }
};

export function useFocusSession() {
  const [totalTime, setTotalTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load initial state from localStorage on client side
    const storedTotalTime = safelyParseJSON(localStorage.getItem('focumonTotalTime'), 0);
    setTotalTime(storedTotalTime);

    const storedSessionStart = safelyParseJSON(localStorage.getItem('focumonSessionStart'), null);
    if (storedSessionStart) {
      setSessionStartTime(storedSessionStart);
      setIsRunning(true);
    }
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (sessionStartTime) {
      const now = Date.now();
      const elapsed = (now - sessionStartTime) / 1000;
      const newTotal = totalTime + elapsed;
      setTotalTime(newTotal);
      localStorage.setItem('focumonTotalTime', JSON.stringify(newTotal));
    }
    
    setSessionTime(0);
    setSessionStartTime(null);
    localStorage.removeItem('focumonSessionStart');
  }, [sessionStartTime, totalTime]);

  const startTimer = useCallback(() => {
    if (isRunning) return;
    const now = Date.now();
    setSessionStartTime(now);
    localStorage.setItem('focumonSessionStart', JSON.stringify(now));
    setIsRunning(true);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && sessionStartTime) {
      intervalRef.current = setInterval(() => {
        setSessionTime((Date.now() - sessionStartTime) / 1000);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, sessionStartTime]);

  return { totalTime, sessionTime, isRunning, startTimer, stopTimer };
}
