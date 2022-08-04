import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import { GraphQLClient, gql } from "graphql-request";
import {useSession, signIn, signOut} from "next-auth/react";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

export default NextAuth({
    providers: [
        // CredentialsProvider({
        //     name: "Email and Password",
        //     credentials: {
        //         email: {
        //             label: "Email",
        //             type: "email",
        //             placeholder: "Enter your Email Address"
        //         },
        //         password: {
        //             label: "Password",
        //             type: "password",
        //             placeholder: "Enter your Password"
        //         },
        //     },
        //     authorize: async ({ email, password }) => {
        //         const { user } = await client.request(GetUserByEmail, {
        //           email,
        //         });
              
        //         if (!user) {
        //           const { newUser } = await client.request(
        //             CreateNextUserByEmail,
        //             {
        //               email,
        //               password: await hash(password, 12),
        //             }
        //           );
              
        //           return {
        //             id: newUser.id,
        //             username: email,
        //             email,
        //           };
        //         }
              
        //         const isValid = await compare(password, user.password);
              
        //         if (!isValid) {
        //           throw new Error("Wrong credentials. Try again.");
        //         }
              
        //         return {
        //           id: user.id,
        //           username: email,
        //           email,
        //         };
        //       },
        // },
    
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            }
          })
    ],
    callbacks: {
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
      email
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $userID: String!, $plan: String!, $limit: Int!, $pquota: Int!) {
    newUser: createNextUser(data: { email: $email, userID: $userID, plan: $plan, limit: $limit, pquota: $pquota }) {
      id
    }
  }
`;


