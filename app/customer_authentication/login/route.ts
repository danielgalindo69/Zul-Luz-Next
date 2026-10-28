// Former Shopify account links have no equivalent account service here.
// Return a real 404 so crawlers do not index a streamed "not found" page.
export function GET() {
  return new Response(null, { status: 404 })
}

export const HEAD = GET
