import HeadInfo from "../Components/HeadInfo";
import Image from "next/image";
import photosStyle from "../styles/Photos.module.css";
import Link from "next/link";
const photos = ({ photos }) => {
  return (
    <div>
      <HeadInfo title="My Next Photos" />
      <h1>My Photos</h1>
      <ul className={photosStyle.photos}>
        {photos.map((photo) => (
          <li key={photo.id}>
            <Link href={`/photos/${photo.id}`}>
              <a>
                <Image
                  src={photo.thumbnailUrl}
                  width={100}
                  height={100}
                  alt={photo.title}
                />
              </a>
            </Link>
            <span>{photo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_start=0&_end=10"
  );
  // json을 serailizer하려면 await는 필수야.
  const photos = await res.json();

  return {
    props: {
      photos,
    },
  };
};

export default photos;
