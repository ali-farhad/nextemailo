import Head from 'next/head'

import Categories from './../../components/blog/Categories';
import PostCard from '../../components/blog/PostCard';
import PostWidget from '../../components/blog/PostWidget';  
import Header from '../../components/blog/Header';


import {getPosts}  from "../../services/cloud";




export default function Home({posts}) {
   
  

    return (
      
      <div className="container bg-blog mx-auto px-10">
        <Header/>
        
        {/* <FeaturedPosts /> */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-10">
        <div className="lg:col-span-8 col-span-1">
            {posts.map((post, index) => (
                <PostCard key={post.title} post={post.node} />
            ))}
            </div>
         
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    );
  }


  export async function getStaticProps() {
    
    const posts = (await getPosts()) || [];
    console.log(posts)
    return {
      props: { posts },
    };
  }