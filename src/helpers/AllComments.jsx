import React from "react";
import Comment from "./Comment";

const AllComments = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          userName={comment.user}
          commentText={comment.comment}
          datetime={comment.dateTime_formatted}
        />
      ))}
    </div>
  );
};

export default AllComments;
