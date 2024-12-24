import React, { useState } from "react";

function Books({ search, categories }) {

  // Logic to get current date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const current_date = `${yyyy}-${mm}-${dd}`;



  // Get Data From localStorage
  const getData = () => {
    let storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      return JSON.parse(storedBooks);
    } else {
      return [];
    }
  };

  const [bookList, setBookList] = useState(getData());


  // Combine both filters: search and categorize
  const filteredBooks = bookList.filter((book) => {
    const matchesSearch = search
      ? book.title.toLowerCase().includes(search.toLowerCase())
      : true; // If search is empty, match all
    const matchesCategory = categories
      ? book.category.toLowerCase().includes(categories.toLowerCase())
      : true; // If categorize is empty, match all
    return matchesSearch && matchesCategory; // Both conditions must be true
  });

  const handleStatusChange = (index) => {
    // Create a copy of the current book list
    const updatedBookList = [...bookList];


    // Change the status of the selected book
    if (updatedBookList[index].status === "Overdue") {
      updatedBookList[index].status = "Returned";
    }
    else if ((updatedBookList[index].status === "Returned") && (current_date > updatedBookList[index].returnDate)) {
      updatedBookList[index].status = "Overdue"
    }
    else {
      updatedBookList[index].status = (updatedBookList[index].status === "Borrowed" ? "Returned" : "Borrowed");

    }


    // Update the state with the new book list
    setBookList(updatedBookList);

    // Save the updated book list to localStorage
    localStorage.setItem("books", JSON.stringify(updatedBookList));
  };


  // Function to dynamically set icon color based on book status
  const getIconColor = (status) => {
    if (status === "Borrowed") return "text-blue-500"; // Blue for borrowed
    if (status === "Returned") return "text-green-500"; // Green for returned
    if (status === "Overdue") return "text-red-500"; // Red for overdue
    return "text-gray-500"; // Default color
  };



  return (
    <>
      <div className="flex items-center justify-center my-24 mx-auto h-95 overflow-y-scroll scrollbar-none flex-wrap gap-5 p-4 lg:w-[80%]  custom-scrollbar">
        {filteredBooks.map((book, index) => (
          <div
            className="flex flex-col p-4 h-80 w-60 text-center rounded-lg relative shadow-2xl hover:shadow-slate-900 text-gray-600 bg-gradient-to-t from-orange-600 via-yellow-400 to-amber-500"
            key={index}
          >
            <h2
              className="text-2xl font-semibold text-gray-900 mt-5 overflow-hidden"
              style={{
                maxHeight: "2.5rem",
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {book.title || "Book Title"}
            </h2>
            <p className="text-lg italic text-gray-700 mt-3">By: {book.writer || "Book Writer"}</p>
            <p className="text-lg text-gray-600 mt-3">Category: {book.category || "Category"}</p>
            <p className="text-md text-gray-500 mt-3">Borrow Date: {book.borrowDate || "Borrow Date"}</p>
            <i className="text-md text-gray-500 mt-3">Returned Date: {book.returnDate || "Returned Date"}</i>
            <b className="text-md text-white font-medium mt-3">Status: {book.status || "Status"}</b>
            <i
              className={`bi bi-arrow-right-circle text-3xl mt-4 cursor-pointer ${getIconColor(
                book.status
              )}`}
              onClick={() => handleStatusChange(index)}
              title={`Current status: ${book.status}`}
            ></i>

          </div>
        ))}
      </div>
    </>
  );
}

export default Books;
