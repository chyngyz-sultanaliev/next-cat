"use client";
import { useState } from "react";
import CatsCard from "@/src/components/ui/catsCard/CatsCard";
import sass from "./Cats.module.scss";

interface Cat {
  id: string;
  name: string;
  color: string;
  age: number;
  paws: number;
  price: number;
  sale: number;
  image: string;
}

interface Props {
  cats: Cat[];
  token: string;
}

const Cats = ({ token, cats }: Props) => {
  const [sortPrice, setSortPrice] = useState("default");
  const [sortAge, setSortAge] = useState("default");

  const sortedCats = [...cats]
    .sort((a, b) => {
      if (sortPrice === "a") return a.price - b.price;
      if (sortPrice === "b") return b.price - a.price;
      return 0;
    })
    .sort((a, b) => {
      if (sortAge === "young") return a.age - b.age;
      if (sortAge === "old") return b.age - a.age;
      return 0;
    });
  console.log(sortedCats);
  return (
    <div className="container">
      <div className={sass.sortControls}>
        <h3>Сортировать по:</h3>
        <div className={sass.selectGroup}>
          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
          >
            <option value="default">Цене</option>
            <option value="a">По возрастанию</option>
            <option value="b">По убыванию</option>
          </select>
          <select value={sortAge} onChange={(e) => setSortAge(e.target.value)}>
            <option value="default">Возрасту</option>
            <option value="young">Младше</option>
            <option value="old">Старше</option>
          </select>
        </div>
      </div>
      <div className={sass.cats}>
        {sortedCats.map((cat, index) => (
          <CatsCard token={token} key={index} cat={cat} />
        ))}
      </div>
    </div>
  );
};

export default Cats;
