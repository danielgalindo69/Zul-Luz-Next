import { absoluteUrl } from '@/lib/site'

const destinations: Record<string, string> = {
  'shipping-policy': '/shipping-policy',
  'refund-policy': '/return-policy',
  'privacy-policy': '/privacy-policy',
  'terms-of-service': '/terms-and-conditions',
}

type Context = { params: Promise<{ handle: string }> }

export async function GET(_request: Request, { params }: Context) {
  const { handle } = await params
  const destination = destinations[handle]

  if (!destination) return new Response(null, { status: 404 })

  return Response.redirect(absoluteUrl(destination), 308)
}

export const HEAD = GET
