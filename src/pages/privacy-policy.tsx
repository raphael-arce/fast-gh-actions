const sections = [
  "Information We Collect",
  "How We Use Your Information",
  "Data Sharing and Disclosure",
  "Data Retention and Security",
  "Your Rights",
  "Contact Us",
];

const placeholder =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600">Placeholder content, last updated soon</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          {sections.map((title) => (
            <section key={title}>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {title}
              </h2>
              <p className="text-gray-600">{placeholder}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            Back to app
          </a>
        </div>
      </div>
    </div>
  );
}
