import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailsPage = ({ isLoggedIn, data }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { name } = useParams();
  const selectedData = data[name];

  useEffect(() => {
    const favoriteSymbolsFromStorage =
      JSON.parse(localStorage.getItem("favoriteSymbols")) || [];
    const initialIsFavorite = favoriteSymbolsFromStorage.includes(name);
    setIsFavorite(initialIsFavorite);
  }, [name]);

  if (!selectedData) {
    return <div>Symbol not found or invalid URL</div>;
  }

  const handleFavoriteClick = () => {
    const favoriteSymbolsFromStorage =
      JSON.parse(localStorage.getItem("favoriteSymbols")) || [];
    const updatedFavorites = [...favoriteSymbolsFromStorage];
    if (isFavorite) {
      const index = updatedFavorites.indexOf(name);
      if (index !== -1) {
        updatedFavorites.splice(index, 1);
      }
    } else {
      updatedFavorites.push(name);
    }
    setIsFavorite(!isFavorite);
    localStorage.setItem("favoriteSymbols", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold mb-6">Details Page</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Name: {name}</h2>
          <p>Last price: {selectedData.last_price}</p>
          <p>Daily high: {selectedData.high}</p>
          <p>Daily low: {selectedData.low}</p>
          {isLoggedIn && (
            <button
              onClick={handleFavoriteClick}
              className={`mt-4 px-4 py-2 rounded-md ${
                isFavorite ? "bg-red-500" : "bg-green-500"
              } hover:bg-opacity-75 transition-colors duration-300`}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
