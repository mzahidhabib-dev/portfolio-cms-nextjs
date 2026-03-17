"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Save, Type, Image as ImageIcon, Mail, MessageSquare, 
  Search, Trash2, CheckCircle2, Clock, Reply, 
  Settings2, Inbox, Archive, RotateCcw, X, Send, Globe
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- SCHEMAS ---
const contactSettingsSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  description: z.string().optional(),
  submitBtnText: z.string().default("Send Message"),
  successMsg: z.string().default("Message sent successfully!"),
  apiEndpoint: z.string().default("/api/contact"),
});

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "resolved" | "archived";
  date: string;
}

export default function ContactManager() {
  const [activeTab, setActiveTab] = useState("inbox");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", name: "Client Name", email: "client@example.com", subject: "Project Inquiry", message: "I need a MERN stack developer.", status: "pending", date: "2026-03-17" },
  ]);

  const defaultValues = {
    heading: "Get In Touch",
    description: "Have a project in mind? Let's build something amazing together.",
    submitBtnText: "Send Message",
    successMsg: "Thank you! I will get back to you soon.",
    apiEndpoint: "/api/contact",
  };

  const form = useForm<z.infer<typeof contactSettingsSchema>>({
    resolver: zodResolver(contactSettingsSchema),
    defaultValues,
  });

  // --- ACTIONS ---
  const onSaveSettings = (data: z.infer<typeof contactSettingsSchema>) => {
    console.log("Saving Frontend Config:", { ...data, image: previewImage });
    toast.success("Frontend Contact Section Updated");
  };

  const handleResetSettings = () => {
    form.reset(defaultValues);
    setPreviewImage(null);
    toast.info("Settings reverted to default");
  };

  const updateStatus = (id: string, newStatus: Message["status"]) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    if (selectedMsg?.id === id) setSelectedMsg({ ...selectedMsg, status: newStatus });
    toast.success(`Message ${newStatus}`);
  };

  const confirmDelete = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    setDeleteConfirmId(null);
    setSelectedMsg(null);
    toast.success("Message permanently deleted");
  };

  return (
    <div className="space-y-6 pb-20 px-4 sm:px-0 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Hub</h1>
          <p className="text-muted-foreground text-sm">Manage client inquiries and customize your contact form.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-8 bg-muted/50 p-1">
          <TabsTrigger value="inbox" className="gap-2 data-[state=active]:shadow-sm">
            <Inbox className="size-4" /> Inbox
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2 data-[state=active]:shadow-sm">
            <Settings2 className="size-4" /> Form Settings
          </TabsTrigger>
        </TabsList>

        {/* --- INBOX TAB --- */}
        <TabsContent value="inbox" className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-3">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9 bg-card" />
              </div>
              <div className="space-y-2 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {messages.map((m) => (
                  <div 
                    key={m.id} 
                    onClick={() => setSelectedMsg(m)}
                    className={cn(
                      "p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/50 relative overflow-hidden",
                      selectedMsg?.id === m.id ? "bg-primary/[0.03] border-primary shadow-sm" : "bg-card",
                      m.status === "pending" && "border-l-4 border-l-amber-500"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-sm truncate max-w-[120px]">{m.name}</p>
                      <span className="text-[10px] text-muted-foreground font-medium">{m.date}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">{m.subject}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge variant={m.status === 'pending' ? 'outline' : 'secondary'} className={cn(
                        "text-[9px] uppercase px-2 py-0 h-4 border-none font-bold",
                        m.status === 'pending' ? "bg-amber-100 text-amber-700" : 
                        m.status === 'resolved' ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                      )}>
                        {m.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              {selectedMsg ? (
                <div className="rounded-xl border bg-card shadow-sm flex flex-col h-full min-h-[500px]">
                  <div className="p-6 border-b flex items-center justify-between bg-muted/5">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {selectedMsg.name[0]}
                      </div>
                      <div>
                        <h2 className="font-bold leading-none">{selectedMsg.name}</h2>
                        <p className="text-xs text-muted-foreground mt-1">{selectedMsg.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {deleteConfirmId === selectedMsg.id ? (
                        <div className="flex gap-1 animate-in zoom-in duration-200">
                          <Button variant="destructive" size="sm" onClick={() => confirmDelete(selectedMsg.id)} className="h-8">Delete</Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)} className="h-8 text-xs">Cancel</Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="icon" onClick={() => setDeleteConfirmId(selectedMsg.id)} className="text-destructive hover:bg-destructive/10 size-8">
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Subject</h4>
                      <p className="font-semibold text-lg">{selectedMsg.subject}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Message Content</h4>
                      <div className="p-5 rounded-xl bg-muted/30 text-sm leading-relaxed whitespace-pre-wrap border border-muted">
                        {selectedMsg.message}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-muted/10 flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" className="gap-2 font-bold text-xs h-9" onClick={() => updateStatus(selectedMsg.id, "resolved")}>
                      <CheckCircle2 className="size-3.5 text-green-600" /> Resolved
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 font-bold text-xs h-9" onClick={() => updateStatus(selectedMsg.id, "archived")}>
                      <Archive className="size-3.5 text-slate-600" /> Archive
                    </Button>
                    <Button className="ml-auto gap-2 px-8 font-bold h-9 shadow-md" onClick={() => window.open(`mailto:${selectedMsg.email}?subject=RE: ${selectedMsg.subject}`)}>
                      <Reply className="size-4" /> Reply via Email
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-10 text-muted-foreground opacity-30 text-center">
                  <MessageSquare className="size-16 mb-4 stroke-[1px]" />
                  <p className="text-sm font-bold uppercase tracking-widest">Select an inquiry to manage</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* --- SETTINGS TAB --- */}
        <TabsContent value="settings" className="animate-in slide-in-from-right-2 duration-300">
          <Form {...form}>
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" onClick={handleResetSettings} className="gap-2 text-xs font-bold hover:bg-destructive/5 hover:text-destructive">
                <RotateCcw className="size-3.5" /> Reset Section
              </Button>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="p-6 border rounded-xl bg-card space-y-5 shadow-sm">
                  <h3 className="font-bold flex items-center gap-2 border-b pb-3"><Type className="size-4 text-primary" /> Frontend Visuals</h3>
                  <FormField control={form.control} name="heading" render={({ field }) => (
                    <FormItem><FormLabel>Form Heading</FormLabel><FormControl><Input placeholder="e.g. Let's Talk" {...field} /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem><FormLabel>Description Text</FormLabel><FormControl><Textarea className="resize-none h-28" placeholder="Enter sub-text here..." {...field} /></FormControl></FormItem>
                  )} />
                </div>

                <div className="p-6 border rounded-xl bg-card space-y-4 shadow-sm">
                  <h3 className="font-bold flex items-center gap-2 border-b pb-3"><ImageIcon className="size-4 text-primary" /> Section Graphic</h3>
                  <div 
                    onClick={() => document.getElementById('contact-img-upload')?.click()} 
                    className="aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-all overflow-hidden relative group"
                  >
                    {previewImage ? (
                      <>
                        <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <p className="text-white text-xs font-bold">Change Image</p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="size-10 mx-auto mb-2 text-muted-foreground opacity-20" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Upload Illustration / Photo</p>
                      </div>
                    )}
                    <input id="contact-img-upload" type="file" className="hidden" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setPreviewImage(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 border rounded-xl bg-card space-y-5 shadow-sm">
                  <h3 className="font-bold flex items-center gap-2 border-b pb-3"><Globe className="size-4 text-primary" /> Logic & Confirmation</h3>
                  <FormField control={form.control} name="apiEndpoint" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Destination (API Route)</FormLabel>
                      <FormControl><Input placeholder="https://api/domain.com/messages" {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="submitBtnText" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Submit Button Text</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="successMsg" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Confirmation Message</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                </div>
                
                <Button onClick={form.handleSubmit(onSaveSettings)} size="lg" className="rounded-full w-full gap-3 font-bold h-14 shadow-xl text-md">
                  <Save className="size-5" /> Save Contact Section
                </Button>
              </div>
            </div>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}