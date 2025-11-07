import sass from "./CatsCard.module.scss";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

interface Cat {
  name: string;
  color: string;
  age: number;
  paws: number;
  price: number;
  image: string;
}

interface Props {
  cat: Cat;
}

const CatsCard = ({ cat }: Props) => {
  return (
    <div className={sass.card}>
      <div className={sass.imageIcon}>
        <Image src={cat.image} alt={cat.name} width={300} height={300} className={sass.image} />
        <div className={sass.icon}>
          <FaHeart />
        </div>
        <div className={sass.sale}>40%</div>
      </div>

      <div className={sass.content}>
        <h3 className={sass.title}>{cat.name}</h3>
        <div className={sass.info}>
          <span>{cat.color} <br /> окрас</span>
          <h5>{cat.age} мес. <br /><span>Возраст</span></h5>
          <h5>{cat.paws} <br /><span>Кол-во лап</span></h5>
        </div>
        <div className={sass.price}>{cat.price.toLocaleString()} руб.</div>
      </div>

      <button className={sass.button}>Купить</button>
    </div>
  );
};

export default CatsCard;
