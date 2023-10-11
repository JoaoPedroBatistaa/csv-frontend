import { useState } from "react";
import { toast } from "react-toastify";
import "./styles.css";

interface DataTableProps {
  fileSent: boolean;
  data: Object[];
}

function DataTable({ fileSent, data }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const displayData = searchResults.length > 0 ? searchResults : data;

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/users?q=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();

      if (data.message === "No results found!") {
        toast.error(data.message);
      } else {
        setSearchResults(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchResults([]);
    setSearchTerm("");
  };

  return (
    <>
      {fileSent === true && (
        <div className="dataContainer">
          <div className="searchContainer">
            <input
              type="text"
              placeholder="Search for an item by any term..."
              className="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="buttonsSearch">
              <button className="searchButton" onClick={handleSearch}>
                Search
              </button>

              <button className="clearButton" onClick={handleClear}>
                X
              </button>
            </div>
          </div>

          {loading ? <p>Loading...</p> : <></>}

          <div className="keysContainer">
            {Object.keys(displayData[0]).map((key, keyIndex) => (
              <p key={keyIndex} className="keyItem">
                {key}
              </p>
            ))}
          </div>

          {displayData.map((item, index) => (
            <div className="valuesContainer">
              {Object.values(item as string[]).map((value, valueIndex) => (
                <p key={index} className="valueItem">
                  {value}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DataTable;
