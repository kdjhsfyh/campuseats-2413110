import { useEffect, useState } from "react";

export function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function fetchVendors() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/vendors.json");

        if (!response.ok) {
          throw new Error("Failed to load vendors.");
        }

        const data = await response.json();
        setVendors(data);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    }

    fetchVendors();
  }, [reloadKey]);

  function reload() {
    setReloadKey(reloadKey + 1);
  }

  return { vendors, loading, error, reload };
}
