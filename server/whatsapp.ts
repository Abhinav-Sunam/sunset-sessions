const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '0000000000';

export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildInviteMessage(eventName: string, dateStr: string): string {
  return `Hi, I would like to request an invite to ${eventName} on ${dateStr}.`;
}

export function buildTicketInquiryMessage(eventName: string): string {
  return `Hi, I have a question regarding tickets for ${eventName}.`;
}

export function buildGeneralInquiryMessage(): string {
  return 'Hi Sunset Sessions, I have an inquiry about upcoming sessions.';
}
