import React from 'react';
import { MessageSquare, Code, Palette, Clapperboard, PenTool, BrainCircuit, LineChart, Search, Music, Briefcase, BookOpen, Sparkles } from 'lucide-react';

export interface AITool {
  name: string;
  description: string;
  link: string;
  category?: string; // Optional because we add it dynamically in the page
}

export interface AIToolCategory {
  category: string;
  icon: React.ReactNode;
  tools: AITool[];
}

export const toolCategories: AIToolCategory[] = [
  {
    category: 'Conversational AI / Chatbots',
    icon: <MessageSquare className="w-full h-full" />,
    tools: [
      { name: 'ChatGPT (OpenAI)', description: 'Conversational AI, coding help, and creativity.', link: 'https://openai.com/chatgpt' },
      { name: 'Claude (Anthropic)', description: 'Reasoning-focused AI assistant.', link: 'https://claude.ai/' },
      { name: 'Perplexity AI', description: 'AI search + chat with citations.', link: 'https://www.perplexity.ai/' },
      { name: 'Character.AI', description: 'Create and chat with AI characters.', link: 'https://character.ai/' },
    ],
  },
  {
    category: 'Image Generation & Design',
    icon: <Palette className="w-full h-full" />,
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
    icon: <Code className="w-full h-full" />,
    tools: [
      { name: 'GitHub Copilot', description: 'Code suggestions in IDE.', link: 'https://github.com/features/copilot' },
      { name: 'Replit Ghostwriter', description: 'AI coding + instant hosting.', link: 'https://replit.com/ghostwriter' },
      { name: 'Tabnine', description: 'AI autocomplete for code.', link: 'https://www.tabnine.com/' },
      { name: 'CodiumAI', description: 'Automated unit test generation.', link: 'https://www.codium.ai/' },
    ],
  },
  {
    category: 'Audio & Video Editing',
    icon: <Clapperboard className="w-full h-full" />,
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
    icon: <Search className="w-full h-full" />,
    tools: [
      { name: 'NotebookLM (Google)', description: 'Summarize & analyze PDFs, docs.', link: 'https://notebooklm.google.com/' },
      { name: 'Elicit', description: 'AI for academic research.', link: 'https://elicit.com/' },
      { name: 'Wolfram Alpha', description: 'AI-powered computation.', link: 'https://www.wolframalpha.com/' },
      { name: 'Gemini (Google)', description: 'Advanced reasoning & search.', link: 'https://gemini.google.com/' },
    ],
  },
  {
    category: 'Writing & Copywriting',
    icon: <PenTool className="w-full h-full" />,
    tools: [
      { name: 'Jasper', description: 'AI copywriting for ads & blogs.', link: 'https://www.jasper.ai/' },
      { name: 'Copy.ai', description: 'AI for marketing content.', link: 'https://www.copy.ai/' },
      { name: 'Writesonic', description: 'Blog writing and SEO content.', link: 'https://writesonic.com/' },
      { name: 'Anyword', description: 'Optimized ad and sales copy.', link: 'https://anyword.com/' },
    ],
  },
  {
    category: 'Productivity & Workflow',
    icon: <BrainCircuit className="w-full h-full" />,
    tools: [
      { name: 'Notion AI', description: 'Notes, docs, and summaries.', link: 'https://www.notion.so/product/ai' },
      { name: 'Coda AI', description: 'Automates tasks in documents.', link: 'https://coda.io/ai' },
      { name: 'Mem AI', description: 'AI-powered smart notes.', link: 'https://mem.ai/' },
      { name: 'ClickUp AI', description: 'Productivity + project management.', link: 'https://clickup.com/ai' },
    ],
  },
  {
    category: 'Data & Analytics',
    icon: <LineChart className="w-full h-full" />,
    tools: [
      { name: 'ChatGPT (Advanced Data Analysis)', description: 'Run code, analyze data.', link: 'https://openai.com/blog/chatgpt-can-now-see-hear-and-speak' },
      { name: 'Tableau + AI', description: 'Smart dashboards with AI insights.', link: 'https://www.tableau.com/products/einstein-discovery' },
      { name: 'Power BI + Copilot', description: 'AI in BI dashboards.', link: 'https://powerbi.microsoft.com/en-us/features/copilot/' },
      { name: 'MonkeyLearn', description: 'AI text & data classification.', link: 'https://monkeylearn.com/' },
    ],
  },
    {
    category: 'Music & Sound',
    icon: <Music className="w-full h-full" />,
    tools: [
      { name: 'Soundraw', description: 'AI music generation.', link: 'https://soundraw.io/' },
      { name: 'Aiva', description: 'Compose soundtracks with AI.', link: 'https://www.aiva.ai/' },
      { name: 'Boomy', description: 'Instant AI song creation.', link: 'https://boomy.com/' },
    ],
  },
  {
    category: 'Business, Marketing & Sales',
    icon: <Briefcase className="w-full h-full" />,
    tools: [
      { name: 'HubSpot AI', description: 'CRM + AI tools.', link: 'https://www.hubspot.com/artificial-intelligence' },
      { name: 'Ocoya', description: 'AI for content + scheduling.', link: 'https://www.ocoya.com/' },
      { name: 'Lavender', description: 'AI sales email coach.', link: 'https://www.lavender.ai/' },
    ],
  },
  {
    category: 'Education & Learning',
    icon: <BookOpen className="w-full h-full" />,
    tools: [
      { name: 'Khanmigo (Khan Academy)', description: 'AI tutor.', link: 'https://www.khanacademy.org/khan-labs' },
      { name: 'QuillBot', description: 'Paraphrasing + grammar.', link: 'https://quillbot.com/' },
      { name: 'Socratic (Google)', description: 'AI study helper.', link: 'https://socratic.org/' },
      { name: 'Grammarly', description: 'AI grammar and writing assistant.', link: 'https://www.grammarly.com/' },
    ],
  },
  {
    category: 'Specialized / Other Tools',
    icon: <Sparkles className="w-full h-full" />,
    tools: [
      { name: 'Runway Gen-2', description: 'Text-to-video.', link: 'https://runwayml.com/ai-magic-tools/gen-2/' },
      { name: 'Beautiful.ai', description: 'Smart AI presentations.', link: 'https://www.beautiful.ai/' },
      { name: 'Durable', description: 'AI website builder.', link: 'https://durable.co/' },
      { name: 'Browse AI', description: 'Scrape websites with AI.', link: 'https://www.browse.ai/' },
      { name: 'Futurepedia', description: 'AI tool directory (10k+ tools).', link: 'https://www.futurepedia.io/' },
    ],
  },
];
