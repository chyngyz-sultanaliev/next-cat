import sass from "./CatsCard.module.scss";
import Image from "next/image";
import FavoriteBtn from "../favoriteBtn/FavoriteBtn";

interface Cat {
  id: string;
  name: string;
  color: string;
  age: number;
  paws: number;
  price: number;
  sale: number;
  image: string;
  isFavorite?: boolean;
}

interface Props {
  cat: Cat;
  token?: string;
}

const CatsCard = ({ cat, token }: Props) => {
  return (
    <div className={sass.card}>
      <div className={sass.imageIcon}>
        <Image
          src={cat.image}
          alt={cat.name}
          width={300}
          height={300}
          className={sass.image}
        />
        <div className={sass.icon}>
          <FavoriteBtn
            token={token}
            catId={cat.id}
            isFavorite={cat.isFavorite}
          />
        </div>
        {cat.sale ? <div className={sass.sale}>{cat.sale}%</div> : null}
      </div>

      <div className={sass.content}>
        <h3 className={sass.title}>{cat.name}</h3>
        <div className={sass.info}>
          <span>
            {cat.color} <br /> окрас
          </span>
          <h5>
            {cat.age} мес. <br />
            <span>Возраст</span>
          </h5>
          <h5>
            {cat.paws} <br />
            <span>Кол-во лап</span>
          </h5>
        </div>
        <div className={sass.price}>{cat.price.toLocaleString()} руб.</div>
      </div>

      <button className={sass.button}>Купить</button>
    </div>
  );
};

export default CatsCard;
