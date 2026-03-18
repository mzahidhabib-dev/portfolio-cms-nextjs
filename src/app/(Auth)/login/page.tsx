"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Fingerprint,
  Mail,
  KeyRound,
  ChevronRight,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Manual Login Logic
    setTimeout(() => {
      document.cookie = "auth_token=true; path=/; max-age=86400; SameSite=Lax";
      router.push("/states");
      router.refresh();
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full shadow-2xl backdrop-blur-3xl bg-card/60 border border-border/50 p-8 rounded-[2.5rem]"
    >
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="size-16 rounded-[1.25rem] bg-primary flex items-center justify-center shadow-xl shadow-primary/25 mb-6">
          <Fingerprint className="text-primary-foreground size-9" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          System Access
        </h2>
        <p className="text-muted-foreground text-[10px] mt-2 uppercase tracking-[0.4em] font-bold opacity-70">
          Identify Yourself
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1 tracking-widest">
            Identity
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="email"
              required
              autoComplete="email"
              placeholder="admin@famocare.com"
              className="pl-12 h-14 bg-background/50 border-border/50 focus:border-primary rounded-2xl transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-bold uppercase text-muted-foreground/80 tracking-widest">
              Access Key
            </label>
            <Link
              href="/reset-password"
              data-name="reset"
              className="text-[10px] text-primary font-bold hover:underline uppercase tracking-tighter"
            >
              Forgot Key?
            </Link>
          </div>
          <div className="relative group">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              className="pl-12 pr-12 h-14 bg-background/50 border-border/50 focus:border-primary rounded-2xl transition-all"
            />
            {/* VISIBILITY TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button
          disabled={isLoading}
          className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-2xl mt-4 text-base group"
        >
          {isLoading ? (
            <Loader2 className="animate-spin size-5" />
          ) : (
            <>
              Authorize Access{" "}
              <ChevronRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
