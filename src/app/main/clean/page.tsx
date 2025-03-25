'use client';

import { useState } from 'react';

export default function CleanupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function cleanupDuplicates() {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/cleanup-donations/simple', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to clean up duplicates');
      }
      
      setResult(data);
    } catch (err) {
      console.error('Error cleaning up duplicates:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Donation Cleanup</h1>
      
      <div className="mb-4 p-4 border rounded bg-amber-50">
        <p className="mb-2">
          Use this tool to clean up duplicate donations with the same transaction ID.
        </p>
        <button
          onClick={cleanupDuplicates}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Cleaning...' : 'Clean Duplicates'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {result && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p className="font-semibold">{result.message}</p>
          {result.count > 0 ? (
            <div className="mt-2">
              <p>Kept donation: {result.kept}</p>
              <p>Deleted {result.count} duplicate(s)</p>
              {result.deleted && (
                <p className="text-xs mt-1">
                  Deleted IDs: {result.deleted.join(', ')}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-2">No duplicates were found to delete.</p>
          )}
        </div>
      )}
    </div>
  );
}