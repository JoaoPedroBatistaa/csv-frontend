import { ChangeEvent, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

import { ToastContainer, toast } from "react-toastify";
import DataTable from "../DataTable/DataTable";

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [fileSent, setFileSent] = useState(false);
  const [data, setData] = useState([]);

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleClearFile = () => {
    setFile(null);

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setIsFileSelected(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    setFile(selectedFile || null);
    setIsFileSelected(true);
  };

  const handleUpload = () => {
    if (file) {
      let formData = new FormData();
      formData.append("file", file);

      fetch("http://localhost:3000/api/files", {
        method: "POST",
        // @ts-ignore
        body: formData,
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json().then((data) => {
              setFileSent(true);
              setIsFileSelected(false);
              setFile(null);
              setData(data.data);
              console.log(`${data.message}`);
              toast.success(`${data.message}`);
            });
          }
        })
        .catch((error) => {
          toast.error(`Error sending the file!`);
          console.log(`Error sending the file! ${error}`);
        });
    }
  };

  return (
    <>
      <div className="uploadContainer">
        <ToastContainer></ToastContainer>
        <img src="/upload.png" alt="upload icon" className="Upload" />

        {!isFileSelected && (
          <>
            <label htmlFor="fileInput" className="LabelUpload">
              Select the .csv file of your choice
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".csv"
              className="inputUpload"
              onChange={handleFileChange}
            />
            <button onClick={handleClick} className="UploadButton">
              Select file
            </button>
          </>
        )}

        {isFileSelected && (
          <>
            <div className="FileSelected">
              <img src="/file.png" alt="file icon" className="FileImg" />

              <div className="FileSelectedStats">
                <div className="FileSelectedName">
                  {file && <p className="FileInfo">{file.name}</p>}
                  <p className="FilePercent">100%</p>
                </div>

                <div className="FileSelectedBar"></div>
              </div>

              <img
                src="/trash.png"
                alt="trash icon"
                className="FileDelete"
                onClick={handleClearFile}
              />
            </div>
            <button onClick={handleUpload} className="SendButton">
              Send file
            </button>
          </>
        )}
      </div>
      <DataTable fileSent={fileSent} data={data}></DataTable>
    </>
  );
}

export default FileUpload;
