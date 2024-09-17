import NextAuth from "next-auth"

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    provider: [],
    callbacks: {},
    pages: {}
});

export { handler as GET, handler as POST } 