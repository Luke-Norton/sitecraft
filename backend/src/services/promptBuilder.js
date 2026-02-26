// Section descriptions for the prompt
const sectionDescriptions = {
  hero: 'Hero section with bold headline, subheadline, and primary CTA. Use text-5xl md:text-7xl font-bold for heading. Consider gradient text (bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent).',
  services: 'Services section with bento-style grid layout. Use varied card sizes (some span-2), rounded-3xl cards, subtle borders, and hover:scale-[1.02] transitions.',
  about: 'About section with asymmetric two-column layout. Large imagery on one side, text with subtle accent details on the other. Use prose styling.',
  gallery: 'Gallery with masonry or bento grid layout. Rounded-2xl images with hover:scale-105 and subtle shadow transitions. Consider aspect-ratio utilities.',
  testimonials: 'Testimonials with modern card design. Large quotation marks as decorative elements, avatar images, subtle glass effect or gradient borders.',
  team: 'Team grid with hover reveals. Clean cards with rounded-full avatars, social icons on hover, subtle background patterns.',
  pricing: 'Pricing with highlighted "popular" tier. Use ring-2 ring-primary for featured card, gradient backgrounds, clear feature lists with check icons.',
  faq: 'FAQ with animated accordion. Smooth height transitions, rotating chevron icons, clean dividers between items.',
  contact: 'Contact with split layout or floating card design. Form with modern inputs (focus:ring-2), subtle shadows, clear labels.',
}

// Font pairing definitions - Modern 2024+ fonts
const fontPairings = {
  modern: {
    name: 'Modern',
    fonts: 'Inter',
    link: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
    tailwind: "fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }",
  },
  geometric: {
    name: 'Geometric',
    fonts: 'Plus Jakarta Sans',
    link: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
    tailwind: "fontFamily: { sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'] }",
  },
  clean: {
    name: 'Clean',
    fonts: 'DM Sans',
    link: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap',
    tailwind: "fontFamily: { sans: ['DM Sans', 'system-ui', 'sans-serif'] }",
  },
  technical: {
    name: 'Technical',
    fonts: 'Space Grotesk',
    link: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
    tailwind: "fontFamily: { sans: ['Space Grotesk', 'system-ui', 'sans-serif'] }",
  },
  friendly: {
    name: 'Friendly',
    fonts: 'Outfit',
    link: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap',
    tailwind: "fontFamily: { sans: ['Outfit', 'system-ui', 'sans-serif'] }",
  },
  elegant: {
    name: 'Elegant',
    fonts: 'Sora',
    link: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap',
    tailwind: "fontFamily: { sans: ['Sora', 'system-ui', 'sans-serif'] }",
  },
  editorial: {
    name: 'Editorial',
    fonts: 'Fraunces + Inter',
    link: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap',
    tailwind: "fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], serif: ['Fraunces', 'Georgia', 'serif'] }",
    note: 'Use font-serif for headings, font-sans for body',
  },
  luxury: {
    name: 'Luxury',
    fonts: 'Cormorant + DM Sans',
    link: 'https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap',
    tailwind: "fontFamily: { sans: ['DM Sans', 'system-ui', 'sans-serif'], serif: ['Cormorant', 'Georgia', 'serif'] }",
    note: 'Use font-serif for headings, font-sans for body',
  },
}

// Header style descriptions
const headerStyles = {
  standard: `Modern sticky header with backdrop-blur-md bg-white/80 dark:bg-gray-950/80. Logo left, nav right.
    Nav links: text-sm font-medium with hover:text-primary transition.
    Consider pill-shaped active states or animated underlines.
    Mobile: Hamburger with smooth slide-in drawer.`,
  centered: `Centered floating header with rounded-full or rounded-2xl shape, mx-auto max-w-4xl mt-4.
    Glass effect: bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg.
    Logo centered, nav items spread evenly with gap-8.`,
  minimal: `Minimal transparent header that blends with hero.
    Becomes visible (bg-white/90 backdrop-blur) on scroll via JS.
    Very subtle, content-first approach.`,
  floating: `Floating nav bar: fixed top-4 left-1/2 -translate-x-1/2 with rounded-full.
    Pill-shaped container with p-2, items inside as rounded-full buttons.
    Modern SaaS style navigation.`,
}

// Hero style descriptions
const heroStyles = {
  fullscreen: `Full viewport hero (min-h-screen). Centered content with flex items-center justify-center.
    Large headline (text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight).
    Subtle gradient or pattern background. Floating shapes or grid pattern optional.`,
  split: `Two-column hero with grid md:grid-cols-2 gap-12 items-center.
    Text on left with staggered fade-in animations, image/mockup on right.
    Image should have modern treatment: rounded-3xl, shadow-2xl, slight rotation or float effect.`,
  minimal: `Clean minimal hero with generous py-32 padding.
    Centered text, max-w-3xl mx-auto. Focus on typography.
    Small subheading above main headline (text-sm uppercase tracking-widest text-primary).`,
  gradient: `Hero with animated gradient background (bg-gradient-to-br with multiple color stops).
    Consider mesh gradient effect or aurora-style animation.
    White or light text on dark gradient, or dark text on light gradient.`,
  bento: `Hero integrated with bento grid below it. Hero content in a large card that spans columns.
    Other cards peek in below with services/features preview.
    Modern dashboard/SaaS aesthetic.`,
}

// Feature descriptions
const featureDescriptions = {
  'cta-sticky': 'Sticky CTA: Fixed bottom-6 right-6 button with shadow-lg, appears on scroll. Use fixed z-50 with smooth opacity transition.',
  'back-to-top': 'Back to top: Fixed bottom-6 right-6 circular button (w-12 h-12 rounded-full). Show/hide based on scroll position with transition-opacity.',
  'social-float': 'Floating social icons: fixed left-4 top-1/2 -translate-y-1/2, vertical stack with gap-3. Subtle bg with hover:scale-110 effects.',
  'newsletter': 'Newsletter section: Clean card with gradient or accent background. Email input + submit button inline (flex), modern validation styling.',
  'map': 'Map embed: Placeholder div with bg-gray-200 rounded-2xl aspect-video. Add subtle border and "Map loading..." centered text.',
  'chat-widget': 'Chat widget: Fixed bottom-6 right-6 circular button (w-14 h-14 bg-primary). Message icon, shadow-xl shadow-primary/30. Pulse animation optional.',
  'dark-sections': 'Dark sections: Alternate between light (bg-white) and dark (bg-gray-950 text-white) sections for visual interest.',
  'testimonial-carousel': 'Testimonial carousel: CSS-only horizontal scroll with snap-x snap-mandatory. Cards with snap-center.',
}

const designStyleDescriptions = {
  minimal: `MINIMAL & REFINED DESIGN (Apple/Linear inspired):
- Generous whitespace: py-24 md:py-32 between sections
- Subtle color palette: gray-50 backgrounds, gray-900 text, primary as accent only
- Typography-driven: Large headings (text-4xl md:text-6xl), tight tracking (tracking-tight)
- Micro-interactions: hover:opacity-80 transitions, subtle scale effects
- Cards: bg-white border border-gray-100 rounded-2xl (no heavy shadows)
- Buttons: Clean with border, hover:bg-gray-50 or filled primary with hover:opacity-90
- No decorative elements, let content breathe
- Consider subtle grid or dot pattern at 3% opacity as section backgrounds`,

  modern: `MODERN PROFESSIONAL DESIGN (Stripe/Vercel inspired):
- Clean with purposeful depth: shadow-sm on cards, shadow-xl on featured elements
- Bento grid layouts: Use CSS grid with varied card sizes (col-span-2, row-span-2)
- Gradient accents: bg-gradient-to-r for buttons, text gradients for headlines
- Glass effects on nav: bg-white/80 backdrop-blur-xl
- Cards: rounded-2xl or rounded-3xl, p-6 md:p-8, hover:shadow-lg transition-all
- Color strategy: Neutral base (gray-50/white), primary for CTAs, accent for highlights
- Subtle borders: border border-gray-200/50
- Modern buttons: rounded-full px-6 py-3, or rounded-xl with icon`,

  bold: `BOLD & EXPRESSIVE DESIGN (Framer/Webflow inspired):
- Strong visual presence: Oversized typography (text-6xl md:text-8xl)
- Creative layouts: Asymmetric grids, overlapping elements, negative margins
- Rich color use: Gradients (bg-gradient-to-br), colored shadows (shadow-primary/20)
- Animated elements: Floating shapes, parallax hints, staggered reveals
- Cards: Gradient borders, glass effects, bold hover states (scale-105)
- Experimental: Rotated elements (-rotate-3), unusual spacing, mixed media
- Dark sections: bg-gray-950 with light text for contrast
- Cursor effects and micro-animations where possible`,

  playful: `PLAYFUL & FRIENDLY DESIGN (Notion/Slack inspired):
- Rounded everything: rounded-3xl cards, rounded-full buttons and avatars
- Warm colors: Mix primary with soft pastels, yellow/orange accents
- Illustrations welcome: Consider decorative SVG shapes, blobs, squiggles
- Generous padding: Cards with p-8, sections with py-20
- Shadows: Soft and diffused (shadow-xl shadow-gray-200/50)
- Hover effects: Bounce or wiggle animations, color shifts
- Emojis as icons where appropriate (service cards, features)
- Light, approachable feel overall`,

  luxury: `LUXURY & PREMIUM DESIGN (High-end brand inspired):
- Dark mode default or dark sections: bg-gray-950, bg-black
- Refined typography: Serif headings (font-serif), generous letter-spacing
- Subtle gold/warm accents: amber-400, yellow-500 as accent
- Minimal UI: Lots of space, few elements, maximum impact
- Photography-forward: Large images, aspect-[4/3] or aspect-[16/9], object-cover
- Subtle animations: Slow fades (duration-700), elegant reveals
- Border accents: border-t border-white/10 dividers
- Premium buttons: border border-white/20 text-white hover:bg-white/10`,
}

// Build animation instructions from granular settings
function buildAnimationInstructions(animations = {}) {
  const lines = []

  if (animations.scrollReveal) {
    lines.push(`SCROLL REVEAL: Add fade-up animations using Intersection Observer:
  <script>
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate-in');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  });
  </script>
  CSS: .fade-up { opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
       .fade-up.animate-in { opacity: 1; transform: translateY(0); }
  Apply class="fade-up" to section content containers.`)
  }

  if (animations.hoverCards) {
    lines.push(`CARD HOVER: Cards should have hover:-translate-y-1 hover:shadow-lg transition-all duration-300`)
  }

  if (animations.hoverButtons) {
    lines.push(`BUTTON HOVER: Buttons should have hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`)
  }

  if (animations.heroAnimations) {
    lines.push(`ANIMATED HERO: Add animated elements to hero:
  - Floating shapes with @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  - Or animated gradient: background-size: 200% 200%; animation: gradient 8s ease infinite;`)
  }

  if (animations.floatingElements) {
    lines.push(`FLOATING ELEMENTS: Add decorative floating shapes:
  - Position: absolute with -z-10
  - Use blur-3xl for soft glows
  - Apply float animation: animation: float 6s ease-in-out infinite;`)
  }

  if (lines.length === 0) {
    lines.push(`MINIMAL ANIMATIONS: Use simple transition-colors duration-200 for hover states only.`)
  }

  return lines.join('\n\n')
}

// Build visual effects instructions from granular settings
function buildEffectsInstructions(effects = {}) {
  const lines = []

  if (effects.roundedCorners) {
    lines.push(`ROUNDED CORNERS: Use generous rounding.
    - Cards: rounded-2xl or rounded-3xl
    - Buttons: rounded-xl or rounded-full
    - Images: rounded-2xl
    - Inputs: rounded-xl`)
  } else {
    lines.push(`CORNERS: Sharp or minimal. rounded-md max.`)
  }

  if (effects.shadows) {
    lines.push(`SHADOWS: Use modern layered shadows.
    - Cards: shadow-lg, hover:shadow-xl
    - Featured elements: shadow-xl
    - Colored shadows for CTAs: shadow-primary/25`)
  } else {
    lines.push(`SHADOWS: No shadows. Use borders for definition.`)
  }

  if (effects.gradients) {
    lines.push(`GRADIENTS: Use gradients throughout.
    - Buttons: bg-gradient-to-r from-primary to-accent
    - Text: bg-gradient-to-r bg-clip-text text-transparent
    - Backgrounds: bg-gradient-to-br`)
  }

  if (effects.glassBlur) {
    lines.push(`GLASS BLUR: Use glassmorphism on navigation.
    - Nav: bg-white/80 backdrop-blur-xl border border-white/20
    - Can also apply to hero overlays or cards`)
  }

  if (effects.decorativeBorders) {
    lines.push(`ACCENT BORDERS: Add decorative borders.
    - Card accents: border-l-4 border-primary
    - Section dividers: border-t border-gray-100
    - Gradient borders on featured elements`)
  }

  return lines.join('\n\n')
}

export function buildPrompt(submission) {
  const d = submission
  const lines = []

  // Get user preferences with defaults
  const designStyle = d.design_style || 'modern'
  const animations = d.animations || { scrollReveal: true, hoverCards: true, hoverButtons: true }
  const effects = d.effects || { roundedCorners: true, shadows: true }
  const sections = d.sections || ['hero', 'services', 'about', 'contact']
  const sectionContent = d.section_content || {}
  const headerStyle = d.header_style || 'standard'
  const heroStyle = d.hero_style || 'split'
  const features = d.include_features || []

  // Handle font selection - 'auto' means pick based on design style
  let fontPairing
  if (d.font_pairing === 'auto' || !d.font_pairing) {
    // Pick font based on design style
    const autoFontMap = {
      minimal: fontPairings.modern,
      modern: fontPairings.geometric,
      bold: fontPairings.technical,
      playful: fontPairings.friendly,
      luxury: fontPairings.luxury,
    }
    fontPairing = autoFontMap[designStyle] || fontPairings.modern
  } else {
    fontPairing = fontPairings[d.font_pairing] || fontPairings.modern
  }

  lines.push(`You are an expert web developer who creates stunning, modern websites. Build a beautiful, production-ready website using Tailwind CSS.

CRITICAL: Output ONLY raw HTML code. No markdown, no explanations, no commentary. Start with <!DOCTYPE html> and end with </html>.

## TECH STACK
- Tailwind CSS via CDN (include this in <head>):
  <script src="https://cdn.tailwindcss.com"></script>
- Configure Tailwind with custom colors in a <script> tag:
  <script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '${d.color_primary || '#6366f1'}',
          accent: '${d.color_accent || '#f59e0b'}',
        },
        ${fontPairing.tailwind}
      }
    }
  }
  </script>
- Google Fonts: ${fontPairing.link}
${fontPairing.note ? `- ${fontPairing.note}` : ''}
`)

  lines.push(`## BUSINESS INFO`)
  if (d.biz_name) lines.push(`- Name: ${d.biz_name}`)
  if (d.biz_desc) lines.push(`- Description: ${d.biz_desc}`)
  if (d.biz_location) lines.push(`- Location: ${d.biz_location}`)

  lines.push(`\n## GOAL`)
  if (d.site_goal) lines.push(`- ${d.site_goal}`)
  lines.push(`Make the call-to-action prominent and clear.`)

  lines.push(`\n## CONTACT INFO`)
  if (d.phone) lines.push(`Phone: ${d.phone}`)
  if (d.email) lines.push(`Email: ${d.email}`)
  if (d.address) lines.push(`Address: ${d.address}`)
  if (d.facebook) lines.push(`Facebook: ${d.facebook}`)
  if (d.instagram) lines.push(`Instagram: ${d.instagram}`)
  if (d.other_social) lines.push(`Other: ${d.other_social}`)

  if (d.logo_url) {
    lines.push(`Logo URL: ${d.logo_url}`)
  } else {
    lines.push(`No logo - use styled text logo with business name.`)
  }

  if (d.photo_urls?.length > 0) {
    const photoAssignments = d.photo_assignments || {}

    // Group photos by section
    const photosBySection = {}
    const unassignedPhotos = []

    d.photo_urls.forEach((url, i) => {
      const section = photoAssignments[i]
      if (section) {
        if (!photosBySection[section]) {
          photosBySection[section] = []
        }
        photosBySection[section].push({ url, index: i + 1 })
      } else {
        unassignedPhotos.push({ url, index: i + 1 })
      }
    })

    lines.push(`\nPhotos provided:`)

    // List photos by section assignment
    Object.entries(photosBySection).forEach(([section, photos]) => {
      lines.push(`\n  FOR ${section.toUpperCase()} SECTION:`)
      photos.forEach(p => lines.push(`    - ${p.url}`))
    })

    if (unassignedPhotos.length > 0) {
      lines.push(`\n  UNASSIGNED (use where appropriate):`)
      unassignedPhotos.forEach(p => lines.push(`    - ${p.url}`))
    }

    lines.push(`\nIMPORTANT: Use the photos EXACTLY as assigned above. Photos marked for a specific section MUST appear in that section.`)
  }

  lines.push(`\n## COLORS`)
  lines.push(`Primary: ${d.color_primary || '#6366f1'} (use 'bg-primary', 'text-primary', etc.)`)
  lines.push(`Accent: ${d.color_accent || '#f59e0b'} (use 'bg-accent', 'text-accent', etc.)`)
  lines.push(`Background: ${d.color_bg || '#ffffff'} (main page background)`)
  lines.push(`Use Tailwind's built-in gray scale for text and neutral elements.`)

  lines.push(`\n## TYPOGRAPHY`)
  if (d.font_pairing === 'custom' && d.custom_font) {
    const customFont = d.custom_font.trim()
    if (customFont.startsWith('http')) {
      lines.push(`Google Fonts link: ${customFont}`)
      lines.push(`Use the fonts from the provided Google Fonts URL.`)
    } else {
      lines.push(`Font: ${customFont}`)
      lines.push(`Google Fonts link: https://fonts.googleapis.com/css2?family=${encodeURIComponent(customFont.replace(/\s+/g, '+'))}:wght@300;400;500;600;700;800&display=swap`)
    }
  } else {
    lines.push(`Font: ${fontPairing.fonts}`)
    lines.push(`Google Fonts link: ${fontPairing.link}`)
    if (fontPairing.note) lines.push(`Note: ${fontPairing.note}`)
  }
  lines.push(`
Typography scale (use these):
- Hero headline: text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight
- Section titles: text-3xl md:text-4xl font-bold
- Subheadings: text-xl md:text-2xl font-semibold
- Body: text-base md:text-lg text-gray-600
- Small/labels: text-sm text-gray-500`)

  lines.push(`\n## SECTIONS TO INCLUDE (in this order)`)
  sections.forEach(section => {
    const desc = sectionDescriptions[section] || ''
    const content = sectionContent[section]
    lines.push(`\n### ${section.toUpperCase()}`)
    if (desc) lines.push(`Style: ${desc}`)
    if (content) {
      lines.push(`Content: ${content}`)
    } else {
      lines.push(`Content: Generate appropriate placeholder content based on the business description.`)
    }
  })

  // Add custom sections
  const customSections = d.custom_sections || []
  if (customSections.length > 0) {
    customSections.forEach(section => {
      if (section.name) {
        const content = sectionContent[section.name]
        lines.push(`\n### ${section.name.toUpperCase()} (Custom Section)`)
        lines.push(`Description: ${section.description || 'Create an appropriate section'}`)
        if (content) {
          lines.push(`Content: ${content}`)
        }
      }
    })
  }

  lines.push(`\n## HEADER STYLE`)
  if (headerStyle === 'custom' && d.custom_header_style) {
    lines.push(`Custom header style: ${d.custom_header_style}`)
  } else {
    lines.push(headerStyles[headerStyle] || headerStyles.standard)
  }

  lines.push(`\n## HERO STYLE`)
  if (heroStyle === 'custom' && d.custom_hero_style) {
    lines.push(`Custom hero style: ${d.custom_hero_style}`)
  } else {
    lines.push(heroStyles[heroStyle] || heroStyles.fullscreen)
  }

  if (features.length > 0) {
    lines.push(`\n## ADDITIONAL FEATURES`)
    features.forEach(feature => {
      if (featureDescriptions[feature]) {
        lines.push(`- ${featureDescriptions[feature]}`)
      }
    })
  }

  // Add custom features
  const customFeatures = d.custom_features || []
  if (customFeatures.length > 0) {
    if (features.length === 0) {
      lines.push(`\n## ADDITIONAL FEATURES`)
    }
    customFeatures.forEach(feature => {
      if (feature) {
        lines.push(`- Custom: ${feature}`)
      }
    })
  }

  lines.push(`\n## DESIGN STYLE`)
  lines.push(designStyleDescriptions[designStyle] || designStyleDescriptions.modern)

  lines.push(`\n## ANIMATIONS`)
  lines.push(buildAnimationInstructions(animations))

  lines.push(`\n## VISUAL EFFECTS`)
  lines.push(buildEffectsInstructions(effects))

  lines.push(`\n## ICONS`)
  lines.push(`Use Lucide-style inline SVG icons (clean, 24x24, stroke-based). Examples:`)
  lines.push(`- Arrow: <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`)
  lines.push(`- Check: <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`)
  lines.push(`- Create clean, simple SVGs for service icons. Use currentColor for stroke/fill.`)
  lines.push(`- NEVER use emojis.`)

  lines.push(`\n## LAYOUT PATTERNS`)
  lines.push(`Use modern layout patterns:
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Section spacing: py-20 md:py-32
- Grid layouts: grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8
- Bento grids: Use col-span-2, row-span-2 for varied card sizes
- Cards: p-6 md:p-8 rounded-2xl or rounded-3xl
- Flex gaps: flex items-center gap-4`)

  lines.push(`\n## TECHNICAL REQUIREMENTS`)
  lines.push(`- Single HTML file with Tailwind CDN
- Mobile-first responsive design
- Hamburger menu for mobile (hidden md:flex for nav, md:hidden for hamburger)
- Smooth scroll: Add scroll-smooth to <html>
- Semantic HTML5 with proper heading hierarchy (one h1, then h2s, h3s)
- Intersection Observer for scroll animations if animation level is moderate or dynamic
- All images: rounded corners, object-cover, proper aspect ratios
- Form inputs: Modern styling with focus:ring-2 focus:ring-primary focus:border-transparent
- Buttons: Consistent padding (px-6 py-3), font-medium, transition-all`)

  if (d.extra_notes) lines.push(`\n## EXTRA REQUESTS\n${d.extra_notes}`)

  lines.push(`\n---
OUTPUT ONLY THE HTML CODE. Start with <!DOCTYPE html>.`)

  return lines.join('\n')
}

export function buildRevisionPrompt(currentCode, changeRequest) {
  return `You are an expert web developer. Apply these changes to the website while maintaining its modern Tailwind-based design:

"${changeRequest}"

Current code:
${currentCode}

RULES:
- Output ONLY the complete updated HTML file
- No markdown, no explanations
- Start with <!DOCTYPE html>, end with </html>
- Keep using Tailwind CSS classes (the CDN is already included)
- Maintain the existing design quality and consistency
- NEVER use emojis - use inline SVG icons
- Preserve scroll animations and interactive elements
- Ensure responsive design is maintained (mobile hamburger, responsive grids)`
}
