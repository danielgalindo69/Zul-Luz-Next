import { absoluteUrl } from '@/lib/site'

const destinations: Record<string, string> = {
  all: '/shop',
  lingerie: '/lingerie',
  sleepwear: '/sleepwear',
  'gift-ideas': '/gift-ideas',
}

type Context = { params: Promise<{ handle: string }> }

export async function GET(_request: Request, { params }: Context) {
  const { handle } = await params
  const destination = destinations[handle]

  if (!destination) return new Response(null, { status: 404 })

  return Response.redirect(absoluteUrl(destination), 308)
}

export const HEAD = GET
