"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Save, Upload, Type, Code2, 
  Plus, Trash2, ExternalLink, X, RotateCcw, Edit2, LayoutGrid, Check, AlertCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

// --- SCHEMA & INTERFACES ---
const skillsSchema = z.object({
  heading: z.string().optional(),
  description: z.string().optional(),
  viewAllText: z.string().optional(),
  viewAllLink: z.string().optional(),
  skillTitle: z.string().optional(),
  skillExp: z.string().optional(),
});

interface SkillItem {
  id: string;
  title: string;
  exp: string;
  logo: string | null;
}

export default function SkillsPage() {
  const [skillLogo, setSkillLogo] = useState<string | null>(null);
  const [skillsList, setSkillsList] = useState<SkillItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null); // New state for safety
  
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      heading: "Technical Skills",
      description: "Technologies I use to bring ideas to life.",
      viewAllText: "View All Skills",
      viewAllLink: "/skills",
      skillTitle: "",
      skillExp: "",
    },
  });

  const handleAddOrUpdateSkill = () => {
    const title = form.getValues("skillTitle");
    const exp = form.getValues("skillExp");

    if (!title) return toast.error("Skill name is required");

    if (editingId) {
      setSkillsList(prev => prev.map(s => s.id === editingId ? { ...s, title, exp: exp || "", logo: skillLogo } : s));
      setEditingId(null);
      toast.success("Skill updated");
    } else {
      const newSkill = { id: Date.now().toString(), title, exp: exp || "", logo: skillLogo };
      setSkillsList(prev => [...prev, newSkill]);
      toast.success("Skill added to list");
    }

    form.setValue("skillTitle", "");
    form.setValue("skillExp", "");
    setSkillLogo(null);
  };

  const confirmDelete = (id: string) => {
    setSkillsList(prev => prev.filter(s => s.id !== id));
    setDeleteConfirmId(null);
    toast.success("Skill deleted");
  };

  const handleEditClick = (skill: SkillItem) => {
    setEditingId(skill.id);
    form.setValue("skillTitle", skill.title);
    form.setValue("skillExp", skill.exp);
    setSkillLogo(skill.logo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSaveSection = (data: z.infer<typeof skillsSchema>) => {
    const payload = {
      heading: data.heading,
      description: data.description,
      viewAll: { text: data.viewAllText, link: data.viewAllLink },
      skills: skillsList
    };
    console.log("Final Payload:", payload);
    toast.success("Entire Skills Section saved successfully!");
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSkillLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-8 pb-24 px-4 sm:px-0">
        
        {/* HEADER AREA */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Skills Section</h1>
            <p className="text-muted-foreground text-sm">Manage your tech stack and section details.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => { if(confirm("Reset all changes?")) { form.reset(); setSkillsList([]); setSkillLogo(null); }}} className="gap-2 w-full sm:w-auto">
            <RotateCcw className="size-4" /> Reset All
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          
          <div className="lg:col-span-7 space-y-6">
            {/* SECTION SETTINGS */}
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Type className="size-4 text-primary" /> Header Settings
              </h2>
              <FormField control={form.control} name="heading" render={({ field }) => (
                <FormItem><FormLabel>Section Heading</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea className="min-h-[80px] resize-none" {...field} /></FormControl></FormItem>
              )} />
            </div>

            {/* SKILLS LIST TABLE */}
            <div className="rounded-xl border bg-card p-6 shadow-sm overflow-hidden">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <LayoutGrid className="size-4 text-primary" /> Active Skills
              </h2>
              <div className="overflow-x-auto -mx-6 px-6"> {/* Mobile Responsive Scroll Wrapper */}
                <Table className="min-w-[500px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Logo</TableHead>
                      <TableHead>Skill Name</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skillsList.map((skill) => (
                      <TableRow key={skill.id} className={cn(deleteConfirmId === skill.id && "bg-destructive/5")}>
                        <TableCell>
                          <div className="size-9 rounded bg-muted flex items-center justify-center overflow-hidden border">
                            {skill.logo ? <img src={skill.logo} alt="" className="object-contain p-1" /> : <Code2 className="size-4 opacity-20" />}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-sm">{skill.title}</TableCell>
                        <TableCell>
                          <span className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded-md font-bold uppercase whitespace-nowrap">
                            {skill.exp || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {deleteConfirmId === skill.id ? (
                            <div className="flex items-center justify-end gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                              <span className="text-[10px] font-bold text-destructive hidden sm:inline">Sure?</span>
                              <Button variant="destructive" size="icon" onClick={() => confirmDelete(skill.id)} className="size-8"><Check className="size-3" /></Button>
                              <Button variant="ghost" size="icon" onClick={() => setDeleteConfirmId(null)} className="size-8"><X className="size-3" /></Button>
                            </div>
                          ) : (
                            <div className="space-x-1">
                              <Button variant="ghost" size="icon" onClick={() => handleEditClick(skill)} className="size-8 hover:text-primary"><Edit2 className="size-3" /></Button>
                              <Button variant="ghost" size="icon" onClick={() => setDeleteConfirmId(skill.id)} className="size-8 text-destructive hover:bg-destructive/10"><Trash2 className="size-3" /></Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {skillsList.length === 0 && (
                      <TableRow><TableCell colSpan={4} className="text-center py-10 text-muted-foreground text-xs uppercase tracking-widest">No skills added yet</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* INPUT FORM */}
            <div className={cn(
              "rounded-xl border bg-card p-6 shadow-sm space-y-5 transition-all duration-300 sticky top-6",
              editingId ? "ring-2 ring-primary border-transparent shadow-lg" : "border-border"
            )}>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {editingId ? <Edit2 className="size-4" /> : <Plus className="size-4" />}
                {editingId ? "Update Skill" : "Add New Skill"}
              </h2>
              
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Skill Logo</Label>
                <div onClick={() => fileRef.current?.click()} className="relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-all cursor-pointer min-h-[100px]">
                  {skillLogo ? (
                    <div className="relative">
                      <img src={skillLogo} className="max-h-12 w-12 object-contain" />
                      <button type="button" onClick={(e) => { e.stopPropagation(); setSkillLogo(null); }} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"><X className="size-2" /></button>
                    </div>
                  ) : (
                    <div className="text-center"><Upload className="size-4 text-muted-foreground mx-auto mb-1" /><p className="text-[9px] text-muted-foreground uppercase font-bold">Upload Icon</p></div>
                  )}
                  <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleLogo} />
                </div>
              </div>

              <div className="grid gap-4">
                <FormField control={form.control} name="skillTitle" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs">Skill Name</FormLabel><FormControl><Input placeholder="React, Node..." {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="skillExp" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs">Experience</FormLabel><FormControl><Input placeholder="3+ Years" {...field} /></FormControl></FormItem>
                )} />
              </div>

              <Button type="button" onClick={handleAddOrUpdateSkill} className="w-full gap-2 font-bold shadow-sm">
                {editingId ? <Check className="size-4" /> : <Plus className="size-4" />}
                {editingId ? "Update Skill Item" : "Add to List"}
              </Button>
              
              {editingId && (
                <Button variant="outline" size="sm" className="w-full text-[10px] uppercase font-bold" onClick={() => {setEditingId(null); form.setValue("skillTitle", ""); form.setValue("skillExp", ""); setSkillLogo(null);}}>
                  Cancel Edit
                </Button>
              )}
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <ExternalLink className="size-3" /> Footer Link
              </h2>
              <div className="grid gap-3">
                <FormField control={form.control} name="viewAllText" render={({ field }) => (
                  <FormItem><FormControl><Input placeholder="Text (e.g. View All)" className="h-9 text-sm" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="viewAllLink" render={({ field }) => (
                  <FormItem><FormControl><Input placeholder="URL (e.g. /skills)" className="h-9 text-sm" {...field} /></FormControl></FormItem>
                )} />
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING ACTION BUTTON */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button onClick={form.handleSubmit(onSaveSection)} size="lg" className="rounded-full shadow-2xl gap-2 px-10 h-14 font-bold">
            <Save className="size-5" /> Save Skills Section
          </Button>
        </div>
      </div>
    </Form>
  );
}