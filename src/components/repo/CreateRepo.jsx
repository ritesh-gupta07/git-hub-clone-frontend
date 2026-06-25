import React, { useState } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import "./createRepo.css"
const CreateRepository = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);

  const handleCreateRepository = async (e) => {
    e.preventDefault();

    try {
      const owner = localStorage.getItem("userId");

      const res = await axios.post(
        "http://localhost:3002/repo/create",
        {
          name,
          description,
          visibility,
          owner,
          content: [],
          issues: []
        }
      );

      alert("Repository Created Successfully!");
      console.log(res.data);

      setName("");
      setDescription("");

    } catch (err) {
      console.error(err);
      alert("Failed to create repository");
    }
  };

  return (<>
    <NavBar/>
    <div className="create-repo-container">
      <h1>Create Repository</h1>

      <form onSubmit={handleCreateRepository}>
        <div>
          <label>Repository Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={visibility}
              onChange={() => setVisibility(!visibility)}
            />
            Public Repository
          </label>
        </div>

        <button type="submit">
          Create Repository
        </button>
      </form>
    </div>
 </> );
};

export default CreateRepository;

// import React from "react";

// const CreateRepository = () => {
//   return (
//     <div style={{ color: "white" }}>
//       <h1>Create Repository Page</h1>
//     </div>
//   );
// };

// export default CreateRepository;