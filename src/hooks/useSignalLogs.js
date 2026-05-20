import { useState, useEffect } from "react";
import { STORAGE_KEY } from "../theme";

export function useSignalLogs() {
  const [logs, setLogs] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        return [];
      }
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch {
      console.warn("localStorage write failed");
    }
  }, [logs]);

  const addLog = (entry) => {
    const newEntry = {
      ...entry,
      id: `l${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      type: "Local",
      status: "Pending",
    };
    setLogs((prev) => [newEntry, ...prev]);
    return newEntry;
  };

  const updateLog = (id, changes) => {
    setLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, ...changes } : log)),
    );
  };

  const deleteLog = (id) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  };

  const resetLogs = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLogs([]);
  };

  return { logs, addLog, updateLog, deleteLog, resetLogs };
}