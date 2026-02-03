export default function RoutingPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Smart Medical Routing
      </h1>

      <p className="text-gray-600">
        Select a condition to get the best clinic and route.
      </p>

      <ul className="mt-4 space-y-2">
        <li>🤰 Pregnancy Care</li>
        <li>🤒 Fever & Infection</li>
        <li>🚑 Emergency</li>
      </ul>
    </main>
  );
}
