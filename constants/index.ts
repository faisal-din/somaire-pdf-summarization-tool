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
      : '',
    priceId: isDev ? 'price_1TL6GTE8LmEf75TfyiNSC9ZF' : '',
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
      : '',
    priceId: isDev ? 'price_1TL6GTE8LmEf75Tfml9QyTrx' : '',
  },
];
