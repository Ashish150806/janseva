export default function ReportCard({ report }) {
  return (
    <div className="card">
      <h3 className="font-bold text-lg">{report.title}</h3>
      <p className="text-gray-600">{report.description}</p>
      {report.image && (
        <img
          src={report.image}
          alt="issue"
          className="w-full h-40 object-cover mt-2 rounded"
        />
      )}
      <p className="text-sm text-gray-500 mt-2">
        Status:{" "}
        <span
          className={`font-semibold ${
            report.status === "resolved"
              ? "text-accent"
              : report.status === "pending"
              ? "text-primary"
              : "text-danger"
          }`}
        >
          {report.status}
        </span>
      </p>
    </div>
  );
}
