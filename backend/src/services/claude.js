import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function streamGeneration(prompt, onChunk) {
  let fullContent = ''

  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 64000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      const text = event.delta.text
      fullContent += text
      onChunk(text)
    }
  }

  // Clean up the response - remove markdown code fences if present
  let cleanedContent = fullContent.trim()

  // Remove various markdown code block markers
  // Handle ```html, ```json, or just ```
  const codeBlockStartRegex = /^```(?:html|json)?\s*\n?/i
  const codeBlockEndRegex = /\n?```\s*$/

  if (codeBlockStartRegex.test(cleanedContent)) {
    cleanedContent = cleanedContent.replace(codeBlockStartRegex, '')
  }

  if (codeBlockEndRegex.test(cleanedContent)) {
    cleanedContent = cleanedContent.replace(codeBlockEndRegex, '')
  }

  cleanedContent = cleanedContent.trim()

  console.log('Claude response cleaned. Length:', cleanedContent.length)
  console.log('First 100 chars:', cleanedContent.substring(0, 100))
  console.log('Last 100 chars:', cleanedContent.substring(cleanedContent.length - 100))

  return cleanedContent
}
