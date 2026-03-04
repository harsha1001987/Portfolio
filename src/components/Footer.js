export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-text">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-accent-gold">Portfolio</span>. All rights
          reserved.
        </p>
        <div className="h-px w-8 bg-accent-gold/30 hidden sm:block" />
        <p className="text-xs text-muted-text/60">
          Designed &amp; built with precision.
        </p>
      </div>
    </footer>
  );
}
