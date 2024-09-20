import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
     
      async authorize(credentials) {
        const { email, password } = credentials;
        
        const res = await fetch(`http://localhost:5000/user?email=${email}`);
        const currentUser = await res.json();
        
        if (!currentUser) {
          return null; 
        }
      
        const passwordMatch = bcrypt.compareSync(password, currentUser.password);
        if (!passwordMatch) {
          return null;
        }
        return currentUser;
      }
      
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
  ],

  callbacks: {
    // 
  
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
