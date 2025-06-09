import { BrandMark } from "../shared";

export function Footer() {
  return (
    <footer className="content-grid h-12">
      <section className="flex items-center justify-between gap-4 px-2">
        <p className="text-sm">&copy; 2025</p>
        <BrandMark />
      </section>
    </footer>
  );
}
