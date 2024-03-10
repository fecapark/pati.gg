import TailwindScrollbarPlugin from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#2d7ceb',
        'accent-green': '#0f9d58',
        'accent-red': '#ef867b',
        'discord-primary': '#5865f2',
        'skeleton-primary': '#323236',
        'separator-primary': '#424548',
      },
    },
  },
  plugins: [TailwindScrollbarPlugin({ nocompatible: true })],
}
export default config
