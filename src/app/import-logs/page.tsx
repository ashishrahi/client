"use client";
import { useEffect, useState } from "react";
import LogsTable from "../../components/Logs/LogsTable";
import { useImportLogsQuery } from "../../hooks/useImportLogsQuery";
import { PlusCircle } from "lucide-react";
import AddLogModal from "../../components/Logs/AddLogModal";
import socket from "../../utils/socket"

export default function ImportLogsPage() {
  const { data: initialLogs = [], isLoading, isError, error } = useImportLogsQuery();
  const [logs, setLogs] = useState(initialLogs);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Sync logs once data is loaded
    if (!isLoading && initialLogs.length > 0) {
      setLogs(initialLogs);
    }
  }, [initialLogs, isLoading]);

  useEffect(() => {
    socket.connect();

    socket.on("new-log", (newLog) => {
      console.log("Real-time log:", newLog);
      setLogs((prev) => [newLog, ...prev]);
    });

    return () => {
      socket.off("new-log");
      socket.disconnect();
    };
  }, []);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">🗂 Import Logs</h1>
      <div className="flex justify-end mb-4">
        <button
          className="flex items-center gap-2 text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          onClick={() => setShowAddModal(true)}
        >
          <PlusCircle className="w-4 h-4" />
          Add Log
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
        {isLoading && <p className="text-sm text-gray-500">Loading logs...</p>}
        {isError && (
          <p className="text-sm text-red-500">Error: {error.message}</p>
        )}
        {!isLoading && !isError && <LogsTable logs={logs} />}
      </div>

      {showAddModal && <AddLogModal onClose={() => setShowAddModal(false)} />}
    </main>
  );
}
