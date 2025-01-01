import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-muted">
      <div className="text-xl font-bold text-accent">RevisionMaster</div>
      <div className="flex gap-4">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <Link href="/about" className="hover:text-accent">
          About
        </Link>
        <Link href="/contact" className="hover:text-accent">
          Contact
        </Link>
      </div>
    </nav>
  );
}
