export default async (req, res) => {
  const [searchQuery] = req.query;
  if(!searchQuery) {
    return res.status(400).json({message: '検索文字がありません'});

  }

  try {

    const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${encodeURICOmponent(searchQuery)}&language=ja-JP`)
    return res.status(200).json({})
  } catch(err) {
    console.log('エラー内容は。。。',　err);
    return res.status(500).json({message: 'サーバー側でエラーが発生しました'});
  }
} 