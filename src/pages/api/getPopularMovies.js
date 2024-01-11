import axios from "axios";

export default async function handle(req, res) {
 try {
  const response = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`)
  res.status(200).json(resopnse.data);
  console.log('取得した結果は、、', response.data);
  } catch(err) {
  console.log(err);
  res.status(500).json({message:'エラーが発生しました'});
 }
}