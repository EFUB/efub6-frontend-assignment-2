import React from "react";
import "./App.css";

// 한 번에 불러오는 데이터의 개수 정의
export const DATA_LIMIT = 5;

// getPosts 함수 정의
export const getPosts = async ({pageParam = 0}) => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${DATA_LIMIT}&skip=${pageParam * DATA_LIMIT}`
  );
  return response.json();
};

const App = () => {
  return;
};

export default App;