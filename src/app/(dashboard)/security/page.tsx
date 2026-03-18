"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { KeyRound, ShieldCheck, Eye, EyeOff, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// --- ZOD VALIDATION SCHEMA ---
const securitySchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword !== data.currentPassword, {
  message: "New password cannot be the same as current password",
  path: ["newPassword"],
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SecurityFormValues = z.infer<typeof securitySchema>;

export default function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Independent visibility states for each field
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SecurityFormValues) => {
    setIsLoading(true);
    // Simulate API call to your backend
    setTimeout(() => {
      setIsLoading(false);
      console.log("Password Updated:", data);
      toast.success("Security credentials updated successfully.");
      form.reset();
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <ShieldCheck className="text-primary size-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
          <p className="text-muted-foreground text-sm">Update your administrative access keys.</p>
        </div>
      </div>

      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="bg-card border border-border p-8 rounded-[2.5rem] space-y-8 shadow-sm"
      >
        <div className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Current Password</label>
            <div className="relative group">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                {...form.register("currentPassword")}
                type={showCurrent ? "text" : "password"} 
                className="pl-12 pr-12 h-13 bg-background/50 rounded-xl border-border/60 focus:border-primary transition-all" 
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {form.formState.errors.currentPassword && (
              <p className="text-[10px] text-destructive font-bold uppercase px-1">
                {form.formState.errors.currentPassword.message}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">New Password</label>
              <div className="relative group">
                <Input 
                  {...form.register("newPassword")}
                  type={showNew ? "text" : "password"} 
                  className="pr-12 h-13 bg-background/50 rounded-xl border-border/60 focus:border-primary transition-all" 
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.formState.errors.newPassword && (
                <p className="text-[10px] text-destructive font-bold uppercase px-1">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">Confirm New Password</label>
              <div className="relative group">
                <Input 
                  {...form.register("confirmPassword")}
                  type={showConfirm ? "text" : "password"} 
                  className="pr-12 h-13 bg-background/50 rounded-xl border-border/60 focus:border-primary transition-all" 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-[10px] text-destructive font-bold uppercase px-1">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 px-10 h-13 rounded-xl font-bold flex gap-2 transition-all active:scale-95"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Save New Credentials</>}
        </Button>
      </form>
    </div>
  );
}