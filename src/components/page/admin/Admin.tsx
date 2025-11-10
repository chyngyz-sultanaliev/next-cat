"use client";
import React, { useState } from "react";
import sass from "./Admin.module.scss";
import API_BASE_URL from "@/config/api";
import Link from "next/link";
import Image from "next/image";

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
  token: string;
  cats: Cat[];
}
const Admin = ({ token, cats: initialCats }: Props) => {
  const [form, setForm] = useState<CatFormData>({
    name: "",
    color: "",
    age: "",
    paws: "",
    price: "",
    sale: "",
    image: "",
  });
  const [cats, setCats] = useState<Cat[]>(initialCats);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const catToSend: Omit<Cat, "id"> = {
        name: form.name,
        color: form.color,
        age: Number(form.age),
        paws: Number(form.paws),
        price: Number(form.price),
        sale: Number(form.sale),
        image: form.image,
      };

      const res = await fetch(`${API_BASE_URL}/api/v1/cats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(catToSend),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Кот успешно добавлен!");
        setForm({
          name: "",
          color: "",
          age: "",
          paws: "",
          price: "",
          sale: "",
          image: "",
        });
      } else {
        setMessage(`⚠️ ${data.message}`);
      }
    } catch (error) {
      console.error("Ошибка при создании кота:", error);
      setMessage("❌ Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить этого кота?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/cats/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCats((prev) => prev.filter((cat) => cat.id !== id));
        setDeleteMessage("🗑️ Кот удалён");
      } else {
        setDeleteMessage(`⚠️ ${data.message || "Ошибка при удалении кота"}`);
      }
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      setDeleteMessage("❌ Ошибка сервера");
    }
  };

  return (
    <div className={sass.admin}>
      <div className={sass.card}>
        <h2 className={sass.title}>Добавить кота</h2>
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
            {loading ? "Добавление..." : "Добавить кота"}
          </button>
        </form>
        {message && <p className={sass.text}>{message}</p>}
      </div>
      <div className={sass.list}>
        <h3 className={sass.subtitle}>Все коты ({cats.length})</h3>
        <div className={sass.catsGrid}>
          {cats.map((cat) => (
            <div key={cat.id} className={sass.catCard}>
              <Image
                src={cat.image}
                alt={cat.name}
                className={sass.catImage}
                width={200}
                height={200}
              />
              <h4>{cat.name}</h4>
              <p>Цвет: {cat.color}</p>
              <p>Возраст: {cat.age}</p>
              <p>Цена: {cat.price} сом</p>
              <p>Скидка: {cat.sale}%</p>
              <div className={sass.actions}>
                <Link href={`/${cat.id}`} className={sass.editBtn}>
                  ✏️
                </Link>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className={sass.deleteBtn}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
        {deleteMessage && <p className={sass.text}>{deleteMessage}</p>}
      </div>
    </div>
  );
};

export default Admin;
