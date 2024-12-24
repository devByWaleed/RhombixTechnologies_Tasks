// Importing Modules 
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// Importing Components 
import NavBar from './components/navbar';
import History from './components/history';
import Books from './components/books';
import UserForm from './components/form';

// Main Function (Function Component)
function App() {

  // State for applying search functionality
  const [search, setSearch] = useState('');


  // State for applying categorize functionality
  const [categories, setCategories] = useState('');


  // Returning The Components With Props & Routers For Navigation
  return (
    <div className="flex flex-col  min-h-screen  bg-gradient-to-t from-[#2C3E50] to-[#FFFFFF]">
      <>
        <NavBar search={search} setSearch={setSearch} categories={categories} setCategories={setCategories} />
        <UserForm />
      </>
      <Routes>
        <Route path="/" element={<Books search={search} categories={categories} />} />
        <Route path="/history-page" element={<History search={search} categories={categories} />} />
      </Routes>
    </div>
  );
}

export default App;     // Exporting The Component
