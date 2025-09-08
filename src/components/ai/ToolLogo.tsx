
import { Bot, MessageSquare, Code, Palette, Clapperboard, PenTool, BrainCircuit, LineChart, Search, Music, Briefcase, BookOpen, Sparkles, Building, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ToolLogo = ({ toolName, className }: { toolName: string, className?: string }) => {
    const defaultClasses = "h-6 w-6 text-primary";
    const finalClassName = cn(defaultClasses, className);
    const lowerToolName = toolName.toLowerCase();

    // Specific tool names
    if (lowerToolName.includes('chatgpt')) return <MessageSquare className={finalClassName} />;
    if (lowerToolName.includes('claude')) return <MessageSquare className={finalClassName} />;
    if (lowerToolName.includes('perplexity')) return <Search className={finalClassName} />;
    if (lowerToolName.includes('character.ai')) return <MessageSquare className={finalClassName} />;
    if (lowerToolName.includes('midjourney')) return <Palette className={finalClassName} />;
    if (lowerToolName.includes('stable diffusion')) return <Palette className={finalClassName} />;
    if (lowerToolName.includes('dall·e')) return <Palette className={finalClassName} />;
    if (lowerToolName.includes('canva')) return <Palette className={finalClassName} />;
    if (lowerToolName.includes('leonardo')) return <Palette className={finalClassName} />;
    if (lowerToolName.includes('copilot')) return <Code className={finalClassName} />;
    if (lowerToolName.includes('replit')) return <Code className={finalClassName} />;
    if (lowerToolName.includes('tabnine')) return <Code className={finalClassName} />;
    if (lowerToolName.includes('codium')) return <Code className={finalClassName} />;
    if (lowerToolName.includes('descript')) return <Clapperboard className={finalClassName} />;
    if (lowerToolName.includes('runway')) return <Clapperboard className={finalClassName} />;
    if (lowerToolName.includes('synthesia')) return <Clapperboard className={finalClassName} />;
    if (lowerToolName.includes('voicemod')) return <Music className={finalClassName} />;
    if (lowerToolName.includes('cleanvoice')) return <Music className={finalClassName} />;
    if (lowerToolName.includes('notebooklm')) return <BookOpen className={finalClassName} />;
    if (lowerToolName.includes('elicit')) return <Search className={finalClassName} />;
    if (lowerToolName.includes('wolfram')) return <LineChart className={finalClassName} />;
    if (lowerToolName.includes('gemini')) return <BrainCircuit className={finalClassName} />;
    if (lowerToolName.includes('jasper')) return <PenTool className={finalClassName} />;
    if (lowerToolName.includes('copy.ai')) return <PenTool className={finalClassName} />;
    if (lowerToolName.includes('writesonic')) return <PenTool className={finalClassName} />;
    if (lowerToolName.includes('anyword')) return <PenTool className={finalClassName} />;
    if (lowerToolName.includes('notion')) return <BrainCircuit className={finalClassName} />;
    if (lowerToolName.includes('coda')) return <BrainCircuit className={finalClassName} />;
    if (lowerToolName.includes('mem.ai')) return <BrainCircuit className={finalClassName} />;
    if (lowerToolName.includes('clickup')) return <BrainCircuit className={finalClassName} />;
    if (lowerToolName.includes('tableau')) return <BarChart2 className={finalClassName} />;
    if (lowerToolName.includes('power bi')) return <BarChart2 className={finalClassName} />;
    if (lowerToolName.includes('monkeylearn')) return <LineChart className={finalClassName} />;
    if (lowerToolName.includes('soundraw')) return <Music className={finalClassName} />;
    if (lowerToolName.includes('aiva')) return <Music className={finalClassName} />;
    if (lowerToolName.includes('boomy')) return <Music className={finalClassName} />;
    if (lowerToolName.includes('hubspot')) return <Briefcase className={finalClassName} />;
    if (lowerToolName.includes('ocoya')) return <Briefcase className={finalClassName} />;
    if (lowerToolName.includes('lavender')) return <Briefcase className={finalClassName} />;
    if (lowerToolName.includes('khanmigo')) return <BookOpen className={finalClassName} />;
    if (lowerToolName.includes('quillbot')) return <PenTool className={finalClassName} />;
    if (lowerToolName.includes('socratic')) return <BookOpen className={finalClassName} />;
    if (lowerToolName.includes('grammarly')) return <PenTool className={finalClassName} />;
    if (lowerToolName.includes('beautiful.ai')) return <Sparkles className={finalClassName} />;
    if (lowerToolName.includes('durable')) return <Building className={finalClassName} />;
    if (lowerToolName.includes('browse.ai')) return <Search className={finalClassName} />;
    if (lowerToolName.includes('futurepedia')) return <BookOpen className={finalClassName} />;
    
    // Default icon
    return <Bot className={finalClassName} />;
};
