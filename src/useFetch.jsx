import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

export const useFetch = ({ url }) => {
  const [fetch, setFetch] = useState([]);

  const fetchData = useCallback(async () => {
    const { data } = await axios.get(url);
   
    setFetch(data);
  });
  useEffect(() => {
    fetchData();
  }, [url]);
  return fetch;
};
