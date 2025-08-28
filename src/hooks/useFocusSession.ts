"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

const FOCUS_SESSION_MIN_DURATION = 25 * 60; // 25 minutes

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
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load initial state from localStorage on client side
    const storedTotalTime = safelyParseJSON(localStorage.getItem('focumonTotalTime'), 0);
    setTotalTime(storedTotalTime);

    const storedCompletedSessions = safelyParseJSON(localStorage.getItem('focumonCompletedSessions'), 0);
    setCompletedSessions(storedCompletedSessions);

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
      
      if (elapsed >= FOCUS_SESSION_MIN_DURATION) {
        const newCompletedSessions = completedSessions + 1;
        setCompletedSessions(newCompletedSessions);
        localStorage.setItem('focumonCompletedSessions', JSON.stringify(newCompletedSessions));
      }
    }
    
    setSessionTime(0);
    setSessionStartTime(null);
    localStorage.removeItem('focumonSessionStart');
  }, [sessionStartTime, totalTime, completedSessions]);

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

  return { totalTime, sessionTime, isRunning, startTimer, stopTimer, completedSessions };
}
