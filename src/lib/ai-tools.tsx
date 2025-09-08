
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
      { name: 'ChatGPT', description: 'Powerful, versatile; generous free tier.', link: 'https://chat.openai.com/' },
      { name: 'Google Gemini', description: 'Excellent for multitasking and image-gen prompts.', link: 'https://gemini.google.com/' },
      { name: 'Replika', description: 'Companion-style chatbot, free with upgrade options.', link: 'https://replika.ai/' },
      { name: 'Character.AI', description: 'Create and chat with custom characters—free tier available.', link: 'https://character.ai/' },
      { name: 'JanitorAI', description: 'Play with weird, AI-made personalities—free.', link: 'https://www.janitorai.com/' },
      { name: 'Duck.AI (DuckDuckGo)', description: 'Access ChatGPT anonymously, privacy-focused free approach.', link: 'https://duckduckgo.com/?q=DuckDuckGo+AI+Chat' },
      { name: 'Claude', description: 'Great with reasoning and code context.', link: 'https://claude.ai/' },
      { name: 'Microsoft Copilot', description: 'Built into Windows + Office apps.', link: 'https://copilot.microsoft.com/' },
      { name: 'OpenAI Playground', description: 'Manual but powerful prompt-based coding & chatting.', link: 'https://platform.openai.com/playground' },
      { name: 'YOGI Bot', description: 'Student-friendly assistant, made for learning/code help.', link: 'https://www.yogibot.com/' },
    ],
  },
  {
    category: 'Image Generation & Design',
    icon: <Palette className="w-full h-full" />,
    tools: [
      { name: 'Bing Image Creator (DALL·E)', description: 'Free via web, good for basic prompts.', link: 'https://www.bing.com/images/create' },
      { name: 'Playground AI', description: 'Free, easy, fast, up to ~1,000 images/day.', link: 'https://playgroundai.com/' },
      { name: 'Blue Willow', description: 'Totally free art generation with decent quality.', link: 'https://www.bluewillow.ai/' },
      { name: 'Stable Diffusion', description: 'Full control, totally free.', link: 'https://stability.ai/stable-diffusion' },
      { name: 'Leonardo AI', description: 'Free tier for game assets & portraits.', link: 'https://leonardo.ai/' },
      { name: 'Adobe Firefly', description: 'Free while in beta—image expansion, stylizing.', link: 'https://www.adobe.com/sensei/generative-ai/firefly.html' },
      { name: 'Lexica', description: 'Free tool focused on cartoon/painting outputs.', link: 'https://lexica.art/' },
      { name: 'Ideogram', description: 'Freemium text-to-image model that handles legible text well.', link: 'https://ideogram.ai/' },
      { name: 'Photopea', description: 'Photoshop-like online editor with free AI image tools (daily use).', link: 'https://www.photopea.com/' },
      { name: 'Canva Magic Media', description: '46 free image credits, easy to use.', link: 'https://www.canva.com/ai-image-generator/' },
    ],
  },
  {
    category: 'Developer Tools & Coding',
    icon: <Code className="w-full h-full" />,
    tools: [
        { name: 'Codeium', description: 'Free Copilot alternative; fast, language-rich.', link: 'https://codeium.com/' },
        { name: 'Tabnine', description: 'Popular code-completion with privacy.', link: 'https://www.tabnine.com/' },
        { name: 'Replit Ghostwriter', description: 'Free coding assistant in the browser for learners.', link: 'https://replit.com/ghostwriter' },
        { name: 'Amazon CodeWhisperer', description: 'Free for individuals; integrates AWS if needed.', link: 'https://aws.amazon.com/codewhisperer/' },
        { name: 'CodeGeeX', description: 'Free and open-source; supports many languages.', link: 'https://codegeex.cn/' },
        { name: 'Cursor', description: 'AI-first editor, limited free but smooth interface.', link: 'https://cursor.sh/' },
        { name: 'OpenAI Codex', description: 'Free API credits; natural-language to code.', link: 'https://openai.com/blog/openai-codex' },
        { name: 'Sourcegraph Cody', description: 'Code search + smart generation for free users.', link: 'https://sourcegraph.com/cody' },
        { name: 'YOGI Bot', description: 'For students, free code explanations and debugging.', link: 'https://www.yogibot.com/' },
        { name: 'Windmill', description: 'Unlimited free completions, high satisfaction.', link: 'https://www.windmill.dev/' },
    ],
  },
  {
    category: 'Audio & Video Editing',
    icon: <Clapperboard className="w-full h-full" />,
    tools: [
      { name: 'Descript', description: 'Free tier transcription, basic editing.', link: 'https://www.descript.com/' },
      { name: 'Runway', description: 'Freemium video editing with some free AI features.', link: 'https://runwayml.com/' },
    ],
  },
  {
    category: 'Research & Knowledge',
    icon: <Search className="w-full h-full" />,
    tools: [
      { name: 'ChatGPT', description: 'Free use for summarization, tutoring, Q&A.', link: 'https://chat.openai.com/' },
      { name: 'Duck.AI (DuckDuckGo)', description: 'Privacy-safe way to research without giving up data.', link: 'https://duckduckgo.com/?q=DuckDuckGo+AI+Chat' },
      { name: 'Perplexity', description: 'Summarization tool (free tier available).', link: 'https://www.perplexity.ai/' },
      { name: 'Notion AI', description: 'Built into Notion, free-tier summarization features.', link: 'https://www.notion.so/product/ai' },
    ],
  },
  {
    category: 'Writing & Copywriting',
    icon: <PenTool className="w-full h-full" />,
    tools: [
      { name: 'ChatGPT', description: 'Very capable for writing, free base-model.', link: 'https://chat.openai.com/' },
      { name: 'Jasper', description: 'Offer limited free trials for marketing copy.', link: 'https://www.jasper.ai/' },
      { name: 'Copy.ai', description: 'Offer limited free trials for marketing copy.', link: 'https://www.copy.ai/' },
      { name: 'Canva Magic Media', description: '(also helpful for social post visuals).', link: 'https://www.canva.com/ai-image-generator/' },
      { name: 'Grammarly', description: 'AI-powered writing suggestions.', link: 'https://www.grammarly.com/' },
    ],
  },
  {
    category: 'Productivity & Workflow',
    icon: <BrainCircuit className="w-full h-full" />,
    tools: [
      { name: 'Zapier', description: 'Automate tasks across apps.', link: 'https://zapier.com/' },
      { name: 'n8n', description: 'Powerful automation.', link: 'https://n8n.io/' },
      { name: 'SheetDB', description: 'Make dynamic fetch APIs from your sheet—free until big load.', link: 'https://sheetdb.io/' },
    ],
  },
  {
    category: 'Data & Analytics',
    icon: <LineChart className="w-full h-full" />,
    tools: [
      { name: 'Rawg API', description: 'Game data, free.', link: 'https://rawg.io/apidocs' },
      { name: 'CheapShark', description: 'Free game deals info (could be adapted for analytics).', link: 'https://apidocs.cheapshark.com/' },
      { name: 'Public APIs', description: 'Various sources of public free APIs.', link: 'https://public-apis.io/' },
    ],
  },
    {
    category: 'Music & Sound',
    icon: <Music className="w-full h-full" />,
    tools: [
      { name: 'Amper Music', description: 'AI music generator with free tiers.', link: 'https://www.ampermusic.com/' },
      { name: 'AIVA', description: 'AI music generator with free tiers.', link: 'https://www.aiva.ai/' },
      { name: 'Audacity', description: 'Open-source audio editor with AI plugins.', link: 'https://www.audacityteam.org/' },
    ],
  },
  {
    category: 'Business, Marketing & Sales',
    icon: <Briefcase className="w-full h-full" />,
    tools: [
      { name: 'Jasper', description: 'Tried-and-true for marketing.', link: 'https://www.jasper.ai/' },
      { name: 'Copy.ai', description: 'Tried-and-true for marketing.', link: 'https://www.copy.ai/' },
      { name: 'Canva', description: 'For easy visual marketing (free tier).', link: 'https://www.canva.com/' },
      { name: 'HubSpot CRM Free', description: 'Basic marketing/sales automation.', link: 'https://www.hubspot.com/products/crm/free-crm' },
    ],
  },
  {
    category: 'Education & Learning',
    icon: <BookOpen className="w-full h-full" />,
    tools: [
      { name: 'ChatGPT', description: 'Learning tutoring & codes.', link: 'https://chat.openai.com/' },
      { name: 'Replit', description: 'Hands-on learning environment.', link: 'https://replit.com/' },
      { name: 'Perplexity', description: 'Quick research summarization.', link: 'https://www.perplexity.ai/' },
      { name: 'YOGI Bot', description: 'Specifically student-friendly.', link: 'https://www.yogibot.com/' },
    ],
  },
  {
    category: 'Specialized / Other Tools',
    icon: <Sparkles className="w-full h-full" />,
    tools: [
      { name: 'Photopea', description: 'Great free Photoshop-style editor.', link: 'https://www.photopea.com/' },
      { name: 'Stable Diffusion', description: 'Ultimate free image engine.', link: 'https://stability.ai/stable-diffusion' },
      { name: 'Ideogram', description: 'Good for text-heavy image generation.', link: 'https://ideogram.ai/' },
    ],
  },
];
