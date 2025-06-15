export function formatLetterHeader(user: import('@/types/letter').UserProfile, recipient: import('@/types/letter').Recipient, date: Date = new Date()): string {
  const senderLines = [
    `${user.firstName} ${user.lastName}`.trim(),
    user.address,
    `${user.postalCode} ${user.city}`.trim(),
    user.email,
    user.phone,
  ].filter(Boolean);

  const recipientLines = [
    recipient.company,
    recipient.service,
    recipient.firstName && recipient.lastName ? `${recipient.firstName} ${recipient.lastName}` : null,
    recipient.address,
    `${recipient.postalCode} ${recipient.city}`.trim(),
    recipient.email,
  ].filter(Boolean);

  const locationDate = `${user.city}, le ${date.toLocaleDateString('fr-FR')}`;

  return `${senderLines.join('\n')}\n\n${recipientLines.join('\n')}\n\n${locationDate}\n\n`;
}
