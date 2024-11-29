import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

export const useApiRequest = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          // if (response.status === 401) {
          //   navigate("/login");
          // }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })

        .catch((error) => {
          console.log(error);
          setError(true);
        });
    };
    fetchData();
  }, []);
  return { data, loading, error };
};
