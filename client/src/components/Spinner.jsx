import ClipLoader from "react-spinners/ClipLoader";
const Spinner = () => {
  return (
    <div className="spinner flex justify-center items-center h-full">
      <ClipLoader color={"#FF385C"} loading={true} size={50} />
    </div>
  );
};
export default Spinner;