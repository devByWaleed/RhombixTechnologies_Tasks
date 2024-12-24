import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
// import UserForm from './components/form';    // wrong path as navbar & form are in same directory
import UserForm from './form';

function NavBar({ search, setSearch, categories, setCategories }) {

    const getData = () => {
        let storedBooks = localStorage.getItem("books");
        if (storedBooks) {
            return (JSON.parse(storedBooks));
        }
        else {
            return [];
        }

    }
    const bookList = getData();     // Contain Array of objects(books)

    const getCategories = () => {
        const categories = bookList.map((book) => book.category || "Unknown");
        return [...new Set(categories)]; // Remove duplicates using Set
    };

    // Graping unique caetgories
    const uniqueCategories = getCategories();

    // useLocation To Navigate only one component
    const location = useLocation();

    // States for Pop-up handling
    const [isVisible, setVisible] = useState(false);

    const handlePopup = () => { setVisible(true); }

    const handleClosePopup = () => { setVisible(false); }



    return (
        <>
            <nav className="flex items-center text-sm justify-between p-4 w-full bg-black drop-shadow-2xl hover:shadow-blue-900">
                <h1 className="lg:text-2xl   pl-2 font-bold italic text-amber-600">Book Library</h1>

                <div className="text-amber-600 bg-black">
                    <details className="flex flex-col items-center justify-center gap-y-2 w-full lg:items-center lg:pl-3 lg:justify-center">
                        <summary>Filters</summary>
                        <div className="flex flex-col gap-y-2 justify-around p-3  top-full absolute z-50 w-full left-0 right-0 bg-black  lg:flex-row lg:gap-x-2">
                            <input type="text" name="" id="" className="lg:w-full p-1 mt-1 rounded border border-solid border-gray-300"
                                placeholder="Search Book With Title" onChange={(event) => setSearch(event.target.value)} />
                            <select name="" id="" className="p-1 rounded mt-1 lg:w-full" onChange={(event) => setCategories(event.target.value)}>
                                <option value="">Choose</option>
                                {bookList && uniqueCategories.map((category, index) =>
                                    <option key={index} value={category}>{category}</option>
                                )}
                            </select>
                        </div>
                    </details>
                </div>


                <div className="links  flex gap-x-2 items-center">

                    {location.pathname !== '/' && (
                        <Link to="/" search={search} categories={categories} className="no-underline font-normal italic hover:underline text-amber-600">Books</Link>
                    )}

                    {location.pathname !== '/hisory-page' && (
                        <Link to="history-page" search={search} categories={categories} className='no-underline font-normal italic hover:underline text-amber-600'>History</Link>
                    )}

                    <button id="addBookBtn"
                        className="w-9 h-9 flex items-center justify-center border-none cursor-pointer rounded-full text-white bg-gradient-to-t from-orange-600 via-yellow-400 to-amber-500 hover:bg-gradient-to-t hover:from-orange-400 hover:via-yellow-600 hover:to-amber-700"
                        title="Add New" onClick={handlePopup}>&#43;</button>
                </div>
            </nav>

            {/* Passing props to form form pop-up handling */}
            <UserForm isVisible={isVisible} handleClosePopup={handleClosePopup} />

        </>
    );
}

export default NavBar;