import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import { GraphQLClient, gql } from "graphql-request";
import {useSession, signIn, signOut} from "next-auth/react";
import { data } from "autoprefixer";
import clientPromise from './../../../src/connectDB';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import EmailProvider from 'next-auth/providers/email'




const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

export default NextAuth({
    providers: [
      // Credentials({
      //   name: "credentials",
      //   credentials: {
      //     email: {
      //       label: "Email",
      //       type: "email",
      //       placeholder: "jsmith@gmail.com",
      //     },
      //     password: { label: "Password", type: "password" },
      //   },
      //   authorize: async (credentials, request) => {
      //     // login logic goes here
      //     const { email, password } = credentials;
      //     const { user } = await client.request(GetUserByEmail, {
      //       email: credentials.email
      //   });

      //   ///check if user got error

      //     if (!user) {
      //       throw new Error("Email not Found. Please Register!")
      //     }
 
      //    if(user) {
      //     return user
      //    }
      
          

      //   },
      // }),
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
          }
        },
        from: process.env.EMAIL_FROM
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    pages: {
      signIn: "/enroll",
    },
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
      async jwt({ token, user, account, profile, isNewUser }) {
      
        if (user) {
          token.enabled = user.Enabled
          console.debug("IFFFFFFFFFFF***********", user)
          const ua = user.UserAttributes
          // for (let i = 0; i < ua.length; i++) {
          //   const att = ua[i];
          //   token[att.Name] = att.Value
          // }
          console.debug("Token after data transfer: ", token)
          // some custom logic here
        }
        return token
      },
        //get data from google
        signIn: async (token,account) => {
            // console.log(token.user, "token");W

            const { user } = await client.request(GetUserByEmail, {
                          email: token.user.email
                 });

            if (!user) {
                const { newUser } = await client.request(
                CreateNextUserByEmail,
                {
                email : token.user.email,
                password: "adfadfasdfasdfsafd",
                userID : token.user.id,
                plan: "free",
                limit: 100,
                pquota: 100,


                });

                return true;
            }

                return true;
            
        },
    },
    events: {
        signOut: async (token) => {
            //user email
            // const userEmail = token.token.email;

            // console.log(token);
        

            // console.log(userEmail);

            // if (typeof window !== 'undefined') {
            //   // your code 
            //       const getData = JSON.parse(localStorage.getItem("limit"));
            //       console.log(getData)
                
            //   }
        }
      },
    secret: process.env.JWT_SECRET,
})


// {
//     id: '103729701635526816734',
//     name: 'ali farhad',
//     email: 'alifarhad557@gmail.com',
//     image: 'https://lh3.googleusercontent.com/a-/AFdZucocR5l-Ux0ivxImIaXq8APcuOv7k3yZENk2FZgZvg=s96-c'
//   } token





  const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      email,
      limit,
      userID,
      plan,
      pquota

    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String! $userID: String!, $plan: String!, $limit: Int!, $pquota: Int!) {
    newUser: createNextUser(data: { email: $email, password: $password userID: $userID, plan: $plan, limit: $limit, pquota: $pquota }) {
      id
    }
  }
`;


