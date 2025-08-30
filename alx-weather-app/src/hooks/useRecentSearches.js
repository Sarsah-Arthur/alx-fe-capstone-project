// src/hooks/useRecentSearches.js
import { useState, useEffect } from "react";

const STORAGE_KEY = "recentSearches_v1";

export default function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setRecentSearches(parsed);
    } catch (e) {
      console.warn("Failed to read recent searches from localStorage", e);
      setRecentSearches([]);
    }
  }, []);

  // add a search (keeps newest first, case-insensitive dedupe, max 10)
  const addSearch = (city) => {
    if (!city || !city.trim()) return;
    const normalized = city.trim();

    setRecentSearches((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== normalized.toLowerCase());
      const updated = [normalized, ...filtered].slice(0, 10);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save recent searches", e);
      }
      return updated;
    });
  };

  // optional: clear all recent searches
  const clearSearches = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear recent searches", e);
    }
    setRecentSearches([]);
  };

  return { recentSearches, addSearch, clearSearches };
}
