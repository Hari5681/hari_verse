
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, MessageSquare, Image as ImageIcon, Code, Bot, Mic, Video, BrainCircuit, LineChart, PenTool, Search, Palette, Star } from 'lucide-react';
import Link from 'next/link';

const toolCategories = [
  {
    category: 'Conversational AI',
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'GPT-4o (OpenAI)', description: 'Chat, summarization, and creative writing.', link: 'https://openai.com/gpt-4o' },
      { name: 'Claude (Anthropic)', description: 'Advanced AI assistant for reasoning & conversation.', link: 'https://claude.ai/' },
      { name: 'Character.AI', description: 'Create and chat with AI characters.', link: 'https://character.ai/' },
    ],
  },
  {
    category: 'Image Generation',
    icon: <ImageIcon className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'MidJourney', description: 'AI image generator for art & concept imagery.', link: 'https://www.midjourney.com/' },
      { name: 'Stable Diffusion', description: 'Open-source diffusion model for images.', link: 'https://stability.ai/stable-diffusion' },
      { name: 'DALL·E', description: 'AI that generates images from text prompts.', link: 'https://openai.com/dall-e-3' },
      { name: 'Leonardo.AI', description: 'Game assets & concept art generation.', link: 'https://leonardo.ai/' },
    ],
  },
  {
    category: 'Developer Tools',
    icon: <Code className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'GitHub Copilot', description: 'AI coding assistant.', link: 'https://github.com/features/copilot' },
      { name: 'Replit Ghostwriter', description: 'AI pair programmer & instant deployment.', link: 'https://replit.com/ghostwriter' },
      { name: 'Tabnine', description: 'Code completion AI.', link: 'https://www.tabnine.com/' },
      { name: 'CodiumAI', description: 'AI for unit test generation.', link: 'https://www.codium.ai/' },
    ],
  },
  {
    category: 'Audio & Video',
    icon: <Mic className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'Descript', description: 'Audio & video editing with transcription.', link: 'https://www.descript.com/' },
      { name: 'Runway', description: 'AI video editing & generative media.', link: 'https://runwayml.com/' },
      { name: 'Voicemod AI', description: 'Real-time AI voice changer.', link: 'https://www.voicemod.net/' },
      { name: 'Cleanvoice AI', description: 'Remove filler words & noise from recordings.', link: 'https://cleanvoice.ai/' },
    ],
  },
  {
    category: 'Productivity & Workflow',
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'Notion AI', description: 'Writing & summarization in Notion.', link: 'https://www.notion.so/product/ai' },
      { name: 'Coda AI', description: 'Automate docs & workflows.', link: 'https://coda.io/ai' },
      { name: 'Mem AI', description: 'AI-powered smart notes.', link: 'https://mem.ai/' },
      { name: 'ClickUp AI', description: 'Task and productivity assistant.', link: 'https://clickup.com/ai' },
    ],
  },
  {
    category: 'Marketing & Writing',
    icon: <PenTool className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'Jasper', description: 'Copywriting AI for ads, blogs & social posts.', link: 'https://www.jasper.ai/' },
      { name: 'Copy.ai', description: 'Marketing content generator.', link: 'https://www.copy.ai/' },
      { name: 'Writesonic', description: 'Blog & ad copy AI tool.', link: 'https://writesonic.com/' },
      { name: 'Anyword', description: 'AI text optimized for conversions.', link: 'https://anyword.com/' },
    ],
  },
  {
    category: 'Research & Data',
    icon: <Search className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'Perplexity AI', description: 'AI search engine with citations.', link: 'https://www.perplexity.ai/' },
      { name: 'Elicit', description: 'AI research assistant for papers.', link: 'https://elicit.com/' },
      { name: 'ChatGPT Advanced Data Analysis', description: 'Analyze data, run code, create charts.', link: 'https://openai.com/blog/chatgpt-can-now-see-hear-and-speak' },
      { name: 'Wolfram Alpha', description: 'AI-powered computation & data knowledge.', link: 'https://www.wolframalpha.com/' },
    ],
  },
  {
    category: 'Specialized Tools',
    icon: <Star className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'Canva AI', description: 'AI design & presentations.', link: 'https://www.canva.com/ai-image-generator/' },
      { name: 'Runway Gen-2', description: 'Text-to-video AI generator.', link: 'https://runwayml.com/ai-magic-tools/gen-2/' },
      { name: 'Synthesia', description: 'AI avatar-based video creation.', link: 'https://www.synthesia.io/' },
      { name: 'Beautiful.ai', description: 'Smart AI presentations.', link: 'https://www.beautiful.ai/' },
    ],
  },
];

export default function AiToolsPage() {
  return (
    <div className="min-h-screen bg-background p-4 pt-20">
      <div className="container mx-auto">
        <header className="text-center mb-12 animate-fade-in-down">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                <Bot className="h-10 w-10 text-primary" />
            </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            AI Tool Directory
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated list of powerful AI tools to enhance your productivity, creativity, and workflow.
          </p>
        </header>

        <div className="space-y-16">
          {toolCategories.map((category, catIndex) => (
            <section key={category.category} className="animate-fade-in-up" style={{ animationDelay: `${catIndex * 150}ms`, animationFillMode: 'both' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-lg">
                  {category.icon}
                </div>
                <h2 className="text-3xl font-bold">{category.category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <Card 
                    key={tool.name} 
                    className="flex flex-col bg-card/50 backdrop-blur-sm border-border/20 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${toolIndex * 100}ms`, animationFillMode: 'both' }}
                  >
                    <CardHeader>
                      <CardTitle>{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                      <Link href={tool.link} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button variant="outline" className="w-full">
                          Visit <ArrowUpRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
