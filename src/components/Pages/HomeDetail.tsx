"use client";

import { useEffect, useState } from "react";

const RANGE = "Sheet1!A1:E10";

function HomeDetail() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchSheetData();
  }, []);

  const fetchSheetData = async () => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_KEY}/values/${RANGE}?key=${process.env.NEXT_PUBLIC_GOOGLE_SHETTS_API}`;

    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return <div className="bg-gray-200 h-[100vh] w-full">home</div>;
}

export default HomeDetail;
