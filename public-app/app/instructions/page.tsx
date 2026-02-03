export default function InstructionsPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        How to Use the App
      </h1>

      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li>Allow location access to find nearby clinics</li>
        <li>Use smart routing for urgent conditions</li>
        <li>Book appointments in advance</li>
        <li>Enable alerts for health notifications</li>
      </ul>
    </main>
  );
}
