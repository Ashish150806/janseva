export default function Footer() {
  return (
    <footer className="bg-primary text-white py-4 mt-8 shadow-inner">
      <div className="container mx-auto text-center text-sm">
        <p className="font-body">
          © {new Date().getFullYear()} Civic Platform. All rights reserved.
        </p>
        <p className="mt-1">
          <a href="/about" className="nav-link">About</a> |{" "}
          <a href="/contact" className="nav-link">Contact</a> |{" "}
          <a href="/privacy" className="nav-link">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}
