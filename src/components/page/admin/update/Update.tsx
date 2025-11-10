"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import sass from "./Update.module.scss";
import API_BASE_URL from "@/config/api";

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

type CatFormData = Omit<Cat, "id" | "age" | "paws" | "price" | "sale"> & {
  age: string;
  paws: string;
  price: string;
  sale: string;
};

interface Props {
  cats: Cat[];
  token: string;
}

const Update = ({ cats, token }: Props) => {
  const { id } = useParams();
  const [form, setForm] = useState<CatFormData>({
    name: "",
    color: "",
    age: "",
    paws: "",
    price: "",
    sale: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const cat = cats.find((c) => c.id === id);
    if (cat) {
      setForm({
        name: cat.name,
        color: cat.color,
        age: String(cat.age),
        paws: String(cat.paws),
        price: String(cat.price),
        sale: String(cat.sale),
        image: cat.image,
      });
    }
  }, [id, cats]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const updatedCat: Omit<Cat, "id"> = {
        name: form.name,
        color: form.color,
        age: Number(form.age),
        paws: Number(form.paws),
        price: Number(form.price),
        sale: Number(form.sale),
        image: form.image,
      };

      const res = await fetch(`${API_BASE_URL}/api/v1/cats/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCat),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Кот успешно обновлён!");
      } else {
        setMessage(`⚠️ ${data.message}`);
      }
    } catch (error) {
      console.error("Ошибка при обновлении кота:", error);
      setMessage("❌ Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={sass.update}>
      <div className={sass.card}>
        <h2 className={sass.title}>Редактировать кота</h2>

        <form onSubmit={handleSubmit}>
          {(Object.keys(form) as (keyof CatFormData)[]).map((field) => (
            <div className={sass.field} key={field}>
              <label htmlFor={field}>
                {field === "name"
                  ? "Имя"
                  : field === "color"
                  ? "Цвет"
                  : field === "age"
                  ? "Возраст"
                  : field === "paws"
                  ? "Количество лап"
                  : field === "price"
                  ? "Цена"
                  : field === "sale"
                  ? "Скидка"
                  : "Изображение (URL)"}
              </label>
              <input
                id={field}
                name={field}
                type="text"
                value={form[field]}
                onChange={handleChange}
                placeholder={`Введите ${field}`}
                required={field !== "sale"}
              />
            </div>
          ))}

          <button type="submit" className={sass.btn} disabled={loading}>
            {loading ? "Обновление..." : "Обновить кота"}
          </button>
        </form>

        {message && <p className={sass.text}>{message}</p>}
      </div>
    </div>
  );
};

export default Update;
