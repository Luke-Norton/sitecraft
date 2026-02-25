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

  // Remove ```html at start and ``` at end if present
  if (cleanedContent.startsWith('```html')) {
    cleanedContent = cleanedContent.slice(7)
  } else if (cleanedContent.startsWith('```')) {
    cleanedContent = cleanedContent.slice(3)
  }

  if (cleanedContent.endsWith('```')) {
    cleanedContent = cleanedContent.slice(0, -3)
  }

  cleanedContent = cleanedContent.trim()

  return cleanedContent
}
