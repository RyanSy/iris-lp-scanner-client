// src/App.js

import React from "react";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import { useAuth0 } from "./react-auth0-spa";

function App() {
  const { isAuthenticated, loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <NavBar />
      {!isAuthenticated && (
        <div class="text-center mt-5">
          <h5>Please login to begin.</h5>
        </div>
      )}
      {isAuthenticated && (
        <div>
          <Search />
        </div>
      )}
    </div>
  );
}

export default App;
