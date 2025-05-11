"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { simeonWansiScenario, ScenarioStep, AgentAction } from '@/lib/potential-clients-data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { EnhancedAvatar } from '@/components/ui/enhanced-avatar';
import ErrorBoundary from '@/components/ui/error-boundary';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BrainCircuit, Sparkles } from 'lucide-react';

// Text streaming effect component
interface StreamingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const StreamingText = ({ text, speed = 15, className = "" }: StreamingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);
  
  return <div className={className}>{displayedText}</div>;
};

// Agent thinking component with phased display
interface AgentThinkingProps {
  agent: AgentAction;
  onComplete: () => void;
}

const AgentThinking = ({ agent, onComplete }: AgentThinkingProps) => {
  const [phase, setPhase] = useState<"thinking" | "action" | "execution">("thinking");
  const [isComplete, setIsComplete] = useState(false);
  const phaseTimers = useRef<{thinking?: NodeJS.Timeout, action?: NodeJS.Timeout, completion?: NodeJS.Timeout}>({});
  
  useEffect(() => {
    console.log(`Agent thinking started: ${agent.role}`);
    
    // Simulate thinking phase timing
    phaseTimers.current.thinking = setTimeout(() => {
      console.log(`Agent ${agent.role} - Action phase`);
      setPhase("action");
      
      // Simulate action phase timing with 1 second extra delay
      phaseTimers.current.action = setTimeout(() => {
        console.log(`Agent ${agent.role} - Execution phase`);
        setPhase("execution");
        
        // Add a delay after showing the execution content before marking as complete
        // with 1 second extra delay before final execution completes
        phaseTimers.current.completion = setTimeout(() => {
          console.log(`Agent ${agent.role} - Complete`);
          setIsComplete(true);
          
          // Notify parent component that agent is complete
          onComplete();
        }, 4000); // Wait 4 seconds after showing content before advancing (3s original + 1s extra)
      }, 4000); // 4 seconds for action phase (3s original + 1s extra)
    }, 5000); // 5 seconds for thinking phase (4s original + 1s extra)
    
    // Cleanup timers on unmount
    return () => {
      Object.values(phaseTimers.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [agent.role, onComplete]);
  
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-3 mb-4">
        <EnhancedAvatar 
          src={agent.avatar} 
          alt={agent.role}
          className="size-12 border-2 border-blue-500 ring-2 ring-blue-300 ring-opacity-50"
        />
        <div>
          <h3 className="font-semibold text-lg">{agent.role}</h3>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800">AI Agent</Badge>
            <Badge variant="outline">{agent.title}</Badge>
            <Badge variant="outline" className="bg-blue-50">{agent.expertise}</Badge>
          </div>
        </div>
      </div>

      <Card className="ml-12 mb-4 border-l-4 border-l-blue-500 py-0">
        <CardContent>
          {phase === "thinking" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="text-blue-600 size-5 animate-pulse" />
                <h4 className="font-semibold text-blue-600">Thinking<span className="animate-pulse">...</span></h4>
              </div>
              
              <div className="space-y-2 pl-4 text-sm text-gray-600">
                {agent.thinkingProcess.map((thought, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.5, duration: 0.3 }}
                    className="flex items-start"
                  >
                    <span className="inline-block size-1.5 rounded-full bg-blue-300 mt-1.5 mr-2 flex-shrink-0"></span>
                    <p>{thought}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {phase === "action" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-amber-600 size-5 animate-pulse" />
                <h4 className="font-semibold text-amber-600">Taking Action<span className="animate-pulse">...</span></h4>
              </div>
              
              <div className="space-y-2 pl-4 text-sm text-gray-600">
                {agent.actions.map((action, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.5, duration: 0.3 }}
                    className="flex items-start"
                  >
                    <span className="inline-block size-1.5 rounded-full bg-amber-300 mt-1.5 mr-2 flex-shrink-0"></span>
                    <p>{action}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {phase === "execution" && (
            <div className="text-sm">
              <StreamingText text={agent.finalContent} speed={10} />
            </div>
          )}
        </CardContent>
      </Card>
      
      {phase === "execution" && agent.finalContent && isComplete && (
        <div className="ml-12 flex justify-end">
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Task Complete</Badge>
        </div>
      )}
    </motion.div>
  );
};

// Client response component
interface ClientResponseProps {
  response: {
    content: string;
    interestPoints?: string[];
    decisionFactors?: string[];
    communicationMethod?: string;
  }
}

const ClientResponse = ({ response }: ClientResponseProps) => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-3 mb-4 justify-end">
        <div className="text-right">
          <h3 className="font-semibold text-lg">Simeon Wansi</h3>
          <div className="flex gap-2 justify-end">
            <Badge variant="outline" className="bg-gray-50">CTO, Dubai Technologies LLC</Badge>
          </div>
        </div>
        <EnhancedAvatar 
          src="/avatars/simeon_wansi.png" 
          alt="Simeon Wansi"
          className="size-12 border-2 border-gray-300"
        />
      </div>

      <Card className="mr-12 mb-4 border-r-4 border-r-gray-400 bg-gray-50 py-0">
        <CardContent>
          <div className="text-sm">
            <StreamingText text={response.content} speed={10} />
          </div>
          
          {response.interestPoints && response.interestPoints.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium mb-2">Key Interest Points:</h4>
              <div className="flex flex-wrap gap-2">
                {response.interestPoints.map((point, index) => (
                  <Badge key={index} variant="outline" className="bg-amber-50">{point}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {response.decisionFactors && response.decisionFactors.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-medium mb-2">Decision Factors:</h4>
              <div className="grid grid-cols-1 gap-1">
                {response.decisionFactors.map((factor, index) => (
                  <div key={index} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="inline-block size-1.5 rounded-full bg-green-300 mt-1 mr-1 flex-shrink-0"></span>
                    {factor}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {response.communicationMethod && (
        <div className="mr-12 flex justify-start">
          <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200">{response.communicationMethod}</Badge>
        </div>
      )}
    </motion.div>
  );
};

// Visual content component (documents, products, etc.)
interface VisualContentProps {
  content: {
    type: string;
    image?: string;
    content: string;
  }
}

const VisualContent = ({ content }: VisualContentProps) => {
  return (
    <motion.div 
      className="my-12 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden py-0">
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white p-4">
          <h3 className="font-medium">{content.type.charAt(0).toUpperCase() + content.type.slice(1)} Visualization</h3>
        </div>
        
        {content.image && (
          <div className="p-4 flex justify-center">
            <img 
              src={content.image} 
              alt={content.type} 
              className="max-h-64 object-contain rounded-md"
              loading="lazy"
              onError={(e) => {
                // Fallback to a generic image or hide
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <CardContent className="bg-gray-50 whitespace-pre-line">
          <StreamingText text={content.content} speed={8} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main client scenario component with TypeScript interface definitions
interface StreamingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

interface ClientResponseProps {
  response: {
    content: string;
    interestPoints?: string[];
    decisionFactors?: string[];
    communicationMethod?: string;
  }
}

interface VisualContentProps {
  content: {
    type: string;
    image?: string;
    content: string;
  }
}

const ClientScenarioView = ({ clientId }: { clientId: string }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1); // Start at -1 to delay the first step
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [isAgentComplete, setIsAgentComplete] = useState(false);
  const [stepsInProgress, setStepsInProgress] = useState<string[]>([]);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Get scenario steps for the client
  const scenarioSteps = simeonWansiScenario;
  const currentStep = currentStepIndex >= 0 ? scenarioSteps[currentStepIndex] : null;
  
  // Initial 2-second delay before starting the scenario
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setCurrentStepIndex(0);
    }, 2000); // 2-second initial delay
    
    return () => clearTimeout(initialDelay);
  }, []);

  // When a new step becomes current, add it to in-progress steps
  useEffect(() => {
    if (currentStep && !stepsInProgress.includes(currentStep.id)) {
      setStepsInProgress([...stepsInProgress, currentStep.id]);
    }
  }, [currentStepIndex, currentStep, stepsInProgress]);

  // Handle agent completion
  const handleAgentComplete = () => {
    if (currentStep && currentStep.agentAction) {
      console.log(`Agent completed for step: ${currentStep.id}`);
      // Update both states in the same render cycle
      setIsAgentComplete(true);
      setCompletedAgents(prev => [...prev, currentStep.id]);
    }
  };

  // Auto-advance through steps with proper timing
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (currentStep) {
      const shouldAdvance = 
        // If agent is complete or there is no agent action
        (isAgentComplete || !currentStep.agentAction) && 
        // And step has a response or content (or it's the first step)
        (currentStep.clientResponse || currentStep.visualContent || currentStepIndex === 0);
      
      if (shouldAdvance) {
        // Log the current state for debugging
        console.log(`Step ${currentStepIndex} (${currentStep.id}) complete, advancing...`);
        console.log(`Agent complete: ${isAgentComplete}, Has agent: ${!!currentStep.agentAction}`);
        
        timeout = setTimeout(() => {
          const nextIndex = currentStepIndex + 1;
          
          // Check if there are more steps
          if (nextIndex < scenarioSteps.length) {
            console.log(`Moving to step ${nextIndex}: ${scenarioSteps[nextIndex].id}`);
            setCurrentStepIndex(nextIndex);
            setIsAgentComplete(false);
            
            // Scroll to the latest content with a small delay to ensure rendering
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.scrollTo({
                  top: containerRef.current.scrollHeight,
                  behavior: 'smooth'
                });
              }
            }, 300); // Increased delay for more reliable scrolling
          } else {
            console.log('Reached end of scenario steps');
          }
        }, 6000); // Slightly reduced wait time between steps for better UX
      }
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentStepIndex, isAgentComplete, currentStep, scenarioSteps]);

  return (
    <ErrorBoundary>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-8">
        <Button 
          variant="ghost" 
          className="flex items-center gap-1" 
          onClick={() => router.push('/potential-clients')}
        >
          <ArrowLeft size={16} />
          Back to Directory
        </Button>
        
        <div className="flex items-center">
          <Badge variant="secondary" className="mr-2">Client Scenario</Badge>
          <Badge variant="outline">Simulated AI Interaction</Badge>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-8">
        <EnhancedAvatar 
          src="/avatars/simeon_wansi.png"
          alt="Simeon Wansi"
          className="size-16 border-2 border-blue-500"
        />
        <div>
          <h1 className="text-2xl font-bold">Simeon Wansi</h1>
          <p className="text-gray-600">CTO at Dubai Technologies LLC</p>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {scenarioSteps.map((step, idx) => (
            <div 
              key={idx}
              className={`size-3 rounded-full ${
                idx <= currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Initial Detection</span>
          <span className="text-center">Outreach</span>
          <span className="text-center">Client Response</span>
          <span className="text-center">Contract</span>
          <span className="text-center">Loyalty</span>
          <span className="text-center">Lease</span>
          <span className="text-center">Vehicle</span>
          <span className="text-right">Investment</span>
        </div>
      </div>
      
      {/* Scenario steps display area */}
      <div 
        ref={containerRef}
        className="bg-white rounded-lg shadow-sm border p-6 overflow-y-auto max-h-[calc(100vh-280px)]"
      >
        {scenarioSteps.slice(0, currentStepIndex + 1).map((step, idx) => (
          <div key={step.id} className="mb-12">
            <div className="py-2 px-4 bg-gray-100 rounded-md mb-6">
              <h2 className="font-semibold">{step.title}</h2>
            </div>
            
            {/* Agent thinking - show animation for current step, completed content for past/completed steps */}
            {step.agentAction && (
              <div className="mb-8">
                {/* Current step that's not completed shows thinking animation */}
                {(idx === currentStepIndex && !completedAgents.includes(step.id)) ? (
                  <AgentThinking 
                    agent={step.agentAction} 
                    onComplete={handleAgentComplete}
                  />
                ) : (
                  /* Show completed content for past steps OR current completed step */
                  (idx < currentStepIndex || completedAgents.includes(step.id)) && (
                    <>
                      <div className="flex items-start gap-3 mb-4">
                        <EnhancedAvatar 
                          src={step.agentAction.avatar} 
                          alt={step.agentAction.role}
                          className="size-12 border-2 border-blue-500 ring-2 ring-blue-300 ring-opacity-50"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{step.agentAction.role}</h3>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">AI Agent</Badge>
                            <Badge variant="outline">{step.agentAction.title}</Badge>
                            <Badge variant="outline" className="bg-blue-50">{step.agentAction.expertise}</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <Card className="ml-12 mb-4 border-l-4 border-l-blue-500 py-0">
                        <CardContent className="text-sm">
                          {idx === currentStepIndex ? (
                            <div className="text-sm">{step.agentAction.finalContent}</div>
                          ) : (
                            step.agentAction.finalContent
                          )}
                        </CardContent>
                      </Card>
                      
                      <div className="ml-12 flex justify-end">
                        <Badge className="bg-green-100 text-green-800">Task Complete</Badge>
                      </div>
                    </>
                  )
                )}
              </div>
            )}
            
            {/* Client responses - only show if current step is complete or for past steps */}
            {step.clientResponse && (
              (idx < currentStepIndex || (idx === currentStepIndex && isAgentComplete)) && (
                <div className="mb-8">
                  <div className="flex items-start gap-3 mb-4 justify-end">
                    <div className="text-right">
                      <h3 className="font-semibold text-lg">Simeon Wansi</h3>
                      <div className="flex gap-2 justify-end">
                        <Badge variant="outline" className="bg-gray-50">CTO, Dubai Technologies LLC</Badge>
                      </div>
                    </div>
                    <EnhancedAvatar 
                      src="/avatars/simeon_wansi.png" 
                      alt="Simeon Wansi"
                      className="size-12 border-2 border-gray-300"
                    />
                  </div>
                  
                  <Card className="mr-12 mb-4 border-r-4 border-r-gray-400 bg-gray-50 py-0">
                    <CardContent className="text-sm">
                      {idx === currentStepIndex ? (
                        <StreamingText text={step.clientResponse.content} speed={10} />
                      ) : (
                        step.clientResponse.content
                      )}
                      
                      {step.clientResponse.interestPoints && step.clientResponse.interestPoints.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-medium mb-2">Key Interest Points:</h4>
                          <div className="flex flex-wrap gap-2">
                            {step.clientResponse.interestPoints.map((point, index) => (
                              <Badge key={index} variant="outline" className="bg-amber-50">{point}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            )}
            
            {/* Visual content - only show if current step is complete or has no agent, or for past steps */}
            {step.visualContent && (
              (idx < currentStepIndex || 
              (idx === currentStepIndex && (isAgentComplete || !step.agentAction))) && (
                <div className="my-12 max-w-2xl mx-auto">
                  <Card className="overflow-hidden py-0">
                    <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white p-4">
                      <h3 className="font-medium">
                        {step.visualContent.type.charAt(0).toUpperCase() + step.visualContent.type.slice(1)} Visualization
                      </h3>
                    </div>
                    
                    {step.visualContent.image && (
                      <div className="p-4 flex justify-center">
                        <img 
                          src={step.visualContent.image} 
                          alt={step.visualContent.type}
                          loading="lazy" 
                          className="max-h-64 object-contain rounded-md"
                          onError={(e) => {
                            // Fallback behavior
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <CardContent className="bg-gray-50 whitespace-pre-line text-sm">
                      {idx === currentStepIndex ? (
                        <StreamingText text={step.visualContent.content} speed={8} />
                      ) : (
                        step.visualContent.content
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            )}
            
            {idx < scenarioSteps.length - 1 && (
              <div className="my-8 border-b border-gray-200"></div>
            )}
          </div>
        ))}
        
        {/* Final message when scenario is complete */}
        {currentStepIndex >= scenarioSteps.length - 1 && isAgentComplete && (
          <motion.div 
            className="mt-12 text-center p-8 border-2 border-green-500 rounded-lg bg-green-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-4">Client Journey Complete!</h2>
            <p className="text-gray-700 mb-8">
              You've successfully reviewed the AI-driven customer journey for Simeon Wansi, 
              resulting in multiple high-value conversions across our business units.
            </p>
            <Button 
              onClick={() => router.push('/potential-clients')}
              className="bg-gradient-to-r from-blue-600 to-violet-600"
            >
              Return to Client Directory
            </Button>
          </motion.div>
        )}
      </div>
    </div>
    </ErrorBoundary>
  );
};

export default ClientScenarioView;
