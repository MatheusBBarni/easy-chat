export default function generateUsername(uuid: string) {
  return uuid.split('-').map((part) => `${part.slice(0, 2)}`).join('')
}