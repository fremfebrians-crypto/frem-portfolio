export default function FloatingWhatsapp({ phone }: { phone: string }) {
  const normalized = phone.replace(/\D/g, '');
  return (
    <a className="floating-wa" href={`https://wa.me/62${normalized.replace(/^0/, '')}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <span>WA</span>
    </a>
  );
}
