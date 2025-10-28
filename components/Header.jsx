"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-gradient fixed-top">
      <div className="container">
        <Link href="/" className="navbar-brand logo">
          <img src="/assets/images/lg1.png" alt="Narativa Logo" className="logo-icon" />
          <span className="logo-text">NARATIVA</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>Beranda</Link></li>
            <li className="nav-item"><Link href="/galeri" className={`nav-link ${pathname === "/galeri" ? "active" : ""}`}>Galeri</Link></li>
            <li className="nav-item"><Link href="/tentang" className={`nav-link ${pathname === "/tentang" ? "active" : ""}`}>Tentang</Link></li>
            <li className="nav-item"><Link href="/kontak" className={`nav-link ${pathname === "/kontak" ? "active" : ""}`}>Kontak</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
