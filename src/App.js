import React from "react";
import "./App.css";
import UserTable from "./users/UserTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-2xl font-bold">Random User Table</h1>
        <h3>Click FULL NAME or USERNAME to sort</h3>
      </header>
      <main className="container mx-auto">
        <UserTable />
      </main>
    </div>
  );
}

export default App;
