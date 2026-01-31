#!/usr/bin/env node
/**
 * integrate-blog-content.js
 * 
 * Reads all markdown blog posts from /data/workspace/blog-content/
 * and updates src/data/blogPosts.js with the full content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_SOURCE_DIR = '/data/workspace/blog-content';
const BLOG_DATA_FILE = path.join(__dirname, 'src/data/blogPosts.js');

// Blog post metadata mapping
const blogMeta = [
  {
    file: '01-ai-implementation-guide-orlando-2026.md',
    slug: 'ai-implementation-guide-orlando-2026',
    title: 'AI Implementation Guide for Orlando Businesses 2026',
    description: 'Complete framework for implementing AI in Orlando and Central Florida businesses. Proven 4-phase approach with real ROI projections and local case studies.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/orlando-ai-implementation-hero.png',
    category: 'Strategy',
    readTime: '8 min read',
  },
  {
    file: '02-kissimmee-ai-cost-reduction.md',
    slug: 'kissimmee-businesses-cut-costs-40-percent-ai',
    title: 'How Kissimmee Companies Cut Costs by 40% with AI',
    description: 'Tourism and hospitality businesses in Kissimmee are achieving dramatic cost savings with AI automation. 3 detailed case studies with real numbers.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/kissimmee-cost-reduction-hero.png',
    category: 'Best Practices',
    readTime: '6 min read',
  },
  {
    file: '03-st-cloud-business-automation-roi.md',
    slug: 'st-cloud-business-automation-roi-90-days',
    title: 'St. Cloud Business Automation: ROI in 90 Days',
    description: 'Growing St. Cloud businesses are implementing AI automation that pays for itself in 90 days or less. Framework and case studies from southern Osceola County.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/st-cloud-automation-hero.png',
    category: 'Best Practices',
    readTime: '7 min read',
  },
  {
    file: '04-central-florida-ai-consulting-guide.md',
    slug: 'central-florida-ai-consulting-guide',
    title: 'Central Florida AI Consulting: What You Need to Know',
    description: 'Complete guide to AI consulting across Central Florida\'s 100-mile corridor. From Daytona Beach to Haines City, what works and what doesn\'t.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/central-florida-consulting-hero.png',
    category: 'Strategy',
    readTime: '9 min read',
  },
  {
    file: '05-machine-learning-orlando-small-business.md',
    slug: 'machine-learning-orlando-small-business',
    title: 'Machine Learning for Small Businesses in Orlando: A Practical Guide',
    description: '7 practical machine learning applications for Orlando small businesses with real case studies, cost breakdowns, and ROI timelines.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/machine-learning-small-business-hero.png',
    category: 'Technology',
    readTime: '8 min read',
  },
  {
    file: '06-winter-park-ai-strategy-professional-services.md',
    slug: 'winter-park-ai-strategy-professional-services',
    title: 'Winter Park AI Strategy for Professional Services Firms',
    description: 'Legal, accounting, consulting, and financial advisory firms in Winter Park are using AI to reclaim billable hours. Complete implementation framework.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/winter-park-professional-services.png',
    category: 'Strategy',
    readTime: '8 min read',
  },
  {
    file: '07-lake-mary-tech-companies-ai-integration.md',
    slug: 'lake-mary-tech-companies-ai-integration',
    title: 'Lake Mary Tech Companies: AI Integration Best Practices',
    description: 'SaaS, IT consultancies, and tech startups in Lake Mary\'s corridor are integrating AI into products and operations. Technical guide with real implementation examples.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/lake-mary-tech-ai.png',
    category: 'Technology',
    readTime: '7 min read',
  },
  {
    file: '08-daytona-beach-seasonal-business-ai.md',
    slug: 'daytona-beach-seasonal-business-ai',
    title: 'Daytona Beach Seasonal Business AI: Automate the Peaks, Survive the Valleys',
    description: 'Bike Week, Spring Break, race weekends—Daytona\'s seasonal businesses face impossible staffing challenges. AI solves the seasonal rollercoaster.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/daytona-seasonal-business.png',
    category: 'Best Practices',
    readTime: '7 min read',
  },
  {
    file: '09-sanford-manufacturing-logistics-ai.md',
    slug: 'sanford-manufacturing-logistics-ai',
    title: 'Sanford Manufacturing & Logistics: AI for Operations Excellence',
    description: 'Predictive maintenance, quality control automation, and route optimization for Sanford\'s industrial corridor. Real case studies from aerospace, food processing, and distribution.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/sanford-manufacturing-ai.png',
    category: 'Technology',
    readTime: '8 min read',
  },
  {
    file: '10-orlando-healthcare-ai-medical-practice.md',
    slug: 'orlando-healthcare-ai-medical-practice',
    title: 'Orlando Healthcare AI: Transforming Medical Practice Operations',
    description: 'HIPAA-compliant AI for medical practices, dental offices, and healthcare facilities across Orlando, Lake Nona, and Winter Garden. Reduce administrative burden, improve patient care.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/orlando-healthcare-ai.png',
    category: 'Best Practices',
    readTime: '7 min read',
  },
  {
    file: '11-orlando-real-estate-ai-automation.md',
    slug: 'orlando-real-estate-ai-automation',
    title: 'Orlando Real Estate AI: Automate Lead Generation to Closing',
    description: 'Real estate agents and teams across Orlando metro are using AI to capture more leads, close more deals, and scale without burning out. Complete automation framework.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/orlando-real-estate-ai.png',
    category: 'Best Practices',
    readTime: '7 min read',
  },
  {
    file: '12-central-florida-restaurant-ai-automation.md',
    slug: 'central-florida-restaurant-ai-automation',
    title: 'Central Florida Restaurant AI: From Chaos to Clockwork',
    description: 'Restaurants across Orlando, Winter Park, and Kissimmee are using AI for reservations, phone orders, demand forecasting, and staff scheduling. Real revenue and cost impact.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/central-florida-restaurant-ai.png',
    category: 'Best Practices',
    readTime: '6 min read',
  },
  {
    file: '13-retail-ai-orlando-inventory-customer-experience.md',
    slug: 'orlando-retail-ai-inventory-customer-experience',
    title: 'Orlando Retail AI: Optimize Inventory, Personalize Experience',
    description: 'Compete with Amazon by combining AI-powered efficiency with human-centered experiences. Predictive inventory, personalized recommendations, and dynamic pricing for Central Florida retailers.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/orlando-retail-ai.png',
    category: 'Technology',
    readTime: '7 min read',
  },
  {
    file: '14-orlando-startups-small-business-ai-strategy.md',
    slug: 'orlando-startups-small-business-ai-strategy',
    title: 'Orlando Startups & Small Businesses: AI Strategy on a Budget',
    description: 'AI for 1-50 person businesses in Orlando. High-ROI starting points, budget-conscious strategies, and real small business examples with $5K-$50K implementations.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/orlando-startup-ai.png',
    category: 'Strategy',
    readTime: '6 min read',
  },
  {
    file: '15-ai-implementation-mistakes-central-florida.md',
    slug: 'ai-implementation-mistakes-central-florida',
    title: '10 AI Implementation Mistakes Central Florida Businesses Make (And How to Avoid Them)',
    description: 'After 150+ implementations across Central Florida, we\'ve seen every mistake. Technology-first thinking, no success metrics, vendor lock-in, and 7 more expensive errors to avoid.',
    date: '2026-01-31',
    author: 'Vektar AI Team',
    image: '/blog/ai-mistakes-avoid.png',
    category: 'Strategy',
    readTime: '8 min read',
  },
];

console.log('🔄 Reading markdown files...\n');

// Read all markdown files and add content
const blogPosts = blogMeta.map((meta, index) => {
  const filePath = path.join(BLOG_SOURCE_DIR, meta.file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`✅ [${index + 1}/15] ${meta.file} (${(content.length / 1024).toFixed(1)}KB)`);
    
    return {
      slug: meta.slug,
      title: meta.title,
      description: meta.description,
      date: meta.date,
      author: meta.author,
      image: meta.image,
      category: meta.category,
      readTime: meta.readTime,
      content: content,
    };
  } catch (error) {
    console.error(`❌ Error reading ${meta.file}:`, error.message);
    return null;
  }
}).filter(Boolean);

console.log(`\n📝 Successfully read ${blogPosts.length} blog posts`);
console.log(`📊 Total content size: ${(blogPosts.reduce((sum, post) => sum + post.content.length, 0) / 1024).toFixed(1)}KB\n`);

// Generate the blogPosts.js file
const output = `// Blog post metadata and content - VEKTAR AI Solution
// Auto-generated by integrate-blog-content.js on ${new Date().toISOString()}
const blogPosts = ${JSON.stringify(blogPosts, null, 2)};

export default blogPosts;
`;

// Write to file
try {
  fs.writeFileSync(BLOG_DATA_FILE, output, 'utf8');
  console.log(`✅ Successfully wrote ${BLOG_DATA_FILE}`);
  console.log(`📦 File size: ${(output.length / 1024).toFixed(1)}KB\n`);
  console.log('🎉 Blog content integration complete!\n');
  console.log('Next steps:');
  console.log('1. cd /data/workspace/vektar');
  console.log('2. git add src/data/blogPosts.js src/components/layout/Layout.jsx');
  console.log('3. git commit -m "Integrate full blog content + add navigation links"');
  console.log('4. git push origin clawdy13126\n');
} catch (error) {
  console.error('❌ Error writing blogPosts.js:', error.message);
  process.exit(1);
}
