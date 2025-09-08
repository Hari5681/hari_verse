
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, MessageSquare, Image as ImageIcon, Code, Bot, Mic, Video, BrainCircuit, LineChart, PenTool, Search, Palette, Star, Music, Briefcase, BookOpen, Sparkles, Clapperboard } from 'lucide-react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const toolCategories = [
  {
    category: 'Conversational AI / Chatbots',
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'ChatGPT (OpenAI)', description: 'Conversational AI, coding help, and creativity.', link: 'https://openai.com/chatgpt' },
      { name: 'Claude (Anthropic)', description: 'Reasoning-focused AI assistant.', link: 'https://claude.ai/' },
      { name: 'Perplexity AI', description: 'AI search + chat with citations.', link: 'https://www.perplexity.ai/' },
      { name: 'Character.AI', description: 'Create and chat with AI characters.', link: 'https://character.ai/' },
    ],
  },
  {
    category: 'Image Generation & Design',
    icon: <Palette className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'MidJourney', description: 'Artistic AI image creation.', link: 'https://www.midjourney.com/' },
      { name: 'Stable Diffusion', description: 'Open-source image generation.', link: 'https://stability.ai/stable-diffusion' },
      { name: 'DALL·E', description: 'Image generation from text prompts.', link: 'https://openai.com/dall-e-3' },
      { name: 'Canva AI', description: 'AI-powered design and editing.', link: 'https://www.canva.com/ai-image-generator/' },
      { name: 'Leonardo.AI', description: 'Game assets and creative images.', link: 'https://leonardo.ai/' },
    ],
  },
  {
    category: 'Developer Tools & Coding',
    icon: <Code className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'GitHub Copilot', description: 'Code suggestions in IDE.', link: 'https://github.com/features/copilot' },
      { name: 'Replit Ghostwriter', description: 'AI coding + instant hosting.', link: 'https://replit.com/ghostwriter' },
      { name: 'Tabnine', description: 'AI autocomplete for code.', link: 'https://www.tabnine.com/' },
      { name: 'CodiumAI', description: 'Automated unit test generation.', link: 'https://www.codium.ai/' },
    ],
  },
  {
    category: 'Audio & Video Editing',
    icon: <Clapperboard className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'Descript', description: 'Audio/video editing + transcription.', link: 'https://www.descript.com/' },
      { name: 'Runway ML', description: 'Video editing, text-to-video.', link: 'https://runwayml.com/' },
      { name: 'Synthesia', description: 'AI video avatars.', link: 'https://www.synthesia.io/' },
      { name: 'Voicemod AI', description: 'Real-time AI voice changer.', link: 'https://www.voicemod.net/' },
      { name: 'Cleanvoice AI', description: 'Remove filler words from audio.', link: 'https://cleanvoice.ai/' },
    ],
  },
  {
    category: 'Research & Knowledge',
    icon: <Search className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'NotebookLM (Google)', description: 'Summarize & analyze PDFs, docs.', link: 'https://notebooklm.google.com/' },
      { name: 'Elicit', description: 'AI for academic research.', link: 'https://elicit.com/' },
      { name: 'Wolfram Alpha', description: 'AI-powered computation.', link: 'https://www.wolframalpha.com/' },
      { name: 'Gemini (Google)', description: 'Advanced reasoning & search.', link: 'https://gemini.google.com/' },
    ],
  },
  {
    category: 'Writing & Copywriting',
    icon: <PenTool className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'Jasper', description: 'AI copywriting for ads & blogs.', link: 'https://www.jasper.ai/' },
      { name: 'Copy.ai', description: 'AI for marketing content.', link: 'https://www.copy.ai/' },
      { name: 'Writesonic', description: 'Blog writing and SEO content.', link: 'https://writesonic.com/' },
      { name: 'Anyword', description: 'Optimized ad and sales copy.', link: 'https://anyword.com/' },
    ],
  },
  {
    category: 'Productivity & Workflow',
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'Notion AI', description: 'Notes, docs, and summaries.', link: 'https://www.notion.so/product/ai' },
      { name: 'Coda AI', description: 'Automates tasks in documents.', link: 'https://coda.io/ai' },
      { name: 'Mem AI', description: 'AI-powered smart notes.', link: 'https://mem.ai/' },
      { name: 'ClickUp AI', description: 'Productivity + project management.', link: 'https://clickup.com/ai' },
    ],
  },
  {
    category: 'Data & Analytics',
    icon: <LineChart className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'ChatGPT (Advanced Data Analysis)', description: 'Run code, analyze data.', link: 'https://openai.com/blog/chatgpt-can-now-see-hear-and-speak' },
      { name: 'Tableau + AI', description: 'Smart dashboards with AI insights.', link: 'https://www.tableau.com/products/einstein-discovery' },
      { name: 'Power BI + Copilot', description: 'AI in BI dashboards.', link: 'https://powerbi.microsoft.com/en-us/features/copilot/' },
      { name: 'MonkeyLearn', description: 'AI text & data classification.', link: 'https://monkeylearn.com/' },
    ],
  },
    {
    category: 'Music & Sound',
    icon: <Music className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'Soundraw', description: 'AI music generation.', link: 'https://soundraw.io/' },
      { name: 'Aiva', description: 'Compose soundtracks with AI.', link: 'https://www.aiva.ai/' },
      { name: 'Boomy', description: 'Instant AI song creation.', link: 'https://boomy.com/' },
      { name: 'Voicemod AI', description: 'Voice AI & sound effects.', link: 'https://www.voicemod.net/' },
    ],
  },
  {
    category: 'Business, Marketing & Sales',
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'HubSpot AI', description: 'CRM + AI tools.', link: 'https://www.hubspot.com/artificial-intelligence' },
      { name: 'Copy.ai', description: 'Social media + ads.', link: 'https://www.copy.ai/' },
      { name: 'Ocoya', description: 'AI for content + scheduling.', link: 'https://www.ocoya.com/' },
      { name: 'Lavender', description: 'AI sales email coach.', link: 'https://www.lavender.ai/' },
    ],
  },
  {
    category: 'Education & Learning',
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'Khanmigo (Khan Academy)', description: 'AI tutor.', link: 'https://www.khanacademy.org/khan-labs' },
      { name: 'QuillBot', description: 'Paraphrasing + grammar.', link: 'https://quillbot.com/' },
      { name: 'Socratic (Google)', description: 'AI study helper.', link: 'https://socratic.org/' },
      { name: 'Grammarly', description: 'AI grammar and writing assistant.', link: 'https://www.grammarly.com/' },
    ],
  },
  {
    category: 'Specialized / Other Tools',
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    tools: [
      { name: 'Runway Gen-2', description: 'Text-to-video.', link: 'https://runwayml.com/ai-magic-tools/gen-2/' },
      { name: 'Beautiful.ai', description: 'Smart AI presentations.', link: 'https://www.beautiful.ai/' },
      { name: 'Durable', description: 'AI website builder.', link: 'https://durable.co/' },
      { name: 'Browse AI', description: 'Scrape websites with AI.', link: 'https://www.browse.ai/' },
      { name: 'Futurepedia', description: 'AI tool directory (10k+ tools).', link: 'https://www.futurepedia.io/' },
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
              <Carousel
                opts={{
                  align: 'start',
                  slidesToScroll: 'auto',
                }}
                className="w-full"
              >
                <CarouselContent>
                  {category.tools.map((tool, toolIndex) => (
                    <CarouselItem key={tool.name} className="basis-1/2 md:basis-1/2 lg:basis-1/3">
                      <div 
                        className="h-full p-1"
                        style={{ animationDelay: `${toolIndex * 100}ms`, animationFillMode: 'both' }}
                      >
                        <Card 
                          className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-border/20 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1"
                        >
                          <CardHeader className="p-4">
                            <CardTitle className="text-base sm:text-lg">{tool.name}</CardTitle>
                            <CardDescription className="text-xs sm:text-sm">{tool.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow flex items-end mt-auto p-4 pt-0">
                            <Link href={`/redirect?url=${encodeURIComponent(tool.link)}`} target="_blank" rel="noopener noreferrer" className="w-full">
                              <Button variant="outline" className="w-full h-9 text-xs sm:h-10 sm:text-sm">
                                Visit <ArrowUpRight className="h-4 w-4 ml-1 sm:ml-2" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
