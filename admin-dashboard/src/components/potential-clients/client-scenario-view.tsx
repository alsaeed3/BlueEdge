"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { simeonWansiScenario, ScenarioStep, AgentAction } from '@/lib/potential-clients-data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BrainCircuit, Sparkles } from 'lucide-react';

// Text streaming effect component
const StreamingText = ({ text, speed = 15, className = "" }) => {
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
const AgentThinking = ({ agent, onComplete }: { agent: AgentAction, onComplete: () => void }) => {
  const [phase, setPhase] = useState<"thinking" | "action" | "execution">("thinking");
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Simulate thinking phase timing
    const thinkingTimer = setTimeout(() => {
      setPhase("action");
      
      // Simulate action phase timing
      const actionTimer = setTimeout(() => {
        setPhase("execution");
        setIsComplete(true);
        onComplete();
      }, 3000); // 3 seconds for action phase
      
      return () => clearTimeout(actionTimer);
    }, 5000); // 5 seconds for thinking phase
    
    return () => clearTimeout(thinkingTimer);
  }, [onComplete]);
  
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-3 mb-4">
        <Avatar className="size-12 border-2 border-blue-500">
          <AvatarImage src={agent.avatar} alt={agent.role} />
          <AvatarFallback>{agent.role.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{agent.role}</h3>
          <div className="flex gap-2">
            <Badge variant="outline">{agent.title}</Badge>
            <Badge variant="outline" className="bg-blue-50">{agent.expertise}</Badge>
          </div>
        </div>
      </div>

      <Card className="ml-12 mb-4 border-l-4 border-l-blue-500">
        <CardContent className="pt-4">
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
const ClientResponse = ({ response }) => {
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
        <Avatar className="size-12 border-2 border-gray-300">
          <AvatarImage src="/avatars/simeon_wansi.png" alt="Simeon Wansi" />
          <AvatarFallback>SW</AvatarFallback>
        </Avatar>
      </div>

      <Card className="mr-12 mb-4 border-r-4 border-r-gray-400 bg-gray-50">
        <CardContent className="pt-4">
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
const VisualContent = ({ content }) => {
  return (
    <motion.div 
      className="my-12 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white p-4">
          <h3 className="font-medium">{content.type.charAt(0).toUpperCase() + content.type.slice(1)} Visualization</h3>
        </div>
        
        {content.image && (
          <div className="p-4 flex justify-center">
            <img 
              src={content.image} 
              alt={content.type} 
              className="max-h-64 object-contain rounded-md"
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

// Main client scenario component
const ClientScenarioView = ({ clientId }: { clientId: string }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [isAgentComplete, setIsAgentComplete] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Get scenario steps for the client
  const scenarioSteps = simeonWansiScenario;
  const currentStep = scenarioSteps[currentStepIndex];

  // Handle agent completion
  const handleAgentComplete = () => {
    if (currentStep && currentStep.agentAction) {
      setIsAgentComplete(true);
      setCompletedAgents([...completedAgents, currentStep.id]);
    }
  };

  // Auto-advance through steps with proper timing
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (currentStep) {
      // If the step has a client response or visual content and the agent is complete (or there is no agent)
      if ((currentStep.clientResponse || currentStep.visualContent) && 
          (isAgentComplete || !currentStep.agentAction)) {
        timeout = setTimeout(() => {
          const nextIndex = currentStepIndex + 1;
          
          // Check if there are more steps
          if (nextIndex < scenarioSteps.length) {
            setCurrentStepIndex(nextIndex);
            setIsAgentComplete(false);
            // Scroll to the latest content
            setTimeout(() => {
              containerRef.current?.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
              });
            }, 100);
          }
        }, 8000); // Wait 8 seconds between advancing steps
      }
    }
    
    return () => clearTimeout(timeout);
  }, [currentStepIndex, isAgentComplete, currentStep, scenarioSteps]);

  return (
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
        <Avatar className="size-16 border-2 border-blue-500">
          <AvatarImage src="/avatars/simeon_wansi.png" alt="Simeon Wansi" />
          <AvatarFallback>SW</AvatarFallback>
        </Avatar>
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
          <div key={step.id}>
            <div className="py-2 px-4 bg-gray-100 rounded-md mb-6">
              <h2 className="font-semibold">{step.title}</h2>
            </div>
            
            {step.agentAction && (idx === currentStepIndex || completedAgents.includes(step.id)) && (
              <AgentThinking 
                agent={step.agentAction} 
                onComplete={handleAgentComplete}
              />
            )}
            
            {step.clientResponse && isAgentComplete && idx === currentStepIndex && (
              <ClientResponse response={step.clientResponse} />
            )}
            
            {step.visualContent && (isAgentComplete || !step.agentAction) && idx === currentStepIndex && (
              <VisualContent content={step.visualContent} />
            )}
            
            {idx < currentStepIndex && (
              <>
                {step.agentAction && (
                  <div className="mb-8">
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar className="size-12 border-2 border-blue-500">
                        <AvatarImage src={step.agentAction.avatar} alt={step.agentAction.role} />
                        <AvatarFallback>{step.agentAction.role.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{step.agentAction.role}</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline">{step.agentAction.title}</Badge>
                          <Badge variant="outline" className="bg-blue-50">{step.agentAction.expertise}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Card className="ml-12 mb-4 border-l-4 border-l-blue-500">
                      <CardContent className="pt-4 text-sm">
                        {step.agentAction.finalContent}
                      </CardContent>
                    </Card>
                    
                    <div className="ml-12 flex justify-end">
                      <Badge className="bg-green-100 text-green-800">Task Complete</Badge>
                    </div>
                  </div>
                )}
                
                {step.clientResponse && (
                  <div className="mb-8">
                    <div className="flex items-start gap-3 mb-4 justify-end">
                      <div className="text-right">
                        <h3 className="font-semibold text-lg">Simeon Wansi</h3>
                        <div className="flex gap-2 justify-end">
                          <Badge variant="outline" className="bg-gray-50">CTO, Dubai Technologies LLC</Badge>
                        </div>
                      </div>
                      <Avatar className="size-12 border-2 border-gray-300">
                        <AvatarImage src="/avatars/simeon_wansi.png" alt="Simeon Wansi" />
                        <AvatarFallback>SW</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <Card className="mr-12 mb-4 border-r-4 border-r-gray-400 bg-gray-50">
                      <CardContent className="pt-4 text-sm">
                        {step.clientResponse.content}
                        
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
                )}
                
                {step.visualContent && (
                  <div className="my-12 max-w-2xl mx-auto">
                    <Card className="overflow-hidden">
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
                            className="max-h-64 object-contain rounded-md"
                          />
                        </div>
                      )}
                      
                      <CardContent className="bg-gray-50 whitespace-pre-line text-sm">
                        {step.visualContent.content}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            )}
            
            {idx < scenarioSteps.length - 1 && idx < currentStepIndex && (
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
  );
};

export default ClientScenarioView;
