import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background p-4">
      {/* FLOATING TOGGLE: Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle variant="floating" />
      </div>

      <main className="w-full max-w-[450px]">
        {children}
      </main>
    </div>
  );
}
