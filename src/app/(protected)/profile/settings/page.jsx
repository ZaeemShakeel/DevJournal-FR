"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { authAPI } from "@/services/api";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { 
  Camera, 
  Image as ImageIcon, 
  Save, 
  Trash2, 
  Plus,
  User as UserIcon,
  Briefcase,
  Building2,
  MapPin,
  AlignLeft,
  Code2,
  Github,
  Linkedin,
  Globe,
  Instagram,
  Facebook,
  Award
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileSettings() {
  const { user, checkAuth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    designation: "",
    company: "",
    bio: "",
    location: "",
    profilePic: "",
    bannerImage: "",
    techStack: "",
    experience: [],
    socialLinks: {
      github: "",
      linkedin: "",
      website: "",
      instagram: "",
      facebook: "",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        designation: user.designation || "",
        company: user.company || "",
        bio: user.bio || "",
        location: user.location || "",
        profilePic: user.profilePic || "",
        bannerImage: user.bannerImage || "",
        techStack: user.techStack ? user.techStack.join(", ") : "",
        experience: user.experience || [],
        socialLinks: {
          github: user.socialLinks?.github || "",
          linkedin: user.socialLinks?.linkedin || "",
          website: user.socialLinks?.website || "",
          instagram: user.socialLinks?.instagram || "",
          facebook: user.socialLinks?.facebook || "",
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social_")) {
      const socialKey = name.split("_")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [socialKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const newExp = [...formData.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    setFormData((prev) => ({ ...prev, experience: newExp }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { role: "", company: "", duration: "" }],
    }));
  };

  const removeExperience = (index) => {
    const newExp = [...formData.experience];
    newExp.splice(index, 1);
    setFormData((prev) => ({ ...prev, experience: newExp }));
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mern_uploads"); // Hidden default preset
    data.append("api_key", "Oh6NAb0kvqV7Qf2FbFodLBgvAOs");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/daqjaedyw/image/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.error) {
        toast.error("Upload failed: " + result.error.message);
        return null;
      }
      return result.secure_url;
    } catch (error) {
      toast.error("Upload failed.");
      return null;
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.loading("Uploading image...", { id: `upload-${type}` });
    const url = await uploadToCloudinary(file);
    toast.dismiss(`upload-${type}`);

    if (url) {
      toast.success("Image uploaded successfully!");
      setFormData((prev) => ({ ...prev, [type]: url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        techStack: formData.techStack.split(",").map((t) => t.trim()).filter((t) => t !== ""),
      };

      const res = await authAPI.updateProfile(payload);
      if (res.data.success) {
        toast.success("Profile updated successfully!");
        await checkAuth();
        if (formData.username) {
          router.push(`/dev/${formData.username}`);
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50/50 dark:bg-[#030712] py-12 px-4 transition-colors duration-500">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Public <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Profile</span></h1>
              <p className="text-slate-500 font-medium mt-1">Design how you appear to the developer community.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Header & Media Section */}
            <div className="glass-morphism rounded-[2rem] overflow-hidden border border-slate-200/60 dark:border-white/10 shadow-xl dark:shadow-2xl/50 relative bg-white/50 dark:bg-slate-900/50">
              <div className="p-1">
                {/* Banner Upload */}
                <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-800 rounded-t-[1.8rem] flex items-center justify-center group overflow-hidden">
                  {formData.bannerImage ? (
                    <img src={formData.bannerImage} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="flex flex-col items-center text-slate-400">
                       <ImageIcon size={48} className="mb-2 opacity-50" />
                       <span className="text-sm font-semibold tracking-wider uppercase">Cover Photo</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <label className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full cursor-pointer flex items-center shadow-2xl transition-all hover:scale-105">
                      <Camera size={20} className="mr-2" /> Change Cover
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "bannerImage")} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Profile Avatar Upload */}
              <div className="relative px-8 pb-8 -mt-20">
                <div className="relative w-40 h-40 rounded-[2rem] border-8 border-white/80 dark:border-[#030712]/80 bg-slate-100 dark:bg-slate-800 shadow-2xl flex items-center justify-center overflow-hidden group rotate-3 hover:rotate-0 transition-transform duration-500">
                  {formData.profilePic ? (
                    <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={48} className="text-slate-400" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-[2px]">
                    <label className="text-white flex flex-col items-center cursor-pointer transform scale-90 group-hover:scale-100 transition-transform">
                      <Camera size={28} className="mb-1 text-primary drop-shadow-md" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Update</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "profilePic")} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Core Info */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Basic Details Box */}
                <div className="glass-morphism p-8 rounded-[2rem] border border-slate-200/60 dark:border-white/10 shadow-lg bg-white/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex justify-center items-center">
                      <UserIcon size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Identity</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Username <span className="text-error">*</span></label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input required type="text" name="username" value={formData.username} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-200 transition-shadow shadow-sm hover:shadow-md" placeholder="zaeem_dev" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Designation</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-200 transition-shadow shadow-sm hover:shadow-md" placeholder="Full Stack Developer" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Company</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-200 transition-shadow shadow-sm hover:shadow-md" placeholder="DevJournal Labs" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-200 transition-shadow shadow-sm hover:shadow-md" placeholder="New York, USA" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">About You</label>
                    <div className="relative">
                      <AlignLeft className="absolute left-4 top-4 text-slate-400" size={18} />
                      <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-200 min-h-[120px] transition-shadow shadow-sm hover:shadow-md resize-y" placeholder="Tell us about yourself..."></textarea>
                    </div>
                  </div>
                </div>

                {/* Experience Journey */}
                <div className="glass-morphism p-8 rounded-[2rem] border border-slate-200/60 dark:border-white/10 shadow-lg bg-white/50 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex justify-center items-center">
                        <Award size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Journey</h3>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={addExperience} className="h-9 px-4 rounded-lg bg-white dark:bg-[#0a0f1c] shadow-sm hover:border-primary border-slate-200 dark:border-white/10">
                      <Plus size={16} className="mr-1.5"/> Add Path
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.experience.length === 0 ? (
                      <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl text-slate-400 font-medium text-sm">
                        No professional experience added yet.
                      </div>
                    ) : (
                      formData.experience.map((exp, index) => (
                        <div key={index} className="flex gap-4 items-start p-5 bg-white dark:bg-[#0a0f1c] rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm relative group overflow-hidden">
                          <button type="button" onClick={() => removeExperience(index)} className="absolute top-0 right-0 h-full w-12 bg-error/10 text-error flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-full group-hover:translate-x-0">
                            <Trash2 size={18} />
                          </button>
                          
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1 border border-primary/20">
                            <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                          </div>
                          
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 pr-6">
                            <div>
                               <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">Role</label>
                               <input type="text" placeholder="Frontend Dev" value={exp.role} onChange={(e) => handleExperienceChange(index, "role", e.target.value)} className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 pb-1 text-sm focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200" />
                            </div>
                            <div>
                               <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">Company</label>
                               <input type="text" placeholder="Google" value={exp.company} onChange={(e) => handleExperienceChange(index, "company", e.target.value)} className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 pb-1 text-sm focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200" />
                            </div>
                            <div>
                               <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">Duration</label>
                               <input type="text" placeholder="2021 - Present" value={exp.duration} onChange={(e) => handleExperienceChange(index, "duration", e.target.value)} className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 pb-1 text-sm focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200" />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Side Info */}
              <div className="space-y-8">
                
                {/* Tech Stack */}
                <div className="glass-morphism p-8 rounded-[2rem] border border-slate-200/60 dark:border-white/10 shadow-lg bg-white/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex justify-center items-center">
                      <Code2 size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Arsenal</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Tech Stack</label>
                    <textarea name="techStack" value={formData.techStack} onChange={handleChange} className="w-full p-4 bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-200 min-h-[100px] transition-shadow shadow-sm" placeholder="React.js, Next.js, MongoDB, TailwindCSS... (Comma separated)" />
                  </div>
                </div>

                {/* Social Links */}
                <div className="glass-morphism p-8 rounded-[2rem] border border-slate-200/60 dark:border-white/10 shadow-lg bg-white/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex justify-center items-center">
                      <Globe size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Connect</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Github className="text-slate-400" size={18} />
                      </div>
                      <input type="url" name="social_github" value={formData.socialLinks.github} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-slate-200 placeholder:text-slate-400" placeholder="GitHub URL" />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Linkedin className="text-slate-400" size={18} />
                      </div>
                      <input type="url" name="social_linkedin" value={formData.socialLinks.linkedin} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-slate-200 placeholder:text-slate-400" placeholder="LinkedIn URL" />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="text-slate-400" size={18} />
                      </div>
                      <input type="url" name="social_website" value={formData.socialLinks.website} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-slate-200 placeholder:text-slate-400" placeholder="Personal Website" />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Instagram className="text-slate-400" size={18} />
                      </div>
                      <input type="url" name="social_instagram" value={formData.socialLinks.instagram} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-slate-200 placeholder:text-slate-400" placeholder="Instagram URL" />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Facebook className="text-slate-400" size={18} />
                      </div>
                      <input type="url" name="social_facebook" value={formData.socialLinks.facebook} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-slate-200 placeholder:text-slate-400" placeholder="Facebook URL" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Bar Footer */}
            <div className="fixed bottom-0 left-0 right-0 md:relative md:bg-transparent bg-white/90 dark:bg-[#030712]/90 backdrop-blur-md md:backdrop-blur-none border-t border-slate-200 dark:border-white/5 md:border-transparent p-4 md:p-0 z-50 flex justify-end">
               <div className="max-w-5xl mx-auto w-full flex justify-end gap-3">
                 <Button type="button" variant="outline" className="h-12 px-6 rounded-xl bg-white dark:bg-[#0a0f1c] shadow-sm border-slate-200 dark:border-white/10" onClick={() => router.back()}>Cancel</Button>
                 <Button type="submit" disabled={loading} className="h-12 px-8 rounded-xl shadow-xl shadow-primary/20 min-w-[200px] text-sm tracking-wide">
                   {loading ? "Committing changes..." : <><Save size={18} className="mr-2"/> Save Profile</>}
                 </Button>
               </div>
            </div>
            
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
