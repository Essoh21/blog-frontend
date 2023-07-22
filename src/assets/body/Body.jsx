import { useState, useEffect } from "react";
import Errors from "../../helpers/Errors";
import AllComments from "../../helpers/AllComments";

const Body = () => {
  const [data, setdata] = useState(null);
  const [username, setUsername] = useState("");
  const [commentErr, setCommentErr] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  useEffect(() => {
    const url = "http://localhost:3003/posts/64bb698dbc9f7884b03bc103";
    const fetchData = async () => {
      const data = await fetch(url).then((response) => response.json());
      setdata(data.post);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const url = "http://localhost:3003/comments";
    const fetchData = async () => {
      const data = await fetch(url).then((response) => response.json());
      console.log(data.comments);
      setAllComments(data.comments);
    };
    fetchData();
  });

  const handleSubmit = async (event) => {
    const apiUrl = "http://localhost:3003/post/comment";
    event.preventDefault(); // prevent submsission and page reload
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        user: username,
        email: email,
        comment: comment,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const resData = await response.json();
    if (response.status + "" !== 200 + "") {
      const errors = resData.errors;
      setCommentErr(() => {
        console.log(errors);
        return errors;
      });

      return;
    }

    setComment("");
    setEmail("");
    setCommentErr([]);
    setUsername("");
  };
  if (!data)
    return (
      <section className="container m-auto mt-8 min-h-screen">
        <p> loading ... </p>
      </section>
    );
  return (
    <article className="container m-auto my-8 min-h-screen flex flex-col items-center">
      <h1 className="font-bold text-3xl w-full text-center"> {data.title}</h1>
      <cite className="w-full text-center">
        {data.author.firstname + "   " + data.author.lastname}
      </cite>
      <section className="max-w-[90%]  md:max-w-[80%] mx-auto mt-8   flex flex-col ">
        <dl>
          <dt className="font-bold text-lg mt-8 mb-4"> Reading outcomes </dt>
          by the end of this reading, you should be able to :
          <dd className="mx-8"> - understand what really nodejs is </dd>
          <dd className="mx-8"> - in which case use nodejs</dd>
          <dd className="mx-8"> - how to use nodejs </dd>
          <dd className="mx-8"> - how to secure nodejs apps</dd>
        </dl>
        <p
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </section>
      <section>
        <h2 className="font-bold text-lg">Comments</h2>
        <div className="bg-gray-100 w-full px-4 my-8">
          <AllComments comments={allComments} />
        </div>
      </section>
      <section className="m-0">
        <form
          action=""
          method="POST"
          onSubmit={handleSubmit}
          className="box-border px-4"
        >
          <fieldset className="border-solid border border-black p-4">
            <legend className="text-lg font-bold">Comment this post</legend>
            <div className="my-4">
              <label htmlFor="username" className="block font-bold mb-1">
                Your name
              </label>
              <input
                required
                autoFocus
                className="border border-gray-500 w-full px-3 py-2 rounded"
                type="text"
                id="username"
                name="user"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="my-4">
              <label htmlFor="email" className="block font-bold mb-1">
                Your email
              </label>
              <input
                required
                className="border border-gray-500 w-full px-3 py-2 rounded"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <textarea
                className="border border-gray-500 mt-4 w-full p-4"
                name="comment"
                id=""
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                placeholder="your comment here"
              ></textarea>
            </div>
            {<Errors errors={commentErr} />}
            <button className="border border-gray-500 border-rounded px-3 py-1 hover:bg-gray-500 hover:text-white float-right">
              {" "}
              Post
            </button>
          </fieldset>
        </form>
      </section>
    </article>
  );
};

export default Body;
