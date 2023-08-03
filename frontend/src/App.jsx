import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import axios from "axios";

const symbols = ["BTCUSD", "ETHUSD", "LTCUSD", "LTCBTC", "ETHBTC"];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = symbols.map((symbol) =>
          axios.get(`/api/bitfinex/${symbol}`)
        );
        const responses = await Promise.all(requests);
        const newData = {};
        responses.forEach((res, index) => {
          newData[symbols[index]] = res.data;
        });
        setData(newData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <nav className="p-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <NavLink to="/" className="px-3 py-2 rounded-md hover:bg-gray-300">
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to="/favorites"
                className="px-3 py-2 rounded-md hover:bg-gray-300"
              >
                Favorites
              </NavLink>
            )}
          </div>
          <div className="ml-auto">
            {!isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Login
              </button>
            ) : null}
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<HomePage data={data} symbols={symbols} />}
          />
          <Route
            path="/details/:name"
            element={<DetailsPage data={data} isLoggedIn={isLoggedIn} />}
          />
          {isLoggedIn && (
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  handleLogin={handleLogin}
                  data={data}
                  symbols={symbols}
                />
              }
            />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
