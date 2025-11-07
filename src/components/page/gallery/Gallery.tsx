"use client";
import Image from "next/image";
import { useState } from "react";
import sass from "./Gallery.module.scss";

interface Cat {
  id: string;
  name: string;
  color: string;
  age: number;
  paws: number;
  price: number;
  image: string;
}

interface Props {
  cats: Cat[];
}

const Gallery = ({ cats }: Props) => {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  const openLightbox = (cat: Cat) => setSelectedCat(cat);
  const closeLightbox = () => setSelectedCat(null);

  return (
    <div className={sass.gallery}>
      <div className="container">
        <h1>Галерея котов</h1>
        <div className={sass.grid}>
          {cats.map((cat) => (
            <div
              key={cat.id}
              className={sass.card}
              onClick={() => openLightbox(cat)}
            >
              <Image src={cat.image} alt={cat.name} width={250} height={250} />
            </div>
          ))}
        </div>
        {selectedCat && (
          <div
            className={`${sass.lightbox} ${sass.active}`}
            onClick={closeLightbox}
          >
            <Image
              src={selectedCat.image}
              alt={selectedCat.name}
              width={600}
              height={600}
              onClick={(e) => e.stopPropagation()}
              className={sass.lightboxImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
