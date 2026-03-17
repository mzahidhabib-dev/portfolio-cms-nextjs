"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Save, Upload, Type, ExternalLink, X, RotateCcw, 
  Edit2, Plus, Trash2, Layout, Check, AlertCircle, ChevronDown, ChevronUp
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

// --- SCHEMAS & INTERFACES ---
const projectsSchema = z.object({
  heading: z.string().optional(),
  description: z.string().optional(),
  viewAllText: z.string().optional(),
  viewAllLink: z.string().optional(),
  projectTitle: z.string().min(1, "Title is required"),
  projectDesc: z.string().optional(),
  projectTech: z.string().optional(),
  repoLink: z.string().optional(),
  demoLink: z.string().optional(),
});

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repo: string;
  demo: string;
  image: string | null;
}

export default function ProjectsPage() {
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({}); // Track which cards are expanded
  
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof projectsSchema>>({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      heading: "Latest Projects",
      description: "A showcase of my recent work and technical experiments.",
      viewAllText: "View More Projects",
      viewAllLink: "/projects",
      projectTitle: "",
      projectDesc: "",
      projectTech: "",
      repoLink: "",
      demoLink: "",
    },
  });

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddOrUpdateProject = () => {
    const data = form.getValues();
    if (!data.projectTitle) return toast.error("Project title is required");

    const techArray = data.projectTech ? data.projectTech.split(",").map(t => t.trim()).filter(t => t !== "") : [];

    const projectData = {
      title: data.projectTitle,
      description: data.projectDesc || "",
      tech: techArray,
      repo: data.repoLink || "",
      demo: data.demoLink || "",
      image: projectImage,
    };

    if (editingId) {
      setProjectsList(prev => prev.map(p => p.id === editingId ? { ...projectData, id: p.id } : p));
      setEditingId(null);
      toast.success("Project updated");
    } else {
      setProjectsList(prev => [...prev, { ...projectData, id: Date.now().toString() }]);
      toast.success("Project added to showcase");
    }

    form.setValue("projectTitle", "");
    form.setValue("projectDesc", "");
    form.setValue("projectTech", "");
    form.setValue("repoLink", "");
    form.setValue("demoLink", "");
    setProjectImage(null);
  };

  const confirmDelete = (id: string) => {
    setProjectsList(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
    toast.success("Project removed");
  };

  const handleEditClick = (project: ProjectItem) => {
    setEditingId(project.id);
    form.setValue("projectTitle", project.title);
    form.setValue("projectDesc", project.description);
    form.setValue("projectTech", project.tech.join(", "));
    form.setValue("repoLink", project.repo);
    form.setValue("demoLink", project.demo);
    setProjectImage(project.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSaveSection = (data: z.infer<typeof projectsSchema>) => {
    const payload = {
      heading: data.heading,
      description: data.description,
      viewAll: { text: data.viewAllText, link: data.viewAllLink },
      projects: projectsList
    };
    console.log("Saving Projects Section:", payload);
    toast.success("Projects section saved!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProjectImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-8 pb-24 px-4 sm:px-0">
        
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects Section</h1>
            <p className="text-muted-foreground text-sm">Manage your portfolio and showcase your work.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => { form.reset(); setProjectsList([]); setProjectImage(null); }} className="gap-2">
            <RotateCcw className="size-4" /> Reset All
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Type className="size-4 text-primary" /> Header Settings
              </h2>
              <FormField control={form.control} name="heading" render={({ field }) => (
                <FormItem><FormLabel>Section Heading</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea className="min-h-[80px] resize-none" {...field} /></FormControl></FormItem>
              )} />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 px-1">
                <Layout className="size-4 text-primary" /> Active Projects
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {projectsList.map((project) => (
                  <div key={project.id} className="group relative rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all h-fit">
                    
                    {deleteId === project.id && (
                      <div className="absolute inset-0 z-20 bg-destructive/95 flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in duration-200">
                        <AlertCircle className="size-8 text-white mb-2" />
                        <p className="text-white text-[10px] font-bold uppercase mb-4 tracking-widest">Delete Project?</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" onClick={() => confirmDelete(project.id)}>Yes</Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setDeleteId(null)}>Cancel</Button>
                        </div>
                      </div>
                    )}

                    <div className="aspect-video bg-muted relative overflow-hidden">
                      {project.image ? (
                        <img src={project.image} alt="" className="object-cover w-full h-full" />
                      ) : (
                        <div className="flex items-center justify-center h-full opacity-20"><Layout className="size-12" /></div>
                      )}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Button size="icon" variant="secondary" className="size-8 shadow-lg" onClick={() => handleEditClick(project)}><Edit2 className="size-3" /></Button>
                        <Button size="icon" variant="destructive" className="size-8 shadow-lg" onClick={() => setDeleteId(project.id)}><Trash2 className="size-3" /></Button>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-sm truncate">{project.title}</h3>
                      
                      {/* EXPANDABLE DESCRIPTION */}
                      <div className="space-y-1">
                        <p className={cn(
                          "text-[11px] text-muted-foreground leading-relaxed transition-all",
                          !expandedIds[project.id] && "line-clamp-2"
                        )}>
                          {project.description || "No description."}
                        </p>
                        {project.description && project.description.length > 60 && (
                          <button 
                            onClick={() => toggleExpand(project.id)}
                            className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline"
                          >
                            {expandedIds[project.id] ? (
                              <>See Less <ChevronUp className="size-3" /></>
                            ) : (
                              <>See More <ChevronDown className="size-3" /></>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 pt-2">
                        {project.tech.map((t, i) => (
                          <span key={i} className="text-[8px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {projectsList.length === 0 && (
                  <div className="col-span-full border-2 border-dashed rounded-xl py-20 text-center text-muted-foreground bg-muted/5">
                    <Layout className="size-8 mx-auto mb-2 opacity-20" />
                    <p className="text-xs uppercase font-bold tracking-widest">No projects added yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className={cn(
              "rounded-xl border bg-card p-6 shadow-sm space-y-5 transition-all duration-300 sticky top-6",
              editingId ? "ring-2 ring-primary border-transparent shadow-lg" : "border-border"
            )}>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {editingId ? <Edit2 className="size-4" /> : <Plus className="size-4" />}
                {editingId ? "Update Project" : "Add Project"}
              </h2>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Thumbnail</Label>
                <div onClick={() => fileRef.current?.click()} className="relative border-2 border-dashed rounded-xl overflow-hidden aspect-video flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-all cursor-pointer bg-muted/20">
                  {projectImage ? (
                    <>
                      <img src={projectImage} className="w-full h-full object-cover" />
                      <button type="button" onClick={(e) => { e.stopPropagation(); setProjectImage(null); }} className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1 shadow-md hover:scale-110"><X className="size-3" /></button>
                    </>
                  ) : (
                    <div className="text-center"><Upload className="size-5 text-muted-foreground mx-auto mb-1" /><p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Upload Image</p></div>
                  )}
                  <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-4">
                <FormField control={form.control} name="projectTitle" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs">Project Name</FormLabel><FormControl><Input placeholder="Chat App" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="projectDesc" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs">Description</FormLabel><FormControl><Textarea placeholder="Explain your project..." className="resize-none h-24 text-sm" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="projectTech" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs">Stack (comma separated)</FormLabel><FormControl><Input placeholder="Next.js, Prisma, Tailwind" {...field} /></FormControl></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-3">
                  <FormField control={form.control} name="repoLink" render={({ field }) => (
                    <FormItem><FormLabel className="text-xs">Github</FormLabel><FormControl><Input placeholder="Link" {...field} /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name="demoLink" render={({ field }) => (
                    <FormItem><FormLabel className="text-xs">Demo</FormLabel><FormControl><Input placeholder="Link" {...field} /></FormControl></FormItem>
                  )} />
                </div>
              </div>

              <Button type="button" onClick={handleAddOrUpdateProject} className="w-full gap-2 font-bold uppercase text-xs tracking-widest">
                {editingId ? <Check className="size-4" /> : <Plus className="size-4" />}
                {editingId ? "Update Item" : "Add to List"}
              </Button>
              
              {editingId && (
                <Button variant="outline" size="sm" className="w-full text-[10px] uppercase font-bold" onClick={() => {setEditingId(null); setProjectImage(null); form.setValue("projectTitle", ""); }}>
                  Cancel Edit
                </Button>
              )}
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <ExternalLink className="size-3" /> External Link
              </h2>
              <div className="grid gap-3">
                <FormField control={form.control} name="viewAllText" render={({ field }) => (
                  <FormItem><FormControl><Input placeholder="Button Text" className="h-9 text-xs" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="viewAllLink" render={({ field }) => (
                  <FormItem><FormControl><Input placeholder="/projects" className="h-9 text-xs" {...field} /></FormControl></FormItem>
                )} />
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 right-8 z-50">
          <Button onClick={form.handleSubmit(onSaveSection)} size="lg" className="rounded-full shadow-2xl gap-2 px-10 h-14 font-bold">
            <Save className="size-5" /> Save Projects Section
          </Button>
        </div>
      </div>
    </Form>
  );
}