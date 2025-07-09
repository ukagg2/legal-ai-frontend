export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 mt-8 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        &copy; {new Date().getFullYear()} LegalAI. All rights reserved.
      </div>
    </footer>
  );
}
