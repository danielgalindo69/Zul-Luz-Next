import { createWhatsAppUrl } from '@/lib/whatsapp'

export function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path
        d="M16 3.2a12.65 12.65 0 0 0-10.85 19.15L3.5 28.8l6.62-1.7A12.68 12.68 0 1 0 16 3.2Z"
        fill="currentColor"
      />
      <path
        d="M22.73 19.55c-.29.82-1.44 1.5-2.36 1.7-.63.13-1.45.23-4.23-.92-3.56-1.48-5.86-5.1-6.04-5.34-.17-.24-1.43-1.9-1.43-3.62 0-1.72.9-2.57 1.22-2.92.29-.31.76-.45 1.2-.45.14 0 .27 0 .39.01.32.01.48.03.69.53.27.65.94 2.28 1.02 2.44.09.16.17.38.06.61-.1.24-.19.35-.35.54-.16.18-.32.32-.48.51-.15.17-.32.35-.13.68.19.33.84 1.39 1.8 2.25 1.24 1.11 2.29 1.46 2.61 1.62.32.16.51.13.7-.08.2-.22.84-.98 1.06-1.32.22-.33.45-.27.76-.16.32.11 2.01.95 2.35 1.12.34.17.57.25.65.39.09.14.09.82-.2 1.64Z"
        fill="#155B5E"
      />
    </svg>
  )
}

export function WhatsAppFloatingButton() {
  return (
    <a
      href={createWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Zul Luz on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(20,62,64,0.25)] transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="h-8 w-8" />
      <span className="pointer-events-none absolute right-[calc(100%+0.7rem)] hidden whitespace-nowrap rounded-md bg-dark px-3 py-2 text-[10px] font-medium tracking-[0.12em] text-cream shadow-lg group-hover:block group-focus-visible:block sm:group-hover:block">
        Chat with us
      </span>
    </a>
  )
}
