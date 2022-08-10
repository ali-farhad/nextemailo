import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
  query MyQuery {
    postsConnection {
      edges {
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredimage {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }  
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredimage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};


export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredimage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};


export const getCategories = async () => {
  const query = gql`
    query GetGategories {
        categories {
          name
          slug
        }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};


export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredimage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};


export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};




export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredimage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};



export const getPricing = async (slug) => {
  const query = gql`
  query MyQuery {
    pricingsConnection {
      edges {
        node {
          starterValue
          proValue
        }
      }
    }
  }
  
  `;

  
  const result = await request(graphqlAPI, query, { slug });

  return result.pricingsConnection.edges;
};


const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    newUser: createNextUser(data: { email: $email, password: $password }) {
      id
    }
  }
`;

export const UpdateLimit = async (email, limit) => {
  const query = gql`
  mutation UpdateLimit($email: String!, $limit: Int!) {
    updateUser: updateNextUser(where: {email: $email}, data: {limit: $limit}) {
      email
      plan
      limit
      pquota
    }
  }
  `;

  const result = await request(graphqlAPI, query, { email, limit });

  return result;

}


export const GetUserByEmail = async (email) => {
  const query = gql`
  query GetUserByEmail($email: String!) {
    nextUser(where: { email: $email },) {
      email
      plan
      limit
      pquota
    }
  }
  `;

  const result = await request(graphqlAPI, query, { email });

  return result.nextUser;
};


export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};


export const UpdatePlan = async (email, limit, pquota, plan) => {
  const query = gql`
  mutation UpdatePlan($email: String!, $limit: Int!, $pquota: Int!, $plan: String!) {
    updateUser: updateNextUser(where: {email: $email}, data: {limit: $limit, pquota: $pquota, plan: $plan}) {
      email
      plan
      limit
      pquota 
    }
  }
  `;

  const result = await request(graphqlAPI, query, { email, limit, pquota, plan });

  return result;

}
