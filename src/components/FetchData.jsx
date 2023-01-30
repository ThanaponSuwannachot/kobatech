import axios from "axios";
import React from "react";

const baseURL = "http://4102-203-150-199-47.ngrok.io/lastlog";

export default function FetchData() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    post
  );
}