import React, { useState, useEffect } from 'react';
import "./dashboard.css";
import NavBar from '../NavBar';
const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");


    const fetchRepositories = async () => {
      try {
        const response = await fetch(`http://3.27.14.214:3002/repo/user/${userId}`);

        const data = await response.json();
        if (data.error) {
          console.error(data.error);
          return;
        }
        console.log(data)
        setRepositories(data.repositories || []);
      }
      catch (err) {
        console.error("error whle fetching repo", err)
      }
    };


    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://3.27.14.214:3002/repo/all`);

        const data = await response.json();

        if (data.error) {
          console.error(data.error);
          return;
        }
        console.log(data)
        setSuggestedRepositories(data || []);
        // console.log(fetchSuggestedRepositories);
      }
      catch (err) {
        console.error("error whle fetching repo", err)
      }
    };
    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);



  useEffect(() => {
    if (searchQuery == '') {
      setSearchResults(repositories)
    } else {
      
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return(
  <>
  <NavBar/>
   <section id='dashboard'>
    <aside>
      <h3>Suggested Repositories</h3>
      {suggestedRepositories.map((repo) => {
        return (<div key={repo._id}>
          <h3>{repo.name}</h3>
          <h4>{repo.description}</h4>
        </div>)
      })}
    </aside>


    <main>
      <h3>Your Repositories</h3>
      <div id='search'>
        <input type="text"  value={searchQuery} placeholder='search...' onChange={(e)=> setSearchQuery(e.target.value)}/>
      </div>

     {repositories.length === 0 ? (
    <p>No repositories found</p>
  ) : (
    repositories.map((repo) => (
      <div key={repo._id}>
        <h3>{repo.name}</h3>
        <h4>{repo.description}</h4>
      </div>
    ))
  )}
    </main>


    <aside>
      <h3>Upcoming events</h3>
      <ul>
        <li><p>Tech confrence</p></li>
        <li><p>Tech guidance</p></li>
        <li><p>Tech seminar</p></li>
        <li><p>Tech ki techi</p></li>
      </ul>
    </aside>
  </section>
  </>
 );
}

export default Dashboard;