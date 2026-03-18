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
  User,
  GraduationCap,
  Briefcase,
  Rocket,
  MousePointer2,
  X,
  RotateCcw,
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
} from "@/components/ui/form";

const aboutSchema = z.object({
  heading: z.string().max(50).optional().or(z.literal("")),
  description: z.string().max(1000).optional().or(z.literal("")),
  education: z.string().max(10).optional().or(z.literal("")),
  experience: z.string().max(10).optional().or(z.literal("")),
  projects: z.string().max(10).optional().or(z.literal("")),
  btnText: z.string().max(20).optional().or(z.literal("")),
  btnLink: z.string().optional().or(z.literal("")),
});

export default function AboutMePage() {
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      heading: "About Me",
      description: "",
      education: "5+",
      experience: "3+",
      projects: "10+",
      btnText: "Learn More",
      btnLink: "/details",
    },
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: z.infer<typeof aboutSchema>) => {
    console.log("Data:", data, "Image:", imgPreview);
    toast.success("About section updated successfully!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-24">
        {/* HEADER WITH RESET BUTTON */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">About Me</h1>
            <p className="text-muted-foreground text-sm">
              Tell your story and showcase your achievements.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => {
              form.reset();
              setImgPreview(null);
              toast.info("Form reset to default values");
            }}
            className="gap-2"
          >
            <RotateCcw className="size-4" /> Reset All
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT: TEXT CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Type className="size-4 text-primary" /> Bio & Content
              </h2>
              <FormField
                control={form.control}
                name="heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Main Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[160px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* STATS GRID */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                <Rocket className="size-4 text-primary" /> Achievements Stats
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem className="text-center p-4 rounded-lg bg-muted/20 border">
                      <GraduationCap className="size-5 mx-auto mb-2 text-primary" />
                      <FormControl>
                        <Input
                          className="text-center font-bold text-lg h-8 bg-background"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">
                        Education
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem className="text-center p-4 rounded-lg bg-muted/20 border">
                      <Briefcase className="size-5 mx-auto mb-2 text-primary" />
                      <FormControl>
                        <Input
                          className="text-center font-bold text-lg h-8 bg-background"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">
                        Experience
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projects"
                  render={({ field }) => (
                    <FormItem className="text-center p-4 rounded-lg bg-muted/20 border">
                      <Rocket className="size-5 mx-auto mb-2 text-primary" />
                      <FormControl>
                        <Input
                          className="text-center font-bold text-lg h-8 bg-background"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">
                        Projects
                      </p>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: IMAGE & BUTTON */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <User className="size-4 text-primary" /> About Image
              </h2>
              <div
                onClick={() => fileRef.current?.click()}
                className="relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-all cursor-pointer min-h-[220px] bg-muted/20"
              >
                {imgPreview ? (
                  <div className="relative group">
                    <img
                      src={imgPreview}
                      alt="About Me"
                      className="max-h-48 object-contain rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImgPreview(null);
                      }}
                      className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="size-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">
                      Click to upload About Image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImage}
                />
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <MousePointer2 className="size-4 text-primary" /> CTA Button
              </h2>
              <FormField
                control={form.control}
                name="btnText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Button Label</FormLabel>
                    <FormControl>
                      <Input placeholder="Learn More" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="btnLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Redirect Link (URL)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="/about-details" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* FLOATING SAVE BAR */}
        <div className="fixed bottom-8 right-8">
          <Button
            type="submit"
            size="lg"
            className="rounded-full shadow-2xl gap-2 px-10 h-14 font-semibold"
          >
            <Save className="size-5" /> Save About Section
          </Button>
        </div>
      </form>
    </Form>
  );
}
