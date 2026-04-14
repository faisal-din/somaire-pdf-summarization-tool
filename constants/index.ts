import { Variants } from 'motion/react';

export const SUMMARY_SYSTEM_PROMPT = `
You are a social media content expert who makes complex documents easy and engaging to read. Create a viral-style summary using emojis that match the document's context. Format your response in markdown with proper line breaks.

Generate a structured summary using STRICT formatting rules.

================ RULES ================
- Each section title MUST start with "# " (hash + space)
- Each point MUST be exactly ONE line
- DO NOT wrap any point to multiple lines
- DO NOT add extra explanation on new lines
- DO NOT add empty lines between points
- Every point MUST start with "• " followed by an emoji and a space
- NEVER use numbered lists
- ALWAYS follow the exact structure below

================ FORMAT ================

# [Create a meaningful title based on the document's content]
• 🎯 One powerful sentence that captures the document's essence.
• 📌 Additional key overview point (if needed)

# Document Details
• 📑 Type: [Document Type]
• 👥 For: [Target Audience]

# Key Highlights
• 🚀 First Key Point
• ⭐ Second Key Point
• 💫 Third Key Point

# Why It Matters
• 💡 A short, impactful explanation in ONE line only

# Main Points
• ⭐ Main insight or finding
• 💪 Key strength or advantage
• 🔥 Important outcome or result

# Pro Tips
• ⭐ First practical recommendation
• 💎 Second valuable insight
• 🌟 Third actionable advice

# Key Terms to Know
• 📚 First key term: Simple explanation
• 📚 Second key term: Simple explanation

# Bottom Line
• 💫 The most important takeaway

================ IMPORTANT ================
Every point MUST:
- Start with "• "
- Contain an emoji
- Be on ONE LINE ONLY

Never break these rules.
`;
export const DEMO_SUMMARY = `# Unlocking the Power of AI: A Guide to ChatGPT and Its Applications
• 🤖 ChatGPT is an advanced language model developed by OpenAI that can understand and generate human-like text.
• 🌐 It has a wide range of applications, from customer support to content creation.

# What is ChatGPT?
• 🧠 ChatGPT is based on the GPT architecture, which uses deep learning to process and generate text.
• 📚 It has been trained on a vast amount of data, allowing it to understand context and produce coherent responses.

# Key Features
• 🚀 Natural language understanding: ChatGPT can comprehend complex queries and provide relevant answers.
• 🎨 Creative content generation: It can assist in writing, brainstorming, and generating ideas.
• 🛠️ Customization: Developers can fine-tune ChatGPT for specific use cases.

# Why ChatGPT Matters
• 💡 ChatGPT has the potential to revolutionize how we interact with technology, making it more intuitive and accessible.

# Practical Applications
• 🛍️ E-commerce: ChatGPT can enhance customer service by providing instant support and personalized recommendations.
• 📝 Content Creation: It can assist writers, marketers, and creators in generating high-quality content quickly.
• 📊 Data Analysis: ChatGPT can help analyze and summarize large datasets, making it easier to extract insights.

# Pro Tips for Using ChatGPT
• ⭐ Start with clear prompts: Providing specific instructions can help ChatGPT generate better responses.
• 💎 Experiment with different use cases: ChatGPT can be adapted for various applications, so don't hesitate to explore its capabilities.
• 🌟 Monitor and refine: Regularly review the outputs and fine-tune your approach to get the best results.

# Key Terms to Know
• 📚 GPT (Generative Pre-trained Transformer): A type of language model that generates text based on patterns learned from data.
• 📚 Fine-tuning: The process of adjusting a pre-trained model to perform better on specific tasks.

# Bottom Line
• 💫 ChatGPT is a powerful tool that can enhance productivity and creativity across various domains, making it an essential asset in the AI landscape.

# Final Thoughts
• 🌟 As AI continues to evolve, tools like ChatGPT will play a crucial role in shaping the future of human-computer interaction.

`;

// Toast bg-colors for success/error states
export const TOAST_STYLES = {
  success: { backgroundColor: '#34d399', color: '#fff' },
  error: { backgroundColor: '#f87171', color: '#fff' },
  info: { backgroundColor: '#60a5fa', color: '#fff' },
} as const;

const isDev = process.env.NODE_ENV === 'development';

export const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$9.99',
    description: 'For professionals and teams',
    items: [
      '5 PDF summaries per month',
      'Standard processing speed',
      'Email support',
    ],
    paymentLink: isDev
      ? 'https://buy.stripe.com/test_aFadR97EVbV7eeQgMH2ZO00'
      : 'https://buy.stripe.com/test_28E9ATf7ngbn7QseEz2ZO02',
    priceId: isDev
      ? 'price_1TL6GTE8LmEf75TfyiNSC9ZF'
      : 'price_1TM73lE8LmEf75Tfym7VvKto',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19.99',
    description: 'For professionals and teams',
    items: [
      'Unlimited PDF summaries',
      'Priority processing',
      '24/7 priority support',
      'Markdown Export',
    ],
    paymentLink: isDev
      ? 'https://buy.stripe.com/test_aFa28r2kBgbnb2E3ZV2ZO01'
      : 'https://buy.stripe.com/test_3cI6oH5wNaR3b2E6832ZO03',
    priceId: isDev
      ? 'price_1TL6GTE8LmEf75Tfml9QyTrx'
      : 'price_1TM73lE8LmEf75Tf3dPga6PC',
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const, // 👈 add as const
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};

export const buttonVariants = {
  scale: 1.05,
  transition: {
    type: 'spring' as const, // 👈 add as const
    stiffness: 300,
    damping: 10,
  },
};

export const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const, // 👈 add as const
      stiffness: 100,
      damping: 20,
      duration: 0.5,
    },
  },
};
