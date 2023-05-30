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
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
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
            console.log(user)
            switch (user.roleID) {
                case 1:
                    return "/admin/manage-career-center-staff"
                case 2:
                    return "/student/internship-applications"
                case 3:
                    return "/instructor/completed-internship-applications"
                case 4:
                    return "/career-center/completed-internship-applications"
                case 5:
                    return false         
                default:
                    break;
            }
        },
        async redirect() {
            return "/"
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