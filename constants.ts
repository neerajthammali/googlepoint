import { BlogPost, Product, ForumTopic } from './types';

// NOTE: To add a new blog post from a markdown file:
// 1. Upload your .md file to the 'public/articles/' folder (create if it doesn't exist).
// 2. Add a new object to this array with 'contentPath' pointing to '/articles/filename.md'.
// 3. Ensure 'content' property is omitted or undefined if using 'contentPath'.

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of the Pivot: When to Change Direction',
    excerpt: 'Recognizing when your startup needs a fundamental shift is crucial. Here are the signs.',
    content: `
# The Art of the Pivot

Every founder faces the moment of truth. The metrics aren't moving, the users aren't retaining, and the runway is shortening. Is it time to push harder, or time to pivot?

## Signs You Need to Pivot

1. **Stagnant Growth**: Despite marketing efforts, your user base isn't growing.
2. **Customer Feedback**: Users love a secondary feature more than your core product.
3. **Market Shifts**: A competitor or technology has rendered your solution obsolete.

## How to Execute

* **Talk to Users**: Don't guess. Conduct 50 interviews in a week.
* **Prototyping**: Build a low-fidelity version of the new direction.
* **Speed**: A pivot is not a restart; it's a course correction. Move fast.

> "Success is stumbling from failure to failure with no loss of enthusiasm." - Winston Churchill
    `,
    author: 'Alex Chen',
    authorBio: 'Alex is a serial entrepreneur who has successfully exited two SaaS companies. He now advises early-stage founders on product-market fit and growth strategy.',
    authorAvatar: 'https://i.pravatar.cc/150?u=alex',
    date: 'Oct 12, 2023',
    category: 'Strategy',
    imageUrl: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: '2',
    title: 'SEO for Developers: A Practical Guide',
    excerpt: 'Stop ignoring organic traffic. Simple technical tweaks that yield massive results.',
    content: `
# SEO for Developers

You built a great product, but no one can find it. Sound familiar? SEO isn't black magic; it's engineering.

## Key Technical Factors

* **Core Web Vitals**: Speed matters. Optimize your LCP and CLS.
* **Semantic HTML**: Use your \`<h>\` tags correctly.
* **Meta Tags**: Dynamic Open Graph images are a must for social sharing.

## The Content Strategy

Don't just write updates. Write solutions to problems your potential users are searching for.
    `,
    author: 'Sarah Jenkins',
    authorBio: 'Sarah is a Lead Engineer at TechFlow with a passion for web performance and accessibility. She writes about the intersection of code and marketing.',
    authorAvatar: 'https://i.pravatar.cc/150?u=sarah',
    date: 'Oct 15, 2023',
    category: 'Engineering',
    imageUrl: 'https://picsum.photos/800/400?random=2'
  },
  {
    id: '3',
    title: 'Mental Models for High Performers',
    excerpt: 'Upgrade your decision-making toolkit with these timeless mental frameworks.',
    content: `
# Mental Models for High Performers

Your brain is software. You can upgrade it by installing better decision-making frameworks.

## 1. First Principles Thinking
Break problems down to their fundamental truths. Don't reason by analogy ("We'll do X because Y did it"). Reason from the ground up.

## 2. Inversion
Instead of asking "How do I succeed?", ask "How do I fail?" and avoid those things.

## 3. Second-Order Thinking
Ask "And then what?" Consider the long-term consequences of your immediate actions.
    `,
    author: 'Marcus Aurelius',
    authorBio: 'Marcus is a philosophy enthusiast and productivity coach. He helps founders maintain clarity and resilience in high-pressure environments.',
    authorAvatar: 'https://i.pravatar.cc/150?u=marcus',
    date: 'Oct 20, 2023',
    category: 'Mindset',
    imageUrl: 'https://picsum.photos/800/400?random=3'
  },
  {
    id: '4',
    title: 'The 80/20 Rule in SaaS Sales',
    excerpt: 'Focusing on the 20% of features that drive 80% of the value for enterprise clients.',
    content: `
# Pareto Principle in Sales

Most founders try to sell everything to everyone. This is a mistake.

## Identify the Vital Few
Look at your usage data. Which features are used daily? Sell those. Ignore the rest in your pitch.
    `,
    author: 'Jessica Wu',
    authorBio: 'Jessica is a sales executive with over 10 years of experience in B2B SaaS. She specializes in helping technical founders close their first enterprise deals.',
    authorAvatar: 'https://i.pravatar.cc/150?u=jessica',
    date: 'Nov 02, 2023',
    category: 'Strategy',
    imageUrl: 'https://picsum.photos/800/400?random=4'
  },
  {
    id: '5',
    title: 'Optimizing React 19 Performance',
    excerpt: 'Deep dive into the new compiler and how it changes the way we think about memoization.',
    content: `
# React 19 Is Here

The era of manual memoization is ending. Here is how the new React Compiler handles dependency arrays automatically.
    `,
    author: 'Tom Dev',
    authorBio: 'Tom is a frontend architect obsessed with frame rates and bundle sizes. He contributes to several open-source React libraries.',
    authorAvatar: 'https://i.pravatar.cc/150?u=tom',
    date: 'Nov 05, 2023',
    category: 'Engineering',
    imageUrl: 'https://picsum.photos/800/400?random=5'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'The Founder\'s OS',
    description: 'A comprehensive Notion system to manage your entire startup life, from tasks to vision.',
    price: 49,
    rating: 4.8,
    features: ['Project Management', 'CRM Template', 'Financial Tracker', 'Investor CRM'],
    imageUrl: 'https://picsum.photos/400/300?random=10',
    tags: ['Productivity', 'Notion']
  },
  {
    id: 'p2',
    name: 'SaaS UI Kit Pro',
    description: '200+ Tailwind components designed for conversion and speed. Copy, paste, launch.',
    price: 89,
    rating: 4.9,
    features: ['Dark Mode Support', 'React & Vue', 'Figma Files', 'Lifetime Updates'],
    imageUrl: 'https://picsum.photos/400/300?random=11',
    tags: ['Design', 'Code']
  },
  {
    id: 'p3',
    name: 'Email Marketing Masterclass',
    description: 'A 4-hour deep dive into crafting emails that sell without being sleazy.',
    price: 29,
    rating: 4.5,
    features: ['Video Course', 'Swipe Files', 'Sequence Templates', 'Analytics Guide'],
    imageUrl: 'https://picsum.photos/400/300?random=12',
    tags: ['Marketing', 'Course']
  }
];

export const INITIAL_FORUM_TOPICS: ForumTopic[] = [
  {
    id: 't1',
    title: 'The Solopreneur Stack: What are you building with?',
    content: 'I’m curious what everyone is using for their MVPs in 2024. I’m leaning towards Next.js and Supabase, but the complexity can be overwhelming. Any thoughts on simpler stacks?',
    author: 'IndieDev99',
    date: 'Oct 24, 2023',
    category: 'Engineering',
    views: 342,
    replies: [
      {
        id: 'r1',
        author: 'Sarah Jenkins',
        content: 'Speed is everything. Use what you know. If that is PHP, use PHP. Users do not care about your stack, they care about the problem you solve.',
        date: 'Oct 24, 2023'
      }
    ]
  },
  {
    id: 't2',
    title: 'Validating ideas before writing code',
    content: 'I have wasted 6 months building something nobody wanted. How do you folks validate your ideas? Landing page? Cold outreach? I feel stuck in the building phase.',
    author: 'Marcus A.',
    date: 'Oct 26, 2023',
    category: 'Strategy',
    views: 128,
    replies: []
  },
  {
    id: 't3',
    title: 'Best resources for learning detailed UI design?',
    content: 'My backend skills are solid, but my apps look like they are from 2010. Recommendations for "developer-friendly" design courses or books?',
    author: 'FrontendFan',
    date: 'Oct 28, 2023',
    category: 'Design',
    views: 56,
    replies: []
  }
];