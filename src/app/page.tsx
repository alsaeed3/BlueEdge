import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import ScoutlyAI from "@/components/RealtimeAI";

export default function App() {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-2 sm:p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-primary/30 bg-card overflow-hidden rounded-xl">
        <CardHeader className="text-center p-4 sm:p-6 border-b border-border/50 bg-muted/30">
          <div className="flex justify-center items-center mb-4 text-primary">
            <BrainCircuit size={48} strokeWidth={1.5} />
          </div>
          <CardTitle
            className="text-3xl sm:text-4xl font-extrabold tracking-tight 
                               bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
          >
            Scoutly AI
          </CardTitle>
          <CardDescription className="mt-3 text-base sm:text-lg text-muted-foreground">
            Connect and experience our AI capabilities in real-time.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4">
          <ScoutlyAI />
        </CardContent>
      </Card>
    </div>
  );
}
