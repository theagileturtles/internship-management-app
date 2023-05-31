import NextAuth, {
    User
} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {
    Session
} from "next-auth";
import {
    JWT
} from "next-auth/jwt";
import { signIn } from "next-auth/react";

export const authOptions = {
    site: 'http://localhost:3000',
    secret:process.env.AUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "jsmith"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials, req) {
                const user = await fetch(`http://localhost:3000/api/mockup/login`, {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        })
                    })
                    .then((res) =>{
                        if(res.status === 200){
                        return res.json()
                    }}).then((resjson) => resjson).
                    catch((err)=>console.log(err))

                if (user) {
                    return user
                } else {
                    return null
                }
            },
        })
        // ...add more providers here
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async signIn({user}){
            // switch (user.roleID) {
            //     case 1:
            //         return "/admin/manage-career-center-staff"
            //     case 2:
            //         return "/student/internship-applications"
            //     case 3:
            //         return "/instructor/completed-internship-applications"
            //     case 4:
            //         return "/career-center/completed-internship-applications"
            //     case 5:
            //         return false         
            //     default:
            //         break;
            // }
            return user;
        },
        async jwt({
            token,
            user
        }) {
            if (user) {
                token = {
                    ...user
                };
            }
            return token;
        },
        async session({
            session,
            token,
            user
        }) {
            // Send properties to the client, like an access_token and user id from a provider.
            if (token) {
                session.user = {...token};
            }
            return session;
        },
    },
}

export default NextAuth(authOptions)