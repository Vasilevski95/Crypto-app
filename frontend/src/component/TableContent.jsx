import React from "react";
import { Link } from "react-router-dom";

const TableContent = ({ symbol, data }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="px-4 py-2 border-b border-gray-200">
        <Link
          to={`/details/${symbol}`}
          className="text-blue-500 hover:underline"
        >
          {symbol}
        </Link>
      </td>
      <td className="px-4 py-2 border-b border-gray-200">
        {data[symbol]?.bid}
      </td>
      <td className="px-4 py-2 border-b border-gray-200">
        {data[symbol]?.ask}
      </td>
      <td className="px-4 py-2 border-b border-gray-200">
        {data[symbol]?.last_price}
      </td>
      <td className="px-4 py-2 border-b border-gray-200">
        {data[symbol]?.low}
      </td>
      <td className="px-4 py-2 border-b border-gray-200">
        {data[symbol]?.high}
      </td>
      <td className="px-4 py-2 border-b border-gray-200">
        {data[symbol]?.volume}
      </td>
      <td className="px-4 py-2 border-b border-gray-200">
        {data[symbol]?.timestamp}
      </td>
    </tr>
  );
};

export default TableContent;
