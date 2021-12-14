import Head from "next/head"
const HeadInfo = ({title,keyword, contents}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta keyword={keyword} contents={contents} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

HeadInfo.defaultProps = {
  title: 'My Next',
  keyword: "Blog Powered by Next.js",
  contents:"practice Next.js"

}
export default HeadInfo
