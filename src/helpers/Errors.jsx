const Errors = ({ errors }) => {
  return (
    <ul className="text-red-700 ">
      {errors.map((e, index) => (
        <li key={index}>{e.msg}</li>
      ))}
    </ul>
  );
};

export default Errors;
