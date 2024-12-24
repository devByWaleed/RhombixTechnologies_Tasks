// Importing Modules & Hooks
import React, { useState, useEffect } from 'react';

// Function with props to handle Pop-up
function UserForm({ isVisible, handleClosePopup }) {


    // main array for saving books
    const [books, setBooks] = useState(() => {
        return JSON.parse(localStorage.getItem("books")) || [];
    });

    // Input Fields State Handling
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [category, setCategory] = useState('');
    const [borrowDate, setBorrowDate] = useState('');
    const [returnDate, setReturnDate] = useState('');


    function handleAddBook(event) {

        // Prevent Default Form Behaviour
        event.preventDefault();

        // Logic to get current date
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const current_date = `${yyyy}-${mm}-${dd}`;

        // Setting Default Status (based on current date)
        const status = returnDate < current_date ? "Overdue" : "Borrowed";

        // // Normalize title for case-insensitive comparison
        // const normalizedTitle = title.trim().toLowerCase();
        // // Check for redundancy (case-insensitive check)
        // if (books.some(book => book.title.trim().toLowerCase() === normalizedTitle)) {
        //     alert("Book With Same Title Already Exists!!!");
        //     return;
        // }


        // Js Object to save data in key-value form
        let book = {
            title,
            writer,
            category,
            borrowDate,
            returnDate,
            status,
        }

        setBooks([...books, book]);     // spread operator to add another book after 1st one
        setTitle('');
        setWriter('');
        setCategory('');
        setBorrowDate('');
        setReturnDate('');
    }

    // Saving data to local storage using useEffect(so that the behaviour is ok)
    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    if (!isVisible) return null;

    return (
        <div id="popup" className="flex fixed top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="p-3 w-80 rounded-lg text-center relative bg-[#F5F5F5]">
                <span id="closeBtn" className="absolute top-3 right-3 text-xl cursor-pointer" onClick={handleClosePopup}>&times;</span>
                <h2>Add New Book</h2>
                <form onSubmit={handleAddBook}>
                    <label className="block mt-2 text-xs  lg:text-xl">Book Title</label>
                    <input type="text" id="title" className="w-full p-2 mt-1 border border-solid border-gray-300 rounded"
                        placeholder="Book Name" required onChange={(event) => setTitle(event.target.value)} value={title} />

                    <label className="block mt-2 text-xs  lg:text-xl">Book Writer</label>
                    <input type="text" id="composer" className="w-full p-2 mt-1 border border-solid border-gray-300 rounded"
                        placeholder="Writer Name" required onChange={(event) => setWriter(event.target.value)} value={writer} />

                    <label className="block mt-2 text-xs  lg:text-xl">Category</label>
                    <input type="text" id="category" className="w-full p-2 mt-1 border border-solid border-gray-300 rounded"
                        placeholder="Category" required onChange={(event) => setCategory(event.target.value)} value={category} />

                    <label className="block mt-2 text-xs  lg:text-xl">Borrow Date</label>
                    <input type="date" name="borrowDate" placeholder="Select Borrow Date" onChange={(event) => setBorrowDate(event.target.value)} value={borrowDate} />

                    <label className="block mt-2 text-xs  lg:text-xl">Return Date</label>
                    <input type="date" name="returnDate" placeholder="Select Return Date" onChange={(event) => setReturnDate(event.target.value)} value={returnDate} />

                    <button type="submit"
                        className="mt-4 p-2 w-full border-none cursor-pointer rounded text-white bg-gradient-to-b from-orange-600 via-yellow-400 to-amber-500  hover:bg-gradient-to-t hover:from-yellow-600 hover:via-amber-400 hover:to-orange-500"
                        name="submit">Add New Book</button>
                </form>
            </div>
        </div>
    );
}

export default UserForm;
