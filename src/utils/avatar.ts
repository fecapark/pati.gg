export const defaultSrc = `https://discord.com/assets/5d6a5e9d7d77ac29116e.png`

export const parseAvatarSource = (src: string | null | undefined) => {
  return src ?? `https://discord.com/assets/5d6a5e9d7d77ac29116e.png`
}
