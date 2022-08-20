import { NextPage } from "next";
import Layout from "../../components/Layout"
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'


type PathParamsType = {
  params: {
    id: string
  }
}

const PostPage: NextPage = ({ postData }: any) => {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths = () => { // 表示する可能性のあるページ（パス）を羅列＜ビルド時に用意される＞
  const paths = getAllPostIds(); // 表示可能なファイル名の配列が返ってくる
  return {
    paths,
    fallback: false,
  }
}

// getStaticPaths実行後にそれぞれのパス（配列要素全て）に対して実行される
// データが保管されている場所から、実際にデータをとってきて、スタンバイさせておく
export const getStaticProps = async ({params}: PathParamsType) => { //SSG でデータをフェッチ
  const postData = await getPostData(params.id); // id(=各ファイル名)を渡すことで、その投稿データを取得する
  return {
    props: {
      postData, // 取得したデータをpropsとしてページコンポーネントに提供
    },
  };
}

export default PostPage