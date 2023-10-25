import { useEffect, useState } from 'react';

const base = 'https://web-demo-tiktok-api.vercel.app/api/';

const useFetchData = (url, options) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;
      try {
        setLoading(true);
        const res = await (await fetch(`${base}${url}`)).json();
        setData(res);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return {
    data,
    loading,
  };
};

export default useFetchData;
