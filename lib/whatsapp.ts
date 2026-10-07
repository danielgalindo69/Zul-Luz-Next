const WHATSAPP_PHONE_NUMBER = '13105941768'

const DEFAULT_WHATSAPP_MESSAGE = 'Hi Zul Luz, I’d like help with a product or my order.'

export function createWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`
}

export function createProductWhatsAppUrl(productName: string) {
  return createWhatsAppUrl(`Hi Zul Luz, I need help with ${productName}.`)
}
