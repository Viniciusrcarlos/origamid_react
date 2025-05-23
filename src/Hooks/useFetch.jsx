import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (URL, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(URL, options);
      json = await response.json();
      if (response.ok === false) {
        throw new Error(json.message);
      }
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return { data, loading, error, request };
};

export default useFetch;
