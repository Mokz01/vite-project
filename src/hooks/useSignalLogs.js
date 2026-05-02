import { useState, useEffect } from "react";
import { STORAGE_KEY } from "../theme";
import { seedLocalLogs } from "../data/signals";

export function useSignalLogs() {
  const [logs, setLogs] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedLocalLogs));
        return seedLocalLogs;
      }
      return JSON.parse(stored);
    } catch {
      return seedLocalLogs;
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

  return { logs, addLog, updateLog, deleteLog };
}
