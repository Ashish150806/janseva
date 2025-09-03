export default function ReportCard({ report }) {
  return (
    <div className="border rounded p-4 shadow bg-white">
      <h3 className="font-bold">{report.title}</h3>
      <p className="text-gray-600">{report.description}</p>
      {report.image && (
        <img src={report.image} alt="issue" className="w-full h-40 object-cover mt-2 rounded" />
      )}
      <p className="text-sm text-gray-500 mt-2">
        Status: <span className="font-semibold">{report.status}</span>
      </p>
    </div>
  );
}
