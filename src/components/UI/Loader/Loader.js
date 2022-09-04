import "./Loader.css";
import loading from "../../../assets/images/loading.gif";
function Loader() {
  return (
    <div className="loaderContainer">
      <img src={loading} alt="loadingIcon" />
    </div>
  );
}

export default Loader;
