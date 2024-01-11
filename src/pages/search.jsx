import AppLayout from '@/components/Layouts/AppLayout';
import Layout from '@/components/Layouts/Layout';
import SideBar from '@/components/SideBar';
import laravelAxios from '@/lib/laravelAxios';
import { AssignmentLateOutlined } from '@mui/icons-material';
import { useForkRef } from '@mui/material';
import Head from 'next/head';
import React, { useEffect } from 'react';


const search = () => {
  // allで指定することで全ての検索結果を取得する
  const [category, setCategory] = useState('all');
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { query:searchQuery }= router.query;
  const { loading, setLoading } = useState(true);

  useEffect(() => {
    if(!searchQuery) {
      return
    }
    const fetchMedia = async () => {
      try {

        const response = await axios.get(`api/searchMedia?searchQuery=${searchQuery}`)
        const searchResults = response.data.results;

        const validResults = searchResults.filter((item) => item.media_type == "movie" || item.media_type == "tv");
        setResults(validResults);

      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMedia()

  },[searchQuery])

  const filteredResults = results.filter((result) => {
    if(result.media_type == 'all') {
      return true;
    }

    return result.media_type === category;
  })

}

  return (
    <AppLayout
    header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            search
        </h2>
    }>
    <Head>
        <title>Laravel - Search</title>
    </Head>


    <Layout sidebar={<SideBar setCategory={setCategory}/>}>
      {loading ? (
        <Grid xs={12}>
          <Typography>検索中。。。</Typography>
        </Grid>
      ):
      filteredResults.length > 0 ? (
      <Grid container spacing={3}>
        {filteredResults.map((media) => (
          <MediaCard item={media} key={media.id}/>
        ))}
      </Grid>
      ) : (
        <Grid xs={12}>
          <Typography>検索結果が見つかりませんでした。</Typography>
        </Grid>
        )}
    </Layout>
    </AppLayout>
  )

export default search