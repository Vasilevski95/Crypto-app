import React from "react";
import TableContent from "../component/TableContent";

const FavoritesPage = ({ data, symbols }) => {
  const favoriteSymbolsFromStorage =
    JSON.parse(localStorage.getItem("favoriteSymbols")) || [];

  const favoriteSymbols = symbols.filter((symbol) =>
    favoriteSymbolsFromStorage.includes(symbol)
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold mb-6">Favorites Page</h1>
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-md p-4">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Symbol</th>
                  <th className="px-4 py-2 text-left">Bid</th>
                  <th className="px-4 py-2 text-left">Ask</th>
                  <th className="px-4 py-2 text-left">Last Price</th>
                  <th className="px-4 py-2 text-left">Low</th>
                  <th className="px-4 py-2 text-left">High</th>
                  <th className="px-4 py-2 text-left">Volume</th>
                  <th className="px-4 py-2 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {favoriteSymbols.map((symbol) => (
                  <TableContent key={symbol} symbol={symbol} data={data} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
