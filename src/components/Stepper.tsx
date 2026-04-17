"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronRight, CheckCircle } from 'lucide-react';

interface StepperProps {
  children: React.ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  validateStep?: (step: number) => boolean;
  formState?: 'idle' | 'loading' | 'success' | string;
  backButtonText?: string;
  nextButtonText?: string;
}

function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  validateStep = () => true,
  formState = 'idle',
  backButtonText = '$ cd ..',
  nextButtonText = 'next_step',
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const [failedSteps, setFailedSteps] = useState<number[]>([]);
  const [shake, setShake] = useState(false);
  const stepsArray = React.Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isLastStep = currentStep === totalSteps;

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setFailedSteps(prev => prev.filter(s => s !== currentStep));
      if (!isLastStep) {
        setDirection(1);
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        onStepChange(nextStep);
      } else {
        onFinalStepCompleted();
        setCurrentStep(totalSteps + 1);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setFailedSteps(prev => [...new Set([...prev, currentStep])]);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      const previousStep = currentStep - 1;
      setCurrentStep(previousStep);
      onStepChange(previousStep);
    }
  };

  return (
    <div className="group relative bg-[#09090b]/80 backdrop-blur-2xl border border-white/[0.05] rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 min-h-[520px] flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-white/[0.01]">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 text-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-current"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-current"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-current"></div>
          </div>
          <div className="h-4 w-px bg-white/10 mx-1"></div>
          <div className="flex items-center gap-2 px-3 py-0.5 bg-black/20 border border-white/[0.03] rounded-md">
            <MessageSquare size={10} className="text-blue-500/50" />
            <span className="text-[10px] font-mono text-gray-500 tracking-tight lowercase">root/emerick/contact_process.sh</span>
          </div>
        </div>

        <div className="flex gap-1.5">
          {stepsArray.map((_, index) => (
            <div
              key={index}
              className={`h-1 transition-all duration-500 ${
                currentStep === index + 1
                  ? 'w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                  : currentStep > index + 1
                    ? 'w-4 bg-blue-500/20'
                    : 'w-4 bg-white/5'
              }`}
            />
          ))}
        </div>
      </div>

      <div className={`absolute inset-0 bg-[#0d1117]/98 backdrop-blur-md z-30 flex flex-col items-center justify-center p-12 transition-all duration-700 ${formState === 'success' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={formState === 'success' ? { scale: 1 } : { scale: 0 }}
          className="relative mb-8 text-center"
        >
          <CheckCircle size={80} className="text-blue-500 mx-auto relative z-10" />
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
        </motion.div>
        <h3 className="text-3xl font-bold text-white mb-3 text-center tracking-tight">Transmissão Concluída</h3>
        <p className="text-gray-500 text-center text-sm font-mono tracking-tight leading-relaxed">
          Exit code: 0x0000 (SUCCESS)<br />
          Payload delivered to cloud storage.<br />
          Expect a response shortly.
        </p>
      </div>

      <div className="flex-grow flex flex-col justify-center px-10 py-16">
        <AnimatePresence mode="wait" custom={direction}>
          {currentStep <= totalSteps && (
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              {stepsArray[currentStep - 1]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {currentStep <= totalSteps && (
        <div className="px-10 pb-10 mt-auto">
          <div className="flex justify-between items-center pt-8 border-t border-white/[0.03]">
            <button
              onClick={handleBack}
              className={`text-[10px] font-mono tracking-widest transition-colors ${
                currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              {backButtonText}
            </button>
            <motion.button
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              onClick={handleNext}
              className={`flex items-center gap-3 px-8 py-2.5 rounded-lg text-[10px] font-mono uppercase tracking-[0.2em] transition-all ${
                failedSteps.includes(currentStep)
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                  : 'bg-white text-black hover:bg-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-95'
              }`}
            >
              {isLastStep ? './execute_send' : `./${nextButtonText}`}
              <ChevronRight size={14} />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

const stepVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 15 : -15, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -15 : 15, opacity: 0 }),
};

export function Step({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[220px] w-full flex flex-col justify-center">{children}</div>;
}

export default Stepper;
