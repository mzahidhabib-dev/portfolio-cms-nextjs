"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Save,
  RotateCcw,
  Mail,
  ShieldCheck,
  Plus,
  Trash2,
  Link as LinkIcon,
  X,
  Check,
  AlertCircle,
  Globe,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";


// 1. Update the schema to use .catch("") to guarantee strings
// const footerSchema = z.object({
//   tagline: z.string().min(1, "Tagline is required"),
//   quickLinksTitle: z.string().min(1, "Title is required"),
//   socialTitle: z.string().min(1, "Social title is required"),
//   socialTagline: z.string().catch(""), // Guarantees string output
//   email: z.string().email("Invalid email"),
//   phone: z.string().catch(""), // Guarantees string output
//   copyrightText: z.string().min(1, "Copyright is required"),
//   socials: z.array(
//     z.object({
//       id: z.string(),
//       platform: z.string().min(1, "Platform name required"),
//       url: z.string().url("Invalid URL"),
//       logo: z.string().catch(""), // Guarantees string output
//     })
//   ),
// });

// // 2. Infer the type from the schema
// type FooterFormValues = z.infer<typeof footerSchema>;

// // 3. Simplify the useForm call
// const form = useForm<FooterFormValues>({
//   resolver: zodResolver(footerSchema),
//   defaultValues,
// });


// export default function FooterManager() {
//   const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

//   const defaultValues = {
//     tagline: "Full Stack Developer & UI/UX Designer",
//     quickLinksTitle: "Quick Links",
//     socialTitle: "Follow Me",
//     socialTagline: "Let's build something great together.",
//     email: "mohammadzahidhabib786@gmail.com",
//     phone: "+92 300 1234567",
//     copyrightText: "© 2026 Made with ❤️ by M Zahid Habib",
//     socials: [
//       { id: "1", platform: "GitHub", url: "https://github.com", logo: "" },
//       { id: "2", platform: "LinkedIn", url: "https://linkedin.com", logo: "" },
//     ],
//   };

//  const form = useForm<FooterFormValues, any, FooterFormValues>({
//   resolver: zodResolver(footerSchema),
//   defaultValues,
// });

//   const { fields, append, remove, update } = useFieldArray<FooterFormValues>({
//     control: form.control,
//     name: "socials",
//   });





// 1. Define the schema
const footerSchema = z.object({
  tagline: z.string().min(1, "Tagline is required"),
  quickLinksTitle: z.string().min(1, "Title is required"),
  socialTitle: z.string().min(1, "Social title is required"),
  socialTagline: z.string().catch(""), 
  email: z.string().email("Invalid email"),
  phone: z.string().catch(""), 
  copyrightText: z.string().min(1, "Copyright is required"),
  socials: z.array(
    z.object({
      id: z.string(),
      platform: z.string().min(1, "Platform name required"),
      url: z.string().url("Invalid URL"),
      logo: z.string().catch(""),
    })
  ),
});

// 2. Infer the type
type FooterFormValues = z.infer<typeof footerSchema>;

// 3. Define defaultValues OUTSIDE the component (so it's available for the hook)
const defaultValues: FooterFormValues = {
  tagline: "Full Stack Developer & UI/UX Designer",
  quickLinksTitle: "Quick Links",
  socialTitle: "Follow Me",
  socialTagline: "Let's build something great together.",
  email: "mohammadzahidhabib786@gmail.com",
  phone: "+92 300 1234567",
  copyrightText: "© 2026 Made with ❤️ by M Zahid Habib",
  socials: [
    { id: "1", platform: "GitHub", url: "https://github.com", logo: "" },
    { id: "2", platform: "LinkedIn", url: "https://linkedin.com", logo: "" },
  ],
};

export default function FooterManager() {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // 4. Corrected Hook Call (No duplicate call outside)
  const form = useForm<FooterFormValues>({
    resolver: zodResolver(footerSchema),
    defaultValues,
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "socials",
  });

  // ... rest of your handleLogoUpload and onSave functions
  const onSave = (data: FooterFormValues) => {
    console.log("Final Footer Data:", data);
    toast.success("Footer settings saved and updated!");
  };

  const handleLogoUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const currentData = form.getValues(`socials.${index}`);
        update(index, { ...currentData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 pb-24 px-4 sm:px-0 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Footer Editor</h1>
          <p className="text-muted-foreground text-sm">
            Manage global identity, contact info, and social links.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (confirm("Reset all footer settings?"))
              form.reset(defaultValues);
          }}
          className="gap-2 font-bold"
        >
          <RotateCcw className="size-3.5" /> Reset Section
        </Button>
      </div>

      <Form {...form}>
        <div className="grid gap-6 lg:grid-cols-12">
          {/* LEFT: Identity & Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 border rounded-2xl bg-card space-y-5 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 text-primary uppercase text-xs tracking-widest">
                <Globe className="size-4" /> Identity & Links
              </h3>
              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Tagline</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quickLinksTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Quick Links Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="p-6 border rounded-2xl bg-card space-y-5 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 text-primary uppercase text-xs tracking-widest">
                <Mail className="size-4" /> Contact Details
              </h3>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="p-6 border rounded-2xl bg-card space-y-5 shadow-sm">
              <h3 className="font-bold flex items-center gap-2 text-primary uppercase text-xs tracking-widest">
                <ShieldCheck className="size-4" /> Legal Bar
              </h3>
              <FormField
                control={form.control}
                name="copyrightText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Copyright Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* RIGHT: Social Media Manager */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 border rounded-2xl bg-card shadow-sm min-h-full space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <h3 className="font-bold flex items-center gap-2 text-primary uppercase text-xs tracking-widest">
                    <LinkIcon className="size-4" /> Social Links
                  </h3>
                  <p className="text-[10px] text-muted-foreground">
                    Add your profiles with custom icons.
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    append({
                      id: Date.now().toString(),
                      platform: "",
                      url: "",
                      logo: "",
                    })
                  }
                  className="h-8 font-bold gap-1"
                >
                  <Plus className="size-3.5" /> New Social
                </Button>
              </div>

              {/* LIST OF ADDED SOCIALS */}
              <div className="space-y-4">
                {fields.map((field, index) => {
                  const currentLogo = form.watch(`socials.${index}.logo`);
                  const platformName = form.watch(`socials.${index}.platform`);

                  return (
                    <div
                      key={field.id}
                      className="group relative p-4 rounded-xl border bg-muted/10 hover:bg-muted/30 transition-all border-dashed hover:border-solid hover:border-primary/30"
                    >
                      <div className="flex gap-4 items-start">
                        {/* Logo Preview/Upload */}
                        <div className="space-y-1 text-center">
                          <div
                            onClick={() =>
                              document
                                .getElementById(`logo-upload-${index}`)
                                ?.click()
                            }
                            className="size-14 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer bg-background hover:border-primary transition-all overflow-hidden"
                          >
                            {currentLogo ? (
                              <img
                                src={currentLogo}
                                className="w-full h-full object-contain p-1.5"
                                alt="icon"
                              />
                            ) : (
                              <Upload className="size-4 text-muted-foreground opacity-30" />
                            )}
                          </div>
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">
                            Icon
                          </span>
                          <input
                            id={`logo-upload-${index}`}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleLogoUpload(index, e)}
                          />
                        </div>

                        {/* Text Inputs */}
                        <div className="flex-1 space-y-2">
                          <Input
                            placeholder="Platform (e.g. GitHub)"
                            className="h-8 text-sm font-bold"
                            {...form.register(
                              `socials.${index}.platform` as const,
                            )}
                          />
                          <Input
                            placeholder="URL (https://...)"
                            className="h-8 text-[11px] text-muted-foreground"
                            {...form.register(`socials.${index}.url` as const)}
                          />
                        </div>

                        {/* Action Area */}
                        <div className="min-w-[40px] flex justify-end">
                          {deleteConfirmId === field.id ? (
                            <div className="flex flex-col gap-1 animate-in zoom-in">
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="size-7 rounded-full"
                                onClick={() => {
                                  remove(index);
                                  setDeleteConfirmId(null);
                                  toast.error(
                                    `${platformName || "Social"} removed`,
                                  );
                                }}
                              >
                                <Check className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                className="size-7 rounded-full"
                                onClick={() => setDeleteConfirmId(null)}
                              >
                                <X className="size-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive opacity-0 group-hover:opacity-100 transition-all size-8"
                              onClick={() => setDeleteConfirmId(field.id)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {fields.length === 0 && (
                  <div className="py-12 border-2 border-dashed rounded-xl text-center opacity-30">
                    <AlertCircle className="size-8 mx-auto mb-2" />
                    <p className="text-xs font-bold uppercase tracking-widest">
                      No social links configured
                    </p>
                  </div>
                )}
              </div>

              {/* SAVE BUTTON */}
              <div className="pt-4">
                <Button
                  onClick={form.handleSubmit(onSave)}
                  size="lg"
                  className="w-full gap-3 font-bold h-14 shadow-xl rounded-full"
                >
                  <Save className="size-5" /> Save Footer Section
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
