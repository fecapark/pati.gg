import { AuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      checks: ['none'],
      profile(profile) {
        const newProfile = { ...profile }
        newProfile.avatar = profile.avatar
          ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp?size=80`
          : null

        return {
          id: profile.id,
          name: profile.global_name ?? profile.username,
          email: profile.email,
          image: newProfile.avatar,
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      const newToken = { ...token, user, account }

      if (account) {
        newToken.accessToken = account.access_token ?? ''
      }

      return newToken
    },

    async session({ session, token }) {
      const newSession = { ...session }
      newSession.accessToken = token.accessToken
      newSession.user.id = token.sub ?? ''
      return newSession
    },

    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
}

export default authOptions
