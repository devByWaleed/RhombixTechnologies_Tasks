/*
import React, { useState } from 'react';

function UserForm({ isVisible, handleClosePopup }) {

    const [bookDetails, setBookDetails] = useState([]); // this will store all books (inside object)

    const [currentBook, setCurrentBook] = useState({
        bookName: "",
        writerName: "",
        bookCategory: "",
        borrowDate: "",
        returnDate: "",
        status: "Borrowed"
    });     // this will store currently added book

    const handleChange = (event) => {
        const { name, value } = event.target;       // graping all input's value

        setCurrentBook({ ...currentBook, [name]: value });      // adding to current book
    };


    const handleAddBook = (event) => {
        event.preventDefault();
    
        // Step 1: Fetch existing books from localStorage (if any)
        const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
    
        // Step 2: Append the new book with default status
        const newBook = { ...currentBook, status: "Borrowed" }; // Ensure status is always "Borrowed"
        const updatedBooks = [...existingBooks, newBook];
    
        // Step 3: Update state and localStorage
        setBookDetails(updatedBooks);
        localStorage.setItem("books", JSON.stringify(updatedBooks));
    
        alert("Book added successfully!");
    
        // Step 4: Reset the form fields (including default status)
        setCurrentBook({
            bookName: "",
            writerName: "",
            bookCategory: "",
            borrowDate: "",
            returnDate: "",
            status: "Borrowed" // Reset status to "Borrowed"
        });
    };
    


    if (!isVisible) return null;

    return (
        <div id="popup" className="flex fixed top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="p-5 w-80 rounded-lg text-center relative bg-[#F5F5F5]">
                <span id="closeBtn" className="absolute top-3 right-3 text-xl cursor-pointer" onClick={handleClosePopup}>&times;</span>
                <h2>Add New Book</h2>
                <form onSubmit={handleAddBook}>
                    <label className="block mt-2 text-xs  lg:text-xl">Book Title</label>
                    <input type="text" id="title" className="w-full p-2 mt-1 border border-solid border-gray-300 rounded"
                        placeholder="Book Name" name="bookName" required onChange={handleChange} />

                    <label className="block mt-2 text-xs  lg:text-xl">Book Writer</label>
                    <input type="text" id="composer" className="w-full p-2 mt-1 border border-solid border-gray-300 rounded"
                        placeholder="Writer Name" name="writerName" required onChange={handleChange} />

                    <label className="block mt-2 text-xs  lg:text-xl">Category</label>
                    <input type="text" id="category" className="w-full p-2 mt-1 border border-solid border-gray-300 rounded"
                        placeholder="Category" name="bookCategory" required onChange={handleChange} />

                    <label className="block mt-2 text-xs  lg:text-xl">Borrow Date</label>
                    <input type="date" name="borrowDate" id="" placeholder="Select Borrow Date" onChange={handleChange} />

                    <label className="block mt-2 text-xs  lg:text-xl">Return Date</label>
                    <input type="date" name="returnDate" id="" placeholder="Select Return Date" onChange={handleChange} />

                    <button type="submit"
                        className="mt-4 p-2 w-full border-none cursor-pointer rounded text-white bg-gradient-to-b from-orange-600 via-yellow-400 to-amber-500  hover:bg-gradient-to-t hover:from-yellow-600 hover:via-amber-400 hover:to-orange-500"
                        name="submit">Add New Book</button>
                </form>
            </div>
        </div>
    );
}

export default UserForm;


*/