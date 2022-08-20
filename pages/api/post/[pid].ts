import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  text: string
  message: string
}

const PostApi = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { pid } = req.query // リクエストのクエリを取得して( { pid: res.query } )
  res.end(`Post: ${pid}`) // 取得したクエリをレスポンスとして返す
}

export default PostApi