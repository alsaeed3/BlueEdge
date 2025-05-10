// Types for potential clients feature
export interface PotentialClient {
  id: string;
  name: string;
  avatarSrc: string;
  potentialScore: number; // 1-100
  position: string;
  company: string;
  industry: string;
  location: string;
  isFeatured?: boolean;
}

// Client data with real names matching available avatar images
export const potentialClients: PotentialClient[] = [
  {
    id: "simeon-wansi",
    name: "Simeon Wansi",
    avatarSrc: "/avatars/simeon_wansi.png",
    potentialScore: 95,
    position: "CTO",
    company: "Dubai Technologies LLC",
    industry: "Technology",
    location: "Dubai, UAE",
    isFeatured: true,
  },
  {
    id: "aisha-osman",
    name: "Aisha Osman",
    avatarSrc: "/avatars/aisha_osman.png",
    potentialScore: 88,
    position: "CFO",
    company: "Gulf Finance Group",
    industry: "Finance",
    location: "Abu Dhabi, UAE",
  },
  {
    id: "ahmed-tarek",
    name: "Ahmed Tarek",
    avatarSrc: "/avatars/ahmed_tarek.png",
    potentialScore: 85,
    position: "CEO",
    company: "MenaRise Ventures",
    industry: "Venture Capital",
    location: "Dubai, UAE",
  },
  {
    id: "rania-al-haddad",
    name: "Rania Al Haddad",
    avatarSrc: "/avatars/rania_al_haddad.png",
    potentialScore: 82,
    position: "Director of Operations",
    company: "Emirates Global Logistics",
    industry: "Logistics",
    location: "Sharjah, UAE",
  },
  {
    id: "ali-mansour",
    name: "Ali Mansour",
    avatarSrc: "/avatars/ali_mansour.png",
    potentialScore: 79,
    position: "Investment Director",
    company: "Dubai Investment Authority",
    industry: "Investment",
    location: "Dubai, UAE",
  },
  {
    id: "noura-el-shaarawi",
    name: "Noura El Shaarawi",
    avatarSrc: "/avatars/noura_el_shaarawi.png",
    potentialScore: 78,
    position: "VP of Marketing",
    company: "Gulf Media Group",
    industry: "Media",
    location: "Dubai, UAE",
  },
  {
    id: "james-carter",
    name: "James Carter",
    avatarSrc: "/avatars/james_carter.png",
    potentialScore: 76,
    position: "Managing Director",
    company: "British Exports UAE",
    industry: "International Trade",
    location: "Dubai, UAE",
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    avatarSrc: "/avatars/priya_patel.png",
    potentialScore: 75,
    position: "Head of HR",
    company: "Dubai Telecom",
    industry: "Telecommunications",
    location: "Dubai, UAE",
  },
  {
    id: "hassan-kassem",
    name: "Hassan Kassem",
    avatarSrc: "/avatars/hassan_kassem.png",
    potentialScore: 74,
    position: "Regional Director",
    company: "MENA Construction Group",
    industry: "Construction",
    location: "Abu Dhabi, UAE",
  },
  {
    id: "maria-fernandez",
    name: "Maria Fernandez",
    avatarSrc: "/avatars/maria_fernandez.png",
    potentialScore: 73,
    position: "Legal Counsel",
    company: "International Law Partners",
    industry: "Legal",
    location: "Dubai, UAE",
  },
  {
    id: "omar-said",
    name: "Omar Said",
    avatarSrc: "/avatars/omar_said.png",
    potentialScore: 72,
    position: "Financial Analyst",
    company: "Emirates Banking Group",
    industry: "Banking",
    location: "Dubai, UAE",
  },
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    avatarSrc: "/avatars/yuki_tanaka.png",
    potentialScore: 71,
    position: "Director of Innovation",
    company: "Future Tech Dubai",
    industry: "Technology",
    location: "Dubai, UAE",
  },
  {
    id: "carlos-gomez",
    name: "Carlos Gomez",
    avatarSrc: "/avatars/carlos_gomez.png",
    potentialScore: 70,
    position: "Sales Director",
    company: "Global Retail Solutions",
    industry: "Retail",
    location: "Dubai, UAE",
  },
  {
    id: "dina-youssef",
    name: "Dina Youssef",
    avatarSrc: "/avatars/dina_youssef.png",
    potentialScore: 69,
    position: "Hospitality Manager",
    company: "Luxury Hotels Group",
    industry: "Hospitality",
    location: "Dubai, UAE",
  },
  {
    id: "chen-wei",
    name: "Chen Wei",
    avatarSrc: "/avatars/chen_wei.png",
    potentialScore: 68,
    position: "Supply Chain Director",
    company: "Asian Trade Consortium",
    industry: "Logistics",
    location: "Dubai, UAE",
  }
];

// Scenario data for Simeon Wansi
export interface AgentAction {
  role: string;
  avatar: string;
  title: string;
  expertise: string;
  thinkingProcess: string[];
  actions: string[];
  finalContent: string;
}

export interface ScenarioStep {
  id: string;
  title: string;
  agentAction?: AgentAction;
  clientResponse?: {
    content: string;
    enthusiasm: number; // 1-5
    interestPoints: string[];
    decisionFactors?: string[];
    communicationMethod?: string;
  };
  visualContent?: {
    type: "document" | "product" | "ad" | "confirmation" | "chart" | "other";
    image?: string;
    content: string;
  };
}

export const simeonWansiScenario: ScenarioStep[] = [
  {
    id: "social-media-detection",
    title: "Social Media Detection",
    agentAction: {
      role: "Social Intelligence Agent",
      avatar: "/avatars/elena_morozova.png",
      title: "Social Media Analyst",
      expertise: "Digital Footprint Analysis",
      thinkingProcess: [
        "Scanning social profiles for Simeon Wansi",
        "Detected recent status change on LinkedIn",
        "Post indicates new CTO position at Dubai Technologies LLC",
        "Analyzing timing of announcement (posted 3 days ago)",
        "Evaluating network reactions to identify connections",
        "Cross-referencing with database of high-value potential clients"
      ],
      actions: [
        "Create client profile with social data",
        "Flag as high-opportunity lead based on position",
        "Tag for real estate opportunity matching",
        "Route to Real Estate Marketing Agent for follow-up"
      ],
      finalContent: "Detected status change: Simeon Wansi has been appointed CTO at Dubai Technologies LLC. Client profile created and categorized as HIGH PRIORITY based on position, industry, and estimated compensation package. Social media analysis indicates recent relocation to Dubai with temporary housing arrangements. Flagged as immediate opportunity for luxury real estate offering."
    }
  },
  {
    id: "real-estate-opportunity",
    title: "Real Estate Opportunity",
    agentAction: {
      role: "Real Estate Marketing Agent",
      avatar: "/avatars/isabelle_tremblay.png",
      title: "Property Marketing Specialist",
      expertise: "Luxury Real Estate Targeting",
      thinkingProcess: [
        "Reviewing Simeon's professional profile and estimated income",
        "Analyzing suitable property types for tech executive",
        "Identifying location preferences based on commute to Dubai Technologies LLC",
        "Matching amenities to likely lifestyle preferences",
        "Calculating optimal price range based on position and industry standards",
        "Selecting messaging that emphasizes exclusivity and technology integration"
      ],
      actions: [
        "Select Downtown Dubai penthouse property from inventory",
        "Customize ad with emphasis on smart home features",
        "Highlight proximity to Dubai Technologies LLC headquarters",
        "Prepare personalized outreach message",
        "Schedule delivery for optimal engagement time"
      ],
      finalContent: "Targeted Real Estate Opportunity: Downtown Dubai Smart Penthouse\n\nDear Simeon,\n\nCongratulations on your new role as CTO at Dubai Technologies LLC. For technology leaders like yourself, we've reserved an exceptional smart penthouse in Downtown Dubai, featuring complete home automation, dedicated fiber connectivity, and just a 7-minute commute to your new office. This property combines luxury living with the technology infrastructure that matches your professional standards.\n\nLimited viewing appointments available this week.\n\nRegards,\nGargash Luxury Properties"
    },
    visualContent: {
      type: "ad",
      content: "DOWNTOWN DUBAI SMART PENTHOUSE\n• Full home automation system\n• Dedicated 10Gbps fiber connection\n• Private elevator access\n• 7-minute commute to Dubai Technologies LLC\n• 3 bedrooms, 3.5 bathrooms\n• 360° views of Downtown Dubai\n• 24/7 concierge & tech support"
    }
  },
  {
    id: "real-estate-acceptance",
    title: "Real Estate Acceptance",
    clientResponse: {
      content: "Thank you for reaching out! This property looks exactly like what I've been searching for. The smart home features are particularly appealing given my tech background, and the location is perfect for my new role. I'd like to schedule a viewing for this Thursday afternoon if possible.",
      enthusiasm: 5,
      interestPoints: [
        "Smart home technology integration",
        "Proximity to new workplace",
        "Exclusivity of the property",
        "Move-in timeline matching new job start"
      ],
      decisionFactors: [
        "Technology amenities aligned with personal interests",
        "Location convenience for new position",
        "Prestige of Downtown Dubai address",
        "Immediate availability matching relocation timeline"
      ],
      communicationMethod: "Direct message response"
    }
  },
  {
    id: "contract-generation",
    title: "Contract Generation",
    agentAction: {
      role: "Legal Documentation Agent",
      avatar: "/avatars/daniel_nkrumah.png",
      title: "Legal Contract Specialist",
      expertise: "Real Estate Documentation",
      thinkingProcess: [
        "Retrieving UAE real estate contract templates",
        "Checking downtown Dubai zoning regulations",
        "Reviewing property-specific details and limitations",
        "Customizing payment terms based on client profile",
        "Validating all legal requirements are met",
        "Ensuring compliance with UAE foreign ownership laws",
        "Preparing digital signature integration"
      ],
      actions: [
        "Generate customized sales contract",
        "Add property-specific terms and conditions",
        "Include smart home warranty documentation",
        "Prepare digital signature workflow",
        "Set up secure document delivery"
      ],
      finalContent: "Contract generated for Downtown Dubai Smart Penthouse acquisition. All required fields populated with client and property data. Payment terms structured with 25% initial payment and 75% within 30 days. Smart home technology warranty included with 3-year comprehensive coverage. Contract ready for digital signature by both parties."
    },
    visualContent: {
      type: "document",
      content: "REAL ESTATE PURCHASE AGREEMENT\nBETWEEN: Gargash Luxury Properties AND Simeon Wansi\nPROPERTY: Downtown Dubai Smart Penthouse, Unit 4501\nPURCHASE PRICE: AED 12,500,000\nDEPOSIT: AED 3,125,000 (25%)\nCLOSING DATE: June 15, 2025\nSMART HOME WARRANTY: 3-year comprehensive coverage\n[Document prepared for digital signature]"
    }
  },
  {
    id: "loyalty-program-integration",
    title: "Loyalty Program Integration",
    agentAction: {
      role: "Customer Loyalty Agent",
      avatar: "/avatars/lina_krause.png",
      title: "Loyalty Program Director",
      expertise: "VIP Client Relationships",
      thinkingProcess: [
        "Calculating purchase value for loyalty points allocation",
        "Determining appropriate tier status for high-value real estate purchase",
        "Reviewing additional benefits appropriate for client profile",
        "Checking for potential cross-selling opportunities",
        "Preparing personalized welcome to loyalty program",
        "Evaluating early access opportunities for upcoming properties"
      ],
      actions: [
        "Create premium tier loyalty account",
        "Allocate 250,000 loyalty points for property purchase",
        "Enable VIP concierge services",
        "Activate exclusive event invitations",
        "Schedule follow-up for additional benefits explanation"
      ],
      finalContent: "Welcome to Gargash Elite Status! Your real estate purchase has earned you our highest loyalty tier with 250,000 Gargash Points. Benefits include dedicated concierge service, priority access to new property listings, VIP event invitations, and exclusive partner benefits with luxury brands across Dubai. Your personal concierge will contact you within 24 hours to provide a complete overview of your Elite membership privileges."
    },
    visualContent: {
      type: "confirmation",
      content: "GARGASH ELITE STATUS ACHIEVED\n• 250,000 Gargash Points added to your account\n• Dedicated Lifestyle Concierge assigned: Sophia Rahman\n• Priority access to all new property releases\n• Complimentary property management for 1 year\n• VIP access to Dubai's most exclusive events\n• Luxury brand partner privileges activated"
    }
  },
  {
    id: "lease-opportunity",
    title: "Lease Opportunity",
    agentAction: {
      role: "Finance Solutions Agent",
      avatar: "/avatars/raj_mehta.png",
      title: "Automotive Finance Specialist",
      expertise: "Executive Leasing Programs",
      thinkingProcess: [
        "Analyzing client profile for vehicle preferences",
        "Reviewing executive leasing programs available",
        "Calculating optimal lease terms based on residency status",
        "Comparing purchase vs. lease financial benefits",
        "Identifying tax advantages for business use component",
        "Determining appropriate vehicle class for CTO position"
      ],
      actions: [
        "Prepare executive lease package for luxury vehicle",
        "Customize terms for new resident status",
        "Include business use tax benefit documentation",
        "Create side-by-side comparison of lease vs. purchase",
        "Schedule personalized consultation to present options"
      ],
      finalContent: "Executive Lease Opportunity: The Gargash Executives Program provides a comprehensive luxury vehicle leasing solution tailored for your new position. We've prepared a personalized offer including a Mercedes E-Class with flexible 24-month terms, complete maintenance coverage, and tax benefits for business use. This program includes the option to upgrade to a new model after 12 months with no additional fees."
    },
    visualContent: {
      type: "chart",
      content: "EXECUTIVE LEASE ADVANTAGE\n• 24-month flexible lease term\n• Monthly payment: AED 5,200\n• No down payment required\n• Complete maintenance included\n• Insurance package included\n• Early upgrade option at 12 months\n• Business use tax benefits\n• Dedicated service representative"
    }
  },
  {
    id: "vehicle-sale",
    title: "Vehicle Sale",
    agentAction: {
      role: "Automotive Sales Agent",
      avatar: "/avatars/jonas_schmidt.png",
      title: "Luxury Vehicle Consultant",
      expertise: "Executive Auto Matching",
      thinkingProcess: [
        "Reviewing client profile for matching with suitable vehicles",
        "Analyzing tech executives' vehicle preferences from historical data",
        "Considering Dubai climate and driving conditions",
        "Evaluating status alignment with executive position",
        "Checking inventory for immediate availability",
        "Preparing personalized vehicle presentation"
      ],
      actions: [
        "Select Mercedes E53 AMG from available inventory",
        "Prepare personalized feature demonstration",
        "Highlight technology integration features",
        "Configure financing options based on client profile",
        "Schedule exclusive showroom appointment"
      ],
      finalContent: "Based on your professional profile and preferences, I've identified the Mercedes-AMG E53 as the perfect match for your new position. This vehicle combines executive presence with cutting-edge technology including MBUX AI assistant compatibility with your smart home systems. We have a Obsidian Black model with the Executive Technology Package available for immediate delivery. Your Elite status qualifies you for our VIP delivery service directly to your new Downtown Dubai residence."
    },
    visualContent: {
      type: "product",
      content: "MERCEDES-AMG E53\n• Executive Technology Package\n• MBUX AI with smart home integration\n• Burmester® high-end 3D surround sound\n• Obsidian Black exterior / Macchiato Beige leather\n• Available for immediate delivery\n• Exclusive financing: 1.9% for Gargash Elite members\n• Complimentary first year maintenance\n• Dedicated personal service advisor"
    }
  },
  {
    id: "investment-opportunity",
    title: "Investment Opportunity",
    agentAction: {
      role: "Wealth Management Agent",
      avatar: "/avatars/sofia_grimaldi.png",
      title: "Investment Strategy Director",
      expertise: "Executive Wealth Planning",
      thinkingProcess: [
        "Creating investment risk profile based on tech executive background",
        "Analyzing optimal portfolio allocation for new UAE resident",
        "Identifying tax-advantaged investment structures",
        "Evaluating property portfolio diversification options",
        "Reviewing technology sector investment opportunities",
        "Preparing personalized investment proposal"
      ],
      actions: [
        "Create diversified investment package proposal",
        "Include property portfolio diversification options",
        "Add UAE tax-advantaged structure documentation",
        "Prepare executive summary with key benefits",
        "Schedule investment consultation meeting"
      ],
      finalContent: "Welcome to Gargash Wealth Management. We've prepared a tailored investment strategy that complements your real estate acquisition and new position. Our Technology Leaders Portfolio offers exposure to global tech growth while our UAE Property Fund provides diversification across commercial real estate. As a new UAE resident, you'll benefit from our tax-optimized investment structures designed specifically for technology executives relocating to the region. Your Gargash Elite status provides access to exclusive investment opportunities not available to the general market."
    },
    visualContent: {
      type: "chart",
      content: "EXECUTIVE INVESTMENT STRATEGY\n• Technology Leaders Global Portfolio: 40%\n• UAE Property Diversification Fund: 35%\n• Secure Income Fund: 15%\n• Alternative Investments: 10%\n• Tax-advantaged structure for UAE residents\n• Quarterly rebalancing and reporting\n• Dedicated wealth advisor: Sofia Grimaldi\n• Exclusive access to pre-IPO opportunities"
    }
  }
];
