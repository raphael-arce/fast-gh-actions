export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">
            Placeholder content. Last updated: TBD.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Information We Collect
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              How We Use Your Information
            </h2>
            <p className="text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">Contact</h2>
            <p className="text-gray-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </section>

          <a
            href="/"
            className="inline-block text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            &larr; Back to app
          </a>
        </div>
      </div>
    </div>
  );
}
