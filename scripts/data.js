/**
 * Project Nova — Editorial Data Store
 * Articles, Authors, Categories, Pricing Plans, FAQs & Stats
 */

const NOVA_DATA = {
  categories: [
    { id: 'all', name: 'All Stories' },
    { id: 'tech', name: 'Future Tech', badgeClass: '' },
    { id: 'design', name: 'Architecture & Design', badgeClass: 'cyan' },
    { id: 'culture', name: 'Digital Culture', badgeClass: 'indigo' },
    { id: 'ai', name: 'Synthetic Minds', badgeClass: '' },
    { id: 'future', name: 'Speculative Futures', badgeClass: 'cyan' }
  ],

  stats: [
    { target: 142000, suffix: '+', label: 'Monthly Readers' },
    { target: 380, suffix: '+', label: 'In-Depth Essays' },
    { target: 48, suffix: '', label: 'Contributing Fellows' },
    { target: 99.4, suffix: '%', label: 'Satisfaction Rate' }
  ],

  authors: [
    {
      id: 'elena-rostova',
      name: 'Dr. Elena Rostova',
      role: 'Principal Researcher & Cyber-Theorist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Former senior advisor on neural cognition architectures, writing at the intersection of mind upload ethics and human autonomy.'
    },
    {
      id: 'marcus-vance',
      name: 'Marcus Vance',
      role: 'Design Critic & Creative Technologist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Investigates the revival of tangible digital interfaces, brutalist typography, and anti-algorithmic digital artifacts.'
    },
    {
      id: 'kaito-tanaka',
      name: 'Kaito Tanaka',
      role: 'Systems Architect & Cryptographer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Specializing in zero-knowledge consensus layers, peer-to-peer data sovereignty, and post-cloud computing.'
    },
    {
      id: 'sophia-chen',
      name: 'Sophia Chen',
      role: 'Cultural Anthologist',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      bio: 'Documents micro-communities, post-social networks, and underground collective digital humanities.'
    }
  ],

  articles: [
    {
      id: 'art-1',
      title: 'The Sovereign Mind in the Age of Synthetic Cognition',
      subtitle: 'Why human agency requires a radical rethinking of consciousness and tool usage.',
      category: 'ai',
      categoryName: 'Synthetic Minds',
      badgeClass: '',
      date: 'Oct 04, 2026',
      readTime: '8 min read',
      views: '24.8K',
      likes: 1420,
      featured: true,
      trendingRank: '01',
      authorId: 'elena-rostova',
      author: {
        name: 'Dr. Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
      },
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      excerpt: 'As neural models surpass semantic mimicry and achieve causal inference, humanity stands at a critical juncture: will intellectual augmentation preserve our subjective sovereignty, or fold human volition into automated consensus?',
      contentHtml: `
        <p>In the quiet history of technology, tools have customarily acted as extensions of muscle and sensory bandwidth: the lever amplified torque, the telescope extended optics, and the transistor accelerated arithmetic. Yet none of these contrivances laid claim to the prerogative of intuition.</p>
        <div class="reader-pullquote">"The greatest danger of synthetic intellect is not hostility, but the quiet evaporation of human discernment through painless convenience."</div>
        <h3>The Shift from Automation to Intent Formation</h3>
        <p>When autonomous systems begin anticipating decisions before deliberative consciousness engages, agency is no longer an exertion—it becomes an editorial veto. Most individuals, pressed by the velocity of modern demands, surrender the veto in exchange for fluid speed.</p>
        <p>What we observe in recent frontier labs is not merely faster generative loops; it is the emergence of speculative reasoning engines capable of drafting and pruning their own hypothesis spaces. If human cognition is characterized by the friction of uncertainty, the complete removal of intellectual friction may atrophy the very faculties of critical originality.</p>
        <h3>Reclaiming the Boundaries of the Self</h3>
        <p>To preserve cognitive sovereignty, we must design computational covenants that treat synthetic models as adversarial sounding boards rather than docile oracle proxies. Augmentation without resistance is subtle sedation.</p>
      `
    },
    {
      id: 'art-2',
      title: 'Brutalist Interfaces & The Return of Tangible Digital Design',
      subtitle: 'Modern UI flattened our tactile world. A new wave of tactile rebels is breaking out.',
      category: 'design',
      categoryName: 'Architecture & Design',
      badgeClass: 'cyan',
      date: 'Oct 02, 2026',
      readTime: '6 min read',
      views: '18.3K',
      likes: 980,
      featured: false,
      trendingRank: '02',
      authorId: 'marcus-vance',
      author: {
        name: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
      },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      excerpt: 'The sterile tyranny of frictionless pastel dashboards has run its course. Designers are reclaiming raw borders, high-contrast typography, and mechanical feedback that demands tactile respect.',
      contentHtml: `
        <p>For two decades, interface design converged onto a single homogenous aesthetic: soft rounded corners, muted pastel tints, and invisible interactive boundaries designed to facilitate subconscious consumption.</p>
        <p>Neo-brutalism in web architecture is not an ironic nostalgia trip; it is an ergonomic protest against digital vaporware. By reintroducing clear tactile frontiers, raw grids, and assertive typography, software once again acknowledges its structural medium.</p>
        <div class="reader-pullquote">"A great interface should not masquerade as invisible air. It should celebrate its geometry and reward intentional touch."</div>
        <p>Interfaces built with distinct edges and responsive resistance foster deeper spatial memory and reduce computational fatigue caused by formless scrolling.</p>
      `
    },
    {
      id: 'art-3',
      title: 'Hyper-Local Subcultures: Why the Algorithmic Feed is Dying',
      subtitle: 'The great retreat from global social feeds into gated digital salons and private webrings.',
      category: 'culture',
      categoryName: 'Digital Culture',
      badgeClass: 'indigo',
      date: 'Sep 29, 2026',
      readTime: '7 min read',
      views: '15.9K',
      likes: 1120,
      featured: false,
      trendingRank: '03',
      authorId: 'sophia-chen',
      author: {
        name: 'Sophia Chen',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80'
      },
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Mass digital public squares have evolved into noise amplification chambers. In response, creative thinkers and researchers are migrating to encrypted group houses, niche webrings, and artisanal newsletters.',
      contentHtml: `
        <p>The dream of a unified global town square has devolved into an inescapable engagement grinder. When every thought is instantly submitted to the judgment of strangers optimized for outrage, genuine dialogue ceases to breathe.</p>
        <p>We are witnessing the flowering of the "Dark Forest" of the internet: self-moderating micro-communities, invite-only IRC collectives, and private epistolary journals where ideas can mature before facing public scrutiny.</p>
        <div class="reader-pullquote">"Culture is never birthed in the blinding spotlight of global feeds; it ferments in dark, protected corners."</div>
      `
    },
    {
      id: 'art-4',
      title: 'Neuromorphic Silicon: The Post-Transformer Compute Horizon',
      subtitle: 'Event-driven spiking neural architectures threaten to overturn traditional GPU hegemony.',
      category: 'tech',
      categoryName: 'Future Tech',
      badgeClass: '',
      date: 'Sep 27, 2026',
      readTime: '10 min read',
      views: '21.4K',
      likes: 870,
      featured: false,
      trendingRank: '04',
      authorId: 'kaito-tanaka',
      author: {
        name: 'Kaito Tanaka',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
      },
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Massive matrix multipliers are consuming the world’s megawatts. As energy walls loom, neuromorphic chips operating on biological spike timing offer a 1000x leap in energy-efficient cognition.',
      contentHtml: `
        <p>The computing industry has built a cathedral upon the foundation of dense matrix multiplication. Yet the biological human cortex operates on less than 20 watts of power while solving complex multidimensional reasoning problems in real time.</p>
        <p>By shifting from clock-synchronized execution to asynchronous event-driven pulses, neuromorphic silicon only fires transistors when state changes occur. The implications for edge robotics and persistent ambient AI are seismic.</p>
      `
    },
    {
      id: 'art-5',
      title: 'The Architecture of Quietude: Soundscapes in Modern Cities',
      subtitle: 'How acoustic ecology and sonic materials are redefining public sanity in mega-cities.',
      category: 'future',
      categoryName: 'Speculative Futures',
      badgeClass: 'cyan',
      date: 'Sep 24, 2026',
      readTime: '5 min read',
      views: '12.1K',
      likes: 640,
      featured: false,
      trendingRank: '05',
      authorId: 'marcus-vance',
      author: {
        name: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
      },
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Noise pollution is the invisible neurotoxin of urbanization. Forward-thinking urbanists are deploying sound-deflecting metamorphic facades and ultrasonic sound masks to restore sonic peace.',
      contentHtml: `
        <p>Modern cities are sonic warfare zones. From combustion harmonics to industrial HVAC whine, our nervous systems exist in a chronic state of low-grade acoustic alarm.</p>
        <p>New bio-acoustic architectures use porous mycelium baffling and parametric kinetic facades that scatter urban noise into naturalistic brown frequencies resembling gentle river flow.</p>
      `
    },
    {
      id: 'art-6',
      title: 'Zero-Knowledge Proofs & The Rebirth of Digital Privacy',
      subtitle: 'Mathematical verification without data exposure is rebuilding trust across the distributed web.',
      category: 'tech',
      categoryName: 'Future Tech',
      badgeClass: '',
      date: 'Sep 21, 2026',
      readTime: '9 min read',
      views: '19.7K',
      likes: 1290,
      featured: false,
      trendingRank: '06',
      authorId: 'kaito-tanaka',
      author: {
        name: 'Kaito Tanaka',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
      },
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
      excerpt: 'In the old paradigm, to verify identity or solvency meant exposing sensitive records. ZK-SNARKs enable absolute mathematical verification without yielding a single byte of private information.',
      contentHtml: `
        <p>Privacy has long been treated as an engineering compromise—a fragile treaty between user sovereignty and institutional compliance. Zero-knowledge cryptography completely dissolves this false dichotomy.</p>
        <p>By proving the truth of a computational statement without revealing the input that makes it true, we can now authenticate age without showing birthdates, prove creditworthiness without revealing assets, and cast secret ballots with public audibility.</p>
      `
    }
  ],

  faqs: [
    {
      q: 'What makes Nova distinct from traditional blogs and publications?',
      a: 'Nova is crafted with a strict editorial manifesto: zero clickbait, zero algorithm-driven fluff, and zero ad surveillance. Every piece is commissioned or written by seasoned practitioners in research, design, and cryptography, presented with bespoke typography and distraction-free reading modes.'
    },
    {
      q: 'Can I cancel or alter my subscription at any time?',
      a: 'Yes, seamlessly. All memberships come with direct 1-click subscription management. If you cancel, your member benefits remain active until the end of your billing cycle with zero hidden fees.'
    },
    {
      q: 'How does the offline and reading bookmark feature work?',
      a: 'Nova uses lightweight client-side local caching. Any article you bookmark is stored in your browser storage so you can review and read your saved library anytime without requiring an active server account.'
    },
    {
      q: 'How can I submit an editorial pitch or contribute as an author?',
      a: 'We welcome original essays, investigative technical reviews, and speculative design pieces. Use our Contact page and select "Editorial Pitch" to submit an abstract. Our editorial board reviews submissions weekly.'
    }
  ],

  plans: [
    {
      id: 'free',
      name: 'Free Reader',
      monthlyPrice: 0,
      annualPrice: 0,
      period: 'Forever free',
      description: 'Essential access to curated weekly dispatches and public thinkpieces.',
      featured: false,
      features: [
        'Access to 10 public essays per month',
        'Standard editorial reading mode',
        'Weekly curated newsletter briefing',
        'Basic local bookmarking'
      ],
      ctaText: 'Get Started Free'
    },
    {
      id: 'pro',
      name: 'Nova Pro',
      monthlyPrice: 14,
      annualPrice: 11,
      period: 'per month',
      description: 'Unrestricted deep-dives, audio readings, full archives & private commentaries.',
      featured: true,
      badge: 'Most Popular',
      features: [
        'Unlimited access to all deep-dive essays',
        'Narrated studio audio recordings for every piece',
        'Full access to 5-year editorial archives',
        'Ad-free, telemetry-free reading experience',
        'Private reader discussion circles & AMAs',
        'Early access to monographs & research papers'
      ],
      ctaText: 'Upgrade to Nova Pro'
    },
    {
      id: 'patron',
      name: 'Lifetime Patron',
      monthlyPrice: 39,
      annualPrice: 31,
      period: 'per month',
      description: 'For institutions, benefactors, and patrons shaping the editorial agenda.',
      featured: false,
      features: [
        'Everything in Nova Pro included',
        'Quarterly printed archival hardcovers delivered',
        'Direct advisory voting on commissioned topics',
        'Exclusive VIP dinners & annual digital summit',
        'Permanent Founder Patron badge on profile',
        'Direct Slack/Matrix channel with editors'
      ],
      ctaText: 'Become a Patron'
    }
  ]
};

// Export to window
window.NOVA_DATA = NOVA_DATA;
