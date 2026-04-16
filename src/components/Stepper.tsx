"use client";

import React, { useState, useEffect, useRef, useLayoutEffect, Children, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

// --- COMPONENTES DO STEPPER ---

interface StepperProps {
  children: React.ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  validateStep?: (step: number) => boolean;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: Record<string, unknown>;
  nextButtonProps?: Record<string, unknown>;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
}

function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  validateStep = (step: number) => true,
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Voltar',
  nextButtonText = 'Próximo',
  disableStepIndicators = false,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const [failedSteps, setFailedSteps] = useState<number[]>([]); 
  const [shake, setShake] = useState(false);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  useEffect(() => {
    if (failedSteps.includes(currentStep) && validateStep(currentStep)) {
      setFailedSteps(prev => prev.filter(s => s !== currentStep));
    }
  }, [currentStep, validateStep, failedSteps]);

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    const isValid = validateStep(currentStep);
    
    if (isValid) {
      setFailedSteps(prev => prev.filter(s => s !== currentStep));
      if (!isLastStep) {
        setDirection(1);
        updateStep(currentStep + 1);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (!failedSteps.includes(currentStep)) {
        setFailedSteps(prev => [...prev, currentStep]);
      }
    }
  };

  const handleComplete = () => {
    const isValid = validateStep(currentStep);
    if (isValid) {
      setFailedSteps(prev => prev.filter(s => s !== currentStep));
      setDirection(1);
      updateStep(totalSteps + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (!failedSteps.includes(currentStep)) {
        setFailedSteps(prev => [...prev, currentStep]);
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center" {...rest}>
      <div className={`w-full ${stepCircleContainerClassName}`}>
        <div className={`${stepContainerClassName} flex w-full items-center p-4 sm:p-8 pb-4 sm:pb-4`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            const hasFailed = failedSteps.includes(stepNumber);
            
            return (
              <React.Fragment key={stepNumber}>
                <StepIndicator
                  step={stepNumber}
                  disableStepIndicators={disableStepIndicators}
                  currentStep={currentStep}
                  hasFailed={hasFailed}
                  onClickStep={(clicked: number) => {
                    if (clicked < currentStep || validateStep(currentStep)) {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    } else {
                      setShake(true);
                      setTimeout(() => setShake(false), 500);
                      if (!failedSteps.includes(currentStep)) {
                        setFailedSteps(prev => [...prev, currentStep]);
                      }
                    }
                  }}
                />
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`space-y-2 px-4 sm:px-8 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>
        {!isCompleted && (
          <div className={`px-4 sm:px-8 pb-8 ${footerClassName}`}>
            <div className={`mt-8 flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className="duration-350 rounded-lg px-4 py-2 text-sm font-medium transition text-gray-400 hover:text-white hover:bg-gray-800/50"
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <motion.button
                onClick={isLastStep ? handleComplete : handleNext}
                className={`duration-350 flex items-center justify-center rounded-lg py-2 px-5 text-sm font-medium text-white transition-all hover:scale-105 ${
                  failedSteps.includes(currentStep) ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
                }`}
                {...nextButtonProps}
              >
                {isLastStep ? (
                  <span className="flex items-center gap-2">
                    Enviar Mensagem <Send size={14} />
                  </span>
                ) : (
                  nextButtonText
                )}
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }: { isCompleted: boolean, currentStep: number, direction: number, children: React.ReactNode, className: string }) {
    const [parentHeight, setParentHeight] = useState(0);
  
    return (
      <motion.div
        style={{ position: 'relative', overflow: 'hidden' }}
        animate={{ height: isCompleted ? 0 : parentHeight }}
        transition={{ type: 'spring', duration: 0.4 }}
        className={className}
      >
        <AnimatePresence initial={false} mode="sync" custom={direction}>
          {!isCompleted && (
            <SlideTransition key={currentStep} direction={direction} onHeightReady={(h: number) => setParentHeight(h)}>
              {children}
            </SlideTransition>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
  
  function SlideTransition({ children, direction, onHeightReady }: { children: React.ReactNode, direction: number, onHeightReady: (h: number) => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
  
    useLayoutEffect(() => {
      if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
    }, [children, onHeightReady]);
  
    return (
      <motion.div
        ref={containerRef}
        custom={direction}
        variants={stepVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
      >
        {children}
      </motion.div>
    );
  }
  
  const stepVariants = {
    enter: (dir: number) => ({
      x: dir >= 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: '0%',
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir >= 0 ? '-50%' : '50%',
      opacity: 0
    })
  };
  
  export function Step({ children }: { children: React.ReactNode }) {
    return <div className="py-2 flex flex-col justify-center min-h-[220px] sm:min-h-[240px] w-full">{children}</div>;
  }
  
  function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators, hasFailed }: { step: number, currentStep: number, onClickStep: (step: number) => void, disableStepIndicators: boolean, hasFailed: boolean }) {
    const status = hasFailed ? 'failed' : currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';
  
    const handleClick = () => {
      if (!disableStepIndicators) onClickStep(step);
    };
  
    return (
      <motion.div
        onClick={handleClick}
        className={`relative outline-none focus:outline-none ${disableStepIndicators ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
        animate={status}
        initial={false}
      >
        <motion.div
          variants={{
            inactive: { scale: 1, backgroundColor: 'transparent', color: '#6b7280', borderColor: '#374151' },
            active: { scale: 1.1, backgroundColor: '#2563eb', color: '#ffffff', borderColor: '#2563eb' },
            complete: { scale: 1, backgroundColor: '#2563eb', color: '#ffffff', borderColor: '#2563eb' },
            failed: { scale: 1.1, backgroundColor: '#dc2626', color: '#ffffff', borderColor: '#dc2626' }
          }}
          transition={{ duration: 0.3 }}
          className="flex h-8 w-8 items-center justify-center rounded-full font-medium border text-sm"
        >
          {status === 'complete' ? (
            <CheckIcon className="h-4 w-4 text-white" />
          ) : status === 'failed' ? (
            <XIcon className="h-4 w-4 text-white" />
          ) : status === 'active' ? (
            <div className="h-2 w-2 rounded-full bg-white" />
          ) : (
            <span>{step}</span>
          )}
        </motion.div>
      </motion.div>
    );
  }
  
  function StepConnector({ isComplete }: { isComplete: boolean }) {
    return (
      <div className="relative mx-3 h-px flex-1 overflow-hidden bg-gray-800">
        <motion.div
          className="absolute left-0 top-0 h-full bg-blue-600"
          initial={false}
          animate={{ width: isComplete ? '100%' : '0%' }}
          transition={{ duration: 0.4 }}
        />
      </div>
    );
  }
  
  function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    );
  }
  
  function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );
  }

export default Stepper;
