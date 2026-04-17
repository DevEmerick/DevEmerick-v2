'use client';

import { GitBranch, Globe, FolderCode } from 'lucide-react';
import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  slug: string;
  openLabel?: string;
}

export const ProjectCard = ({ title, description, tags, icon: Icon, slug, openLabel = 'Open' }: ProjectCardProps) => {
  return (
    <div className="group relative h-full bg-gray-900/10 backdrop-blur-xl border border-white/[0.05] rounded-xl overflow-hidden transition-all duration-500 hover:border-blue-500/30 shadow-2xl flex flex-col">
      <div className="bg-white/[0.01] px-5 py-3 border-b border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/5 group-hover:bg-red-500/20 transition-colors"></div>
            <div className="w-2 h-2 rounded-full bg-white/5 group-hover:bg-yellow-500/20 transition-colors"></div>
            <div className="w-2 h-2 rounded-full bg-white/5 group-hover:bg-green-500/20 transition-colors"></div>
          </div>
          <div className="h-4 w-px bg-white/10 mx-1"></div>
          <div className="flex items-center gap-2 px-3 py-0.5 bg-black/20 border border-white/[0.03] rounded-md">
            <Globe size={10} className="text-blue-400 opacity-40 group-hover:opacity-100 transition-opacity" />
            <span className="text-[9px] font-mono text-gray-500 tracking-tight lowercase group-hover:text-gray-400 transition-colors">{slug}.app</span>
          </div>
        </div>
        <GitBranch size={14} className="text-gray-600 hover:text-white transition-colors cursor-pointer" />
      </div>

      <div className="p-7 flex-grow relative flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2.5 bg-gray-950 border border-white/[0.05] rounded-lg text-blue-500/70 group-hover:text-blue-400 transition-all duration-500">
            <Icon size={22} strokeWidth={1.5} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-gray-100 tracking-tight group-hover:text-white transition-colors">{title}</h3>
            <div className="flex items-center gap-1.5 opacity-20 text-[9px] font-mono uppercase tracking-widest text-gray-400">
              <FolderCode size={10} />
              <span>src/apps/{slug}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-[13px] leading-relaxed mb-8 font-light flex-grow">{description}</p>

        <div className="mt-auto pt-6 border-t border-white/[0.03] flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[9px] font-mono px-2 py-0.5 text-gray-600 border border-white/[0.03] rounded uppercase tracking-tighter group-hover:text-gray-500 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          <button className="group/btn bg-white text-black px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-all shadow-lg flex items-center gap-2 font-mono whitespace-nowrap active:scale-95">
            <span>&gt; {openLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

