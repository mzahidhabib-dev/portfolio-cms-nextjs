"use client";

import { useState, useRef } from "react";
import {
  Save,
  Upload,
  Plus,
  Trash2,
  GripVertical,
  Palette,
  MousePointer2,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SiteIdentityPage() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoText, setLogoText] = useState("");
  const [ctaText, setCtaText] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setLogoPreview(null);
    setLogoText("");
    setCtaText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    // REMOVED max-w-5xl to match Dashboard's fluid width
    <div className="space-y-8 pb-24">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Config</h1>
          <p className="text-muted-foreground">
            Manage your public portfolio&apos;s branding and navigation.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="gap-2"
        >
          <RotateCcw className="size-4" /> Reset All
        </Button>
      </div>

      {/* Grid synced with Dashboard style */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN: BRANDING & CTA */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Palette className="size-4 text-primary" /> Logo & Branding
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Navbar Logo Image</Label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-all cursor-pointer min-h-[160px]"
                >
                  {logoPreview ? (
                    <div className="relative group">
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="max-h-24 object-contain"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLogoPreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="size-5 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground font-medium text-center">
                        Click to upload logo
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Logo Text Fallback</Label>
                <Input
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value)}
                  placeholder="Mohammad Zahid Habib"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <MousePointer2 className="size-4 text-primary" /> Call to Action
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <Label>Show Hire Me Button</Label>
                <Switch defaultChecked />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="Hire Me"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Action Link</Label>
                  <Input placeholder="mailto:..." />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: NAVBAR LINKS */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Navbar Links</h2>
            <Button variant="secondary" size="sm" className="gap-1 h-8 text-xs">
              <Plus className="size-3" /> Add Link
            </Button>
          </div>

          <div className="space-y-3">
            {["Home", "About", "Projects", "Skills"].map((link) => (
              <div
                key={link}
                className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30 group"
              >
                <GripVertical className="size-4 text-muted-foreground cursor-grab opacity-40 group-hover:opacity-100" />
                <Input
                  defaultValue={link}
                  className="bg-transparent border-none h-8 p-0 focus-visible:ring-0 font-medium"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-destructive/40 hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Standardized Floating Save Button */}
      <div className="fixed bottom-8 right-8 flex items-center gap-3">
        <Button
          size="lg"
          className="rounded-full shadow-xl gap-2 px-10 h-14 font-semibold active:scale-95 transition-transform"
        >
          <Save className="size-5" /> Save Site Config
        </Button>
      </div>
    </div>
  );
}
