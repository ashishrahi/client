import React, { useState } from "react";
import { LogEntry } from "../../types/logs";
import PaginationControls from "../../components/PaginationControls";
import EditLogModal from "./EditLogModal";
import { EditIcon} from "lucide-react";

type LogsTableProps = {
  logs: LogEntry[];
};

const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingLog, setEditingLog] = useState<LogEntry | null>(null);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(logs.length / rowsPerPage);
  const currentData = logs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="w-full">
     

      <div className="w-full overflow-x-auto rounded border border-gray-200">
        <table className="min-w-[800px] md:min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="border px-2 md:px-3 py-2 min-w-[150px]">Feed URL</th>
              <th className="border px-2 md:px-3 py-2">Fetched</th>
              <th className="border px-2 md:px-3 py-2">Imported</th>
              <th className="border px-2 md:px-3 py-2">New</th>
              <th className="border px-2 md:px-3 py-2">Updated</th>
              <th className="border px-2 md:px-3 py-2 min-w-[150px]">Failures</th>
              <th className="border px-2 md:px-3 py-2 min-w-[160px]">Timestamp</th>
              <th className="border px-2 md:px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((log, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="border px-2 md:px-3 py-2 break-words max-w-xs">{log.feedUrl}</td>
                <td className="border px-2 md:px-3 py-2 text-center">{log.totalFetched}</td>
                <td className="border px-2 md:px-3 py-2 text-center">{log.totalImported}</td>
                <td className="border px-2 md:px-3 py-2 text-center">{log.newJobs}</td>
                <td className="border px-2 md:px-3 py-2 text-center">{log.updatedJobs}</td>
                <td className="border px-2 md:px-3 py-2 text-sm">
                  {log.failedJobs.length > 0
                    ? `${log.failedJobs.length} error(s)`
                    : "—"}
                  <ul className="ml-4 list-disc text-red-500">
                    {log.failedJobs.map((item, index) => (
                      <li key={index} className="text-xs">{item.reason}</li>
                    ))}
                  </ul>
                </td>
                <td className="border px-2 md:px-3 py-2 whitespace-nowrap text-sm">
                  {new Date(log.timestamp).toLocaleString("en-IN")}
                </td>
                <td className="border px-2 md:px-3 py-2 text-center">
                  <button
                    onClick={() => setEditingLog(log)}
                    className="text-blue-600 hover:underline"
                    aria-label="Edit log"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {editingLog && (
        <EditLogModal log={editingLog} onClose={() => setEditingLog(null)} />
      )}
    </div>
  );
};

export default LogsTable;
