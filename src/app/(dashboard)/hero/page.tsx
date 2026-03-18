"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Save,
  Upload,
  Type,
  FileText,
  MousePointer2,
  RotateCcw,
  X,
  Image as ImageIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Use the simple version if shadcn is still bugged

const heroSchema = z.object({
  // Allows empty, but if filled, must be 5-100 chars
  heading: z.string().max(200).optional().or(z.literal("")),

  // Allows empty, but if filled, must be max 500
  description: z.string().max(5000).optional().or(z.literal("")),

  // Buttons usually need at least some text if they exist
  cvText: z.string().max(20).optional().or(z.literal("")),
  contactText: z.string().max(20).optional().or(z.literal("")),
});

type HeroValues = z.infer<typeof heroSchema>;

export default function HomeHeroPage() {
  const [mainImg, setMainImg] = useState<string | null>(null);
  const [secImg, setSecImg] = useState<string | null>(null);
  const mainFileRef = useRef<HTMLInputElement>(null);
  const secFileRef = useRef<HTMLInputElement>(null);

  const form = useForm<HeroValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      heading: "",
      description: "",
      cvText: "Download CV",
      contactText: "Get in Touch",
    },
  });

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string | null) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: HeroValues) => {
    console.log("Form Data:", data);
    console.log("Images:", { mainImg, secImg });
    toast.success("Home Hero Updated", {
      description: "Text and media changes have been saved.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-24">
        {/* HEADER */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Home Hero</h1>
            <p className="text-muted-foreground text-sm">
              Manage your portfolio`s main introduction.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => {
              form.reset();
              setMainImg(null);
              setSecImg(null);
            }}
            className="gap-2"
          >
            <RotateCcw className="size-4" /> Reset All
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* CONTENT COLUMN */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Type className="size-4 text-primary" /> Hero Text
              </h2>

              <FormField
                control={form.control}
                name="heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Heading</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Stack Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MousePointer2 className="size-4 text-primary" /> Hero Actions
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-muted/20 border space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    CV Download
                  </p>
                  <FormField
                    control={form.control}
                    name="cvText"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="h-8 text-sm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Input
                    type="file"
                    accept=".pdf"
                    className="h-8 text-[10px] px-1 py-1"
                  />
                </div>

                <div className="p-4 rounded-lg bg-muted/20 border space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Contact Link
                  </p>

                  <FormField
                    control={form.control}
                    name="contactText"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="h-8 text-sm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* MEDIA COLUMN */}
          <div className="rounded-xl border bg-card p-6 shadow-sm h-fit space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ImageIcon className="size-4 text-primary" /> Hero Media
            </h2>

            {/* Main Image */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Main Profile Picture
              </Label>
              <div
                onClick={() => mainFileRef.current?.click()}
                className="relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-all cursor-pointer min-h-[160px] bg-muted/20"
              >
                {mainImg ? (
                  <div className="relative group">
                    <img
                      src={mainImg}
                      alt="Preview"
                      className="max-h-32 object-contain rounded-md"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMainImg(null);
                      }}
                      className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="size-5 mb-2 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Upload Profile
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  ref={mainFileRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImage(e, setMainImg)}
                />
              </div>
            </div>

            {/* Secondary Image */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Secondary Image</Label>
              <div
                onClick={() => secFileRef.current?.click()}
                className="relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-all cursor-pointer min-h-[120px] bg-muted/20"
              >
                {secImg ? (
                  <div className="relative group">
                    <img
                      src={secImg}
                      alt="Preview"
                      className="max-h-24 object-contain rounded-md"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSecImg(null);
                      }}
                      className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="size-5 mb-2 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Upload Background
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  ref={secFileRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImage(e, setSecImg)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING SAVE BAR */}
        <div className="fixed bottom-8 right-8">
          <Button
            type="submit"
            size="lg"
            className="rounded-full shadow-2xl gap-2 px-10 h-14 font-semibold shadow-primary/20"
          >
            <Save className="size-5" /> Save Home Section
          </Button>
        </div>
      </form>
    </Form>
  );
}
