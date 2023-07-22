const Comment = ({ userName, commentText, datetime }) => {
  return (
    <div className="border border-gray-300 rounded p-4 mb-4">
      <div className="text-lg font-semibold">{userName}</div>
      <div className="text-gray-600 text-sm">{commentText}</div>
      <div className="text-gray-500 text-xs mt-2">{datetime}</div>
    </div>
  );
};

export default Comment;
