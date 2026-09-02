'use client';

interface TerminalPromptProps {
  label: string;
  command: string;
}

export const TerminalPrompt = ({ label, command }: TerminalPromptProps) => (
  <div className="flex flex-col gap-2 mb-6">
    <div className="flex items-center gap-2 font-mono text-[11px] opacity-40">
       <span className="text-green-500">emerick@dev</span>
       <span className="text-white">:</span>
       <span className="text-blue-400">~</span>
       <span className="text-white">$</span>
       <span className="text-gray-300">{command}</span>
    </div>
    <h4 className="text-xl font-bold text-gray-100 tracking-tight">{label}</h4>
  </div>
);
