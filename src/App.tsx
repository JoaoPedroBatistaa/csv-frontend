import "./App.css";
import FileUpload from "./components/FileUpload/FileUpload";

function App() {
  return (
    <div className="Container">
      <p className="Title">CSV Uploader</p>
      <FileUpload></FileUpload>
    </div>
  );
}

export default App;
