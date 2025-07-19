// Avatar service to generate random profile images
export class AvatarService {
  private static avatarStyles = [
    "adventurer",
    "adventurer-neutral",
    "avataaars",
    "big-ears",
    "big-ears-neutral",
    "big-smile",
    "bottts",
    "croodles",
    "croodles-neutral",
    "fun-emoji",
    "icons",
    "identicon",
    "initials",
    "lorelei",
    "lorelei-neutral",
    "micah",
    "miniavs",
    "open-peeps",
    "personas",
    "pixel-art",
    "pixel-art-neutral",
    "shapes",
    "thumbs",
  ]

  private static getRandomStyle(): string {
    return this.avatarStyles[Math.floor(Math.random() * this.avatarStyles.length)]
  }

  private static getRandomSeed(): string {
    return Math.random().toString(36).substring(2, 15)
  }

  static generateAvatar(name: string, size = 150): string {
    // Use name as seed for consistency
    const seed = name.toLowerCase().replace(/\s+/g, "")
    const style = this.getRandomStyle()
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&size=${size}`
  }

  static generateRandomAvatar(size = 150): string {
    const seed = this.getRandomSeed()
    const style = this.getRandomStyle()
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&size=${size}`
  }

  // Fallback avatars for different categories
  static getTechnicianAvatar(name: string, size = 150): string {
    const seed = name.toLowerCase().replace(/\s+/g, "")
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&size=${size}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
  }

  static getClientAvatar(name: string, size = 150): string {
    const seed = name.toLowerCase().replace(/\s+/g, "")
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&size=${size}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
  }
}
