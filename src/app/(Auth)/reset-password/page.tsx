"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";

// --- VALIDATION SCHEMAS ---
const emailSchema = z.object({
  email: z.string().email("Please enter a valid administrative email address."),
});

const resetSchema = z.object({
  otp: z.string().length(6, "Security code must be exactly 6 digits."),
  newPassword: z
    .string()
    .min(8, "New Access Key must be at least 8 characters."),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // --- REACT HOOK FORM SETUP ---
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { otp: "", newPassword: "" },
  });

  // Timer logic for Resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSendOTP = async (data: EmailFormValues) => {
    setIsLoading(true);
    // Simulate NestJS API Call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setCountdown(60);
      toast.success(`Security code sent to ${data.email}`);
    }, 1500);
  };

  const onVerifyAndReset = async (data: ResetFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Security credentials updated successfully.");
      // Redirect to /login would go here
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full shadow-2xl backdrop-blur-3xl bg-card/60 border border-border/50 p-8 rounded-[2.5rem]"
    >
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <div className="flex flex-col items-center text-center mb-8">
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="text-primary size-7" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Reset Access
              </h2>
              <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold mt-1 opacity-70">
                Identity Verification
              </p>
            </div>

            <form
              onSubmit={emailForm.handleSubmit(onSendOTP)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Input
                  {...emailForm.register("email")}
                  autoComplete="email"
                  placeholder="admin@famocare.com"
                  className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary transition-all text-center"
                />
                {emailForm.formState.errors.email && (
                  <p className="text-[10px] text-destructive font-bold ml-2 uppercase tracking-tighter">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <Button
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-bold"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Request OTP"
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex flex-col items-center text-center mb-8">
              <div className="size-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4">
                <ShieldCheck className="text-green-500 size-7" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Verify Identity
              </h2>
              <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold mt-1 opacity-70">
                Set New Credentials
              </p>
            </div>

            <form
              onSubmit={resetForm.handleSubmit(onVerifyAndReset)}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Input
                  {...resetForm.register("otp")}
                  placeholder="000000"
                  maxLength={6}
                  autoComplete="one-time-code"
                  className="h-14 rounded-2xl text-center tracking-[1em] font-bold text-xl bg-background/50 border-border/50"
                />
                {resetForm.formState.errors.otp && (
                  <p className="text-[10px] text-destructive font-bold text-center uppercase tracking-tighter">
                    {resetForm.formState.errors.otp.message}
                  </p>
                )}
              </div>

              <div className="relative group">
                <Input
                  {...resetForm.register("newPassword")}
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Access Key"
                  className="pr-12 h-14 bg-background/50 border-border/50 focus:border-primary rounded-2xl text-center transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-base flex gap-2"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={18} /> Update Key
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 flex justify-center">
              <button
                disabled={countdown > 0}
                onClick={() => setCountdown(60)}
                className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary disabled:opacity-50 flex items-center gap-2"
              >
                <RotateCcw size={12} />{" "}
                {countdown > 0
                  ? `Resend OTP in ${countdown}s`
                  : "Resend Security Code"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 pt-6 border-t border-border/50 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={12} /> Return to Login
        </Link>
      </div>
    </motion.div>
  );
}
