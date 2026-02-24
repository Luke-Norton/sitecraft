const API_URL = import.meta.env.VITE_API_URL || ''

export async function submitForm(formData) {
  const response = await fetch(`${API_URL}/api/submit`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to submit form')
  }

  return response.json()
}

export function streamBuild(submissionId, onChunk, onComplete, onError) {
  const eventSource = new EventSource(`${API_URL}/api/build/${submissionId}`)

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)

    if (data.type === 'chunk') {
      onChunk(data.content)
    } else if (data.type === 'complete') {
      onComplete(data.content)
      eventSource.close()
    } else if (data.type === 'error') {
      onError(new Error(data.message))
      eventSource.close()
    }
  }

  eventSource.onerror = (error) => {
    onError(error)
    eventSource.close()
  }

  return () => eventSource.close()
}

export function streamRevision(currentCode, changeRequest, onChunk, onComplete, onError) {
  const eventSource = new EventSource(
    `${API_URL}/api/revise?code=${encodeURIComponent(currentCode)}&changes=${encodeURIComponent(changeRequest)}`
  )

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)

    if (data.type === 'chunk') {
      onChunk(data.content)
    } else if (data.type === 'complete') {
      onComplete(data.content)
      eventSource.close()
    } else if (data.type === 'error') {
      onError(new Error(data.message))
      eventSource.close()
    }
  }

  eventSource.onerror = (error) => {
    onError(error)
    eventSource.close()
  }

  return () => eventSource.close()
}

export async function reviseWithPost(currentCode, changeRequest, onChunk, onComplete, onError) {
  try {
    const response = await fetch(`${API_URL}/api/revise`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: currentCode, changes: changeRequest }),
    })

    if (!response.ok) {
      throw new Error('Failed to start revision')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullContent = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6))
            if (data.type === 'chunk') {
              fullContent += data.content
              onChunk(data.content)
            } else if (data.type === 'complete') {
              onComplete(data.content)
              return
            } else if (data.type === 'error') {
              onError(new Error(data.message))
              return
            }
          } catch (e) {
            // Skip non-JSON lines
          }
        }
      }
    }
  } catch (error) {
    onError(error)
  }
}

export async function deployToVercel(html) {
  const response = await fetch(`${API_URL}/api/deploy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ html }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to deploy')
  }

  return response.json()
}
