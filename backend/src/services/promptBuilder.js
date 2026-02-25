// Section descriptions for the prompt
const sectionDescriptions = {
  hero: 'Hero section with headline, subheadline, and primary CTA button',
  services: 'Services/Products section showcasing what you offer with icons and descriptions',
  about: 'About section telling your story and building trust',
  gallery: 'Gallery/Portfolio section displaying images in a grid',
  testimonials: 'Testimonials section with customer quotes and names',
  team: 'Team section introducing key people with photos and roles',
  pricing: 'Pricing section with plans/packages in cards',
  faq: 'FAQ section with expandable questions and answers',
  contact: 'Contact section with form, contact info, and/or map',
}

// Font pairing definitions
const fontPairings = {
  modern: {
    name: 'Modern',
    fonts: 'Inter',
    link: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    css: "font-family: 'Inter', sans-serif;",
  },
  classic: {
    name: 'Classic',
    fonts: 'Playfair Display + Lato',
    link: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap',
    css: "font-family: 'Lato', sans-serif; /* Headings: 'Playfair Display', serif */",
  },
  bold: {
    name: 'Bold',
    fonts: 'Oswald + Open Sans',
    link: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@300;400;600&display=swap',
    css: "font-family: 'Open Sans', sans-serif; /* Headings: 'Oswald', sans-serif */",
  },
  friendly: {
    name: 'Friendly',
    fonts: 'Nunito',
    link: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap',
    css: "font-family: 'Nunito', sans-serif;",
  },
  professional: {
    name: 'Professional',
    fonts: 'Montserrat + Open Sans',
    link: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;600&display=swap',
    css: "font-family: 'Open Sans', sans-serif; /* Headings: 'Montserrat', sans-serif */",
  },
  elegant: {
    name: 'Elegant',
    fonts: 'Cormorant Garamond + Proza Libre',
    link: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Proza+Libre:wght@400;500;600&display=swap',
    css: "font-family: 'Proza Libre', sans-serif; /* Headings: 'Cormorant Garamond', serif */",
  },
}

// Header style descriptions
const headerStyles = {
  standard: 'Standard header: Logo on the left, navigation links on the right. Clean and professional.',
  centered: 'Centered header: Logo centered at top, navigation links centered below it. Elegant and balanced.',
  minimal: 'Minimal header: Small logo, minimal navigation. Unobtrusive and content-focused.',
}

// Hero style descriptions
const heroStyles = {
  fullscreen: 'Full-screen hero: Takes up 100vh (full viewport height). Bold and impactful first impression.',
  half: 'Half-screen hero: Takes up about 60-70vh. Shows some content below the fold.',
  split: 'Split hero: Two-column layout with text on one side and image/graphic on the other.',
  simple: 'Simple hero: Compact, text-focused hero. Gets to the point quickly.',
}

// Feature descriptions
const featureDescriptions = {
  'cta-sticky': 'Add a sticky/fixed CTA button that stays visible while scrolling (bottom right corner)',
  'back-to-top': 'Add a "back to top" button that appears when scrolling down',
  'social-float': 'Add floating social media icons on the side of the page',
  'newsletter': 'Add a newsletter signup form section',
  'map': 'Add an embedded Google Maps placeholder showing the business location',
  'chat-widget': 'Add a chat widget placeholder in the bottom right corner',
}

const designStyleDescriptions = {
  minimal: `MINIMAL & CLEAN DESIGN:
- Maximum whitespace - let content breathe
- Simple, flat design with subtle depth
- Muted color palette - use primary color sparingly
- Clean lines, no decorative elements
- Typography-focused design
- Simple hover states (color change only)
- No background patterns or decorative shapes
- Thin borders or no borders
- Light, subtle shadows only if needed`,

  modern: `MODERN & PROFESSIONAL DESIGN:
- Balanced whitespace with purposeful layouts
- Clean but engaging visual hierarchy
- Strategic use of primary and accent colors
- Subtle depth through shadows and layering
- Professional hover effects (slight lifts, color transitions)
- Clean card-based layouts for content
- Polished but not over-designed
- Consistent spacing and alignment`,

  bold: `BOLD & CREATIVE DESIGN:
- Strong visual impact and personality
- Confident use of colors
- Larger typography with dramatic size contrasts
- Creative layouts with intentional asymmetry
- Engaging hover effects and interactions
- Layered elements and overlapping sections
- Strong geometric shapes as design elements
- Gradient accents and creative color combinations`,
}

const animationDescriptions = {
  minimal: `MINIMAL ANIMATIONS:
- Simple transitions (0.15s max)
- Basic color changes on hover only
- No animated backgrounds or floating elements
- Smooth scroll only
- transition: color 0.15s ease, background-color 0.15s ease;`,

  moderate: `MODERATE ANIMATIONS:
- Smooth transitions (0.2-0.3s)
- Subtle hover lifts on cards: transform: translateY(-4px)
- Gentle focus states
- Button hover: slight scale (1.02) or shadow enhancement
- transition: all 0.25s ease;`,

  dynamic: `DYNAMIC ANIMATIONS:
- Engaging transitions (0.3-0.4s) with easing curves
- Card hover: lift + shadow + slight scale
- Animated gradient backgrounds using @keyframes
- Floating decorative elements
- Button hover: scale + glow effect
- transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`,
}

function buildVisualEffectsInstructions(effects = []) {
  const instructions = []

  if (effects.includes('shadows')) {
    instructions.push(`SHADOWS: Use layered box-shadows for depth on cards and buttons.`)
  } else {
    instructions.push(`SHADOWS: Minimal to no shadows. Keep design flat.`)
  }

  if (effects.includes('rounded')) {
    instructions.push(`CORNERS: Use rounded corners (12-16px for cards, 8px for buttons, 9999px for pills).`)
  } else {
    instructions.push(`CORNERS: Use sharp corners or minimal rounding (4px max).`)
  }

  if (effects.includes('gradients')) {
    instructions.push(`GRADIENTS: Use gradients for buttons or section backgrounds.`)
  } else {
    instructions.push(`GRADIENTS: No gradients. Use solid colors only.`)
  }

  if (effects.includes('glassmorphism')) {
    instructions.push(`GLASS EFFECTS: Use glassmorphism for nav/cards: background: rgba(255,255,255,0.8); backdrop-filter: blur(10px);`)
  } else {
    instructions.push(`GLASS EFFECTS: No glassmorphism. Use solid backgrounds.`)
  }

  if (effects.includes('patterns')) {
    instructions.push(`PATTERNS: Add subtle CSS background patterns in some sections.`)
  }

  if (effects.includes('animations')) {
    instructions.push(`FLOATING ELEMENTS: Add decorative floating/animated elements using @keyframes.`)
  }

  return instructions.join('\n')
}

export function buildPrompt(submission) {
  const d = submission
  const lines = []

  // Get user preferences with defaults
  const designStyle = d.design_style || 'modern'
  const animationLevel = d.animation_level || 'moderate'
  const visualEffects = d.visual_effects || ['shadows', 'rounded']
  const sections = d.sections || ['hero', 'services', 'about', 'contact']
  const fontPairing = fontPairings[d.font_pairing] || fontPairings.modern
  const headerStyle = d.header_style || 'standard'
  const heroStyle = d.hero_style || 'fullscreen'
  const features = d.include_features || []

  lines.push(`You are a professional web developer. Build a polished, production-ready static website.

CRITICAL: Output ONLY raw HTML code. No markdown, no explanations, no commentary. Start with <!DOCTYPE html> and end with </html>.
`)

  lines.push(`## BUSINESS INFO`)
  if (d.biz_name) lines.push(`- Name: ${d.biz_name}`)
  if (d.biz_desc) lines.push(`- Description: ${d.biz_desc}`)
  if (d.biz_location) lines.push(`- Location: ${d.biz_location}`)

  lines.push(`\n## GOAL`)
  if (d.site_goal) lines.push(`- ${d.site_goal}`)
  lines.push(`Make the call-to-action prominent and clear.`)

  lines.push(`\n## CONTENT`)
  if (d.biz_about) lines.push(`About text: "${d.biz_about}"`)
  if (d.services?.length > 0) lines.push(`Services: ${d.services.join(', ')}`)
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
  lines.push(`--primary: ${d.color_primary || '#1a73e8'}`)
  lines.push(`--accent: ${d.color_accent || '#f4a61d'}`)
  lines.push(`--bg: ${d.color_bg || '#ffffff'}`)
  lines.push(`Use CSS custom properties for consistent theming.`)

  lines.push(`\n## TYPOGRAPHY`)
  if (d.font_pairing === 'custom' && d.custom_font) {
    const customFont = d.custom_font.trim()
    // Check if it's a full URL or just a font name
    if (customFont.startsWith('http')) {
      lines.push(`Google Fonts link: ${customFont}`)
      lines.push(`Use the fonts from the provided Google Fonts URL.`)
    } else {
      lines.push(`Font: ${customFont}`)
      lines.push(`Google Fonts link: https://fonts.googleapis.com/css2?family=${encodeURIComponent(customFont.replace(/\s+/g, '+'))}:wght@300;400;500;600;700&display=swap`)
      lines.push(`CSS: font-family: '${customFont}', sans-serif;`)
    }
  } else {
    lines.push(`Font: ${fontPairing.fonts}`)
    lines.push(`Google Fonts link: ${fontPairing.link}`)
    lines.push(`CSS: ${fontPairing.css}`)
  }

  lines.push(`\n## SECTIONS TO INCLUDE (in this order)`)
  sections.forEach(section => {
    if (sectionDescriptions[section]) {
      lines.push(`- ${section.toUpperCase()}: ${sectionDescriptions[section]}`)
    }
  })

  // Add custom sections
  const customSections = d.custom_sections || []
  if (customSections.length > 0) {
    lines.push(`\n## CUSTOM SECTIONS (also include these)`)
    customSections.forEach(section => {
      if (section.name) {
        lines.push(`- ${section.name.toUpperCase()}: ${section.description || 'Create an appropriate section for this'}`)
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
  if (d.style_keywords) lines.push(`Client's vision: ${d.style_keywords}`)
  if (d.inspo_1) lines.push(`Inspiration 1: ${d.inspo_1}`)
  if (d.inspo_2) lines.push(`Inspiration 2: ${d.inspo_2}`)
  lines.push(designStyleDescriptions[designStyle] || designStyleDescriptions.modern)

  lines.push(`\n## ANIMATIONS`)
  lines.push(animationDescriptions[animationLevel] || animationDescriptions.moderate)

  lines.push(`\n## VISUAL EFFECTS`)
  lines.push(buildVisualEffectsInstructions(visualEffects))

  lines.push(`\n## ICONS`)
  lines.push(`NEVER use emojis. Use inline SVG icons:`)
  lines.push(`- Phone: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`)
  lines.push(`- Email: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`)
  lines.push(`- Location: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`)
  lines.push(`Create simple SVGs for service icons.`)

  lines.push(`\n## TECHNICAL`)
  lines.push(`- Single HTML file, all CSS inline in <style>`)
  lines.push(`- Mobile responsive with hamburger menu`)
  lines.push(`- Navigation: anchor links to section IDs`)
  lines.push(`- html { scroll-behavior: smooth; }`)
  lines.push(`- Semantic HTML5, proper heading hierarchy`)
  lines.push(`- Include ALL provided content`)
  if (d.extra_notes) lines.push(`\nExtra requests: ${d.extra_notes}`)

  lines.push(`\nOutput ONLY the HTML code.`)

  return lines.join('\n')
}

export function buildRevisionPrompt(currentCode, changeRequest) {
  return `You are a professional web developer. Apply these changes to the website:

"${changeRequest}"

Current code:
${currentCode}

RULES:
- Output ONLY the complete updated HTML file
- No markdown, no explanations
- Start with <!DOCTYPE html>, end with </html>
- Keep CSS inline in <style> tag
- NEVER use emojis - only inline SVG icons
- Maintain existing design quality`
}
