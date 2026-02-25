const VERCEL_API_URL = 'https://api.vercel.com'

export async function deployToVercel(html, projectName) {
  const token = process.env.VERCEL_API_TOKEN
  const teamId = process.env.VERCEL_TEAM_ID

  if (!token) {
    throw new Error('VERCEL_API_TOKEN is not configured')
  }

  // Generate a unique project name if not provided
  const name = projectName || `bespoke-${Date.now()}`

  // Create the deployment files
  const files = [
    {
      file: 'index.html',
      data: Buffer.from(html).toString('base64'),
      encoding: 'base64',
    },
  ]

  // Create deployment
  const deploymentUrl = teamId
    ? `${VERCEL_API_URL}/v13/deployments?teamId=${teamId}`
    : `${VERCEL_API_URL}/v13/deployments`

  const response = await fetch(deploymentUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      files,
      projectSettings: {
        framework: null,
      },
      target: 'production',
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error('Vercel deployment error:', error)
    throw new Error(error.error?.message || 'Failed to deploy to Vercel')
  }

  const deployment = await response.json()

  // Return the deployment URL
  const deployedUrl = deployment.alias?.[0]
    ? `https://${deployment.alias[0]}`
    : `https://${deployment.url}`

  return {
    url: deployedUrl,
    deploymentId: deployment.id,
  }
}

export async function submitToGoogleIndexing(url) {
  // This is a placeholder for Google Indexing API integration
  // In production, you would use the Google Indexing API to submit the URL
  // For now, we'll just log it
  console.log(`Site deployed at ${url} - would submit to Google Indexing API`)

  // The actual implementation would use:
  // POST https://indexing.googleapis.com/v3/urlNotifications:publish
  // with the URL and type: "URL_UPDATED"

  return true
}
