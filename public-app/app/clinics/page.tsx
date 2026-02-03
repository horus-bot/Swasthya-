export default function ClinicsPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Nearest Clinics
      </h1>

      <p className="text-gray-600">
        Showing nearby public clinics with waiting time.
      </p>

      <div className="mt-4 bg-white p-4 rounded shadow">
        Clinic Name – Waiting Time: 15 mins
      </div>
    </main>
  );
}
