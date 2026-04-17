'use client';

import { Code2, FileJson } from 'lucide-react';

interface UnifiedExperienceCardProps {
  role: string;
  company: string;
  period: string;
  description: string;
}

export const UnifiedExperienceCard = ({ role, company, period, description }: UnifiedExperienceCardProps) => {
  return (
    <div className="group relative w-full bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 shadow-2xl">
      <div className="flex flex-col md:flex-row min-h-[260px]">
        <div className="w-full md:w-[35%] bg-[#0d1117]/60 p-6 border-b md:border-b-0 md:border-r border-gray-800/50 font-mono text-[11px] leading-relaxed">
          <div className="flex items-center justify-between mb-6 opacity-40">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/40"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
            </div>
            <FileJson size={12} />
          </div>
          <div className="space-y-1 group-hover:translate-x-1 transition-transform duration-500">
            <p><span className="text-purple-400">const</span> <span className="text-blue-300">info</span> = {'{'}</p>
            <p className="pl-4"><span className="text-orange-300">org</span>: <span className="text-green-300">'{company}'</span>,</p>
            <p className="pl-4"><span className="text-orange-300">date</span>: <span className="text-green-300">'{period}'</span>,</p>
            <p className="pl-4"><span className="text-orange-300">stack</span>: [<span className="text-blue-300">'React'</span>, <span className="text-blue-300">'Node'</span>]</p>
            <p>{'};'}</p>
          </div>
        </div>
        <div className="w-full md:w-[65%] p-7 md:p-9 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-transparent to-blue-500/[0.02]">
          <Code2 size={120} className="absolute -right-8 -bottom-8 text-gray-800/10 group-hover:text-blue-500/5 transition-colors pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
               <span className="h-px w-6 bg-blue-500/50"></span>
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500/70">Overview</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-500">{role}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg">{description}</p>
            <div className="flex flex-wrap gap-2">
              {['Performance', 'Scalability', 'Clean Code'].map(tag => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-wider bg-gray-950/50 border border-gray-800 px-2.5 py-1 rounded text-gray-500 group-hover:border-blue-500/20 group-hover:text-blue-400/80 transition-all">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
