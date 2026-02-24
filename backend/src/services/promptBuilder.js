const structureMap = {
  simple: 'a single-page website with sections for: hero/intro, services summary, about, and contact',
  standard: 'a multi-page website with the following pages: Home, Services, About, and Contact',
  full: 'a full multi-page website with: Home, Services, About, Contact, a photo gallery, and any other sections that fit the content',
}

export function buildPrompt(submission) {
  const d = submission
  const lines = []

  lines.push(`You are a professional web developer. Build a complete, production-ready static website based on the following client brief. Output ONLY the complete HTML file with embedded CSS and minimal vanilla JavaScript. The site must be fully mobile responsive, visually polished, and ready to deploy.

IMPORTANT: Output ONLY the raw HTML code. Do not include any markdown code fences, explanations, or commentary. Start directly with <!DOCTYPE html> and end with </html>.
`)

  lines.push(`## BUSINESS OVERVIEW`)
  if (d.biz_name) lines.push(`- Business name: ${d.biz_name}`)
  if (d.biz_desc) lines.push(`- What they do: ${d.biz_desc}`)
  if (d.biz_location) lines.push(`- Location: ${d.biz_location}`)

  lines.push(`\n## PRIMARY GOAL`)
  if (d.site_goal) lines.push(`- ${d.site_goal}`)
  lines.push(`Make sure the call-to-action reflecting this goal is prominent and clear on every page.`)

  lines.push(`\n## CONTENT TO INCLUDE`)
  if (d.biz_about) lines.push(`About section: "${d.biz_about}"`)
  if (d.services && d.services.length > 0) {
    lines.push(`Services/products: ${d.services.join(', ')}`)
  }
  if (d.phone) lines.push(`Phone: ${d.phone}`)
  if (d.email) lines.push(`Email: ${d.email}`)
  if (d.address) lines.push(`Address: ${d.address}`)
  if (d.facebook) lines.push(`Facebook: ${d.facebook}`)
  if (d.instagram) lines.push(`Instagram: ${d.instagram}`)
  if (d.other_social) lines.push(`Other link: ${d.other_social}`)

  if (d.logo_url) {
    lines.push(`Logo: Use this image URL for the logo: ${d.logo_url}`)
  } else {
    lines.push(`No logo provided — use the business name as a styled text logo in the header.`)
  }

  if (d.photo_urls && d.photo_urls.length > 0) {
    lines.push(`Photos: Client has provided ${d.photo_urls.length} photo(s). Use these image URLs:`)
    d.photo_urls.forEach((url, i) => {
      lines.push(`  - Photo ${i + 1}: ${url}`)
    })
  }

  lines.push(`\n## DESIGN STYLE`)
  if (d.style_keywords) lines.push(`Desired look and feel: ${d.style_keywords}`)
  lines.push(`Color palette:`)
  lines.push(`  - Primary color: ${d.color_primary} (use for buttons, headings, nav, key UI elements)`)
  lines.push(`  - Accent color: ${d.color_accent} (use for highlights, hover states, badges, secondary elements)`)
  lines.push(`  - Background color: ${d.color_bg} (main page background)`)
  if (d.inspo_1) lines.push(`Style inspiration website 1: ${d.inspo_1}`)
  if (d.inspo_2) lines.push(`Style inspiration website 2: ${d.inspo_2}`)
  lines.push(`Match the visual tone to the keywords provided. Prioritize readability, trust, and professionalism.`)

  lines.push(`\n## SITE STRUCTURE`)
  lines.push(`Build ${structureMap[d.structure] || structureMap.standard}.`)
  if (d.extra_notes) lines.push(`Additional requests: ${d.extra_notes}`)

  lines.push(`\n## TECHNICAL REQUIREMENTS`)
  lines.push(`- Fully mobile responsive (works perfectly on phone, tablet, desktop)`)
  lines.push(`- Include proper HTML meta tags: title, description, viewport, Open Graph`)
  lines.push(`- SEO optimized: semantic HTML, proper heading hierarchy, descriptive alt tags`)
  lines.push(`- Fast loading: no external dependencies, inline all CSS`)
  lines.push(`- If a contact form is needed, build it with HTML and use a mailto: action or note that a backend service is needed`)
  lines.push(`- Clean, well-commented code`)
  lines.push(`- Modern design with smooth transitions and hover effects`)
  lines.push(`- Include a sticky/fixed navigation header`)
  lines.push(`- Add a professional footer with contact info and copyright`)
  lines.push(`\nDeliver the complete index.html file with all CSS and JavaScript inline. Output ONLY the HTML code, nothing else.`)

  return lines.join('\n')
}

export function buildRevisionPrompt(currentCode, changeRequest) {
  return `You are a professional web developer. You have previously built a website for a client. The client has requested the following changes:

"${changeRequest}"

Here is the current website code:

${currentCode}

Apply the requested changes while maintaining the overall design, structure, and functionality of the site. Make sure to preserve all existing features unless they conflict with the requested changes.

IMPORTANT: Output ONLY the complete updated HTML file. Do not include any markdown code fences, explanations, or commentary. Start directly with <!DOCTYPE html> and end with </html>.`
}
