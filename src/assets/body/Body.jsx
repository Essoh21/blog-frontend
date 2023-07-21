import { useState, useEffect } from "react";

const Body = () => {
  const [data, setdata] = useState(null);
  useEffect(() => {
    const url = "http://localhost:3003/author/64b620b55a66bfc8d3e83b89";
    const fetchData = async () => {
      const data = await fetch(url).then((response) => response.json());
      setdata(data);
    };
    fetchData();
  }, []);
  if (!data)
    return (
      <section className="container m-auto mt-8 min-h-screen">
        <p> loading ... </p>
      </section>
    );
  return (
    <section className="container m-auto mt-8 min-h-screen">
      <p> {data.firstname}</p>
    </section>
  );
};

export default Body;
