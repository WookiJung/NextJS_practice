import styles from "../styles/Home.module.css";
import HeadInfo from "../Components/HeadInfo";
export default function Home({posts}) {
  console.log(posts)
  return (
    <div>
      <HeadInfo title="My Next.js Home"/>
      <h1>Welcome home</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// export const getServerSideProps = async () => {
//   const res = await fetch("http://localhost:8080/api/posts")
//   const posts = await res.json();

//   return {
//     props: {
//       posts
//     }
//   }
// }
export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_start=0&_end=10")
  const posts = await res.json();

  return {
    props: {
      posts
    },
    revalidate: 20
  }
}