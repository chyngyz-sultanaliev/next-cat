"use client";
import { useState } from "react";
import token from "@/config/api";
import sass from "./Admin.module.scss";

export interface Cat {
  id: string;
  name: string;
  color: string;
  age: number;
  paws: number;
  price: number;
  sale?: number;
  image: string;
}
 
interface AdminProps {
  initialCats: Cat[];
}

type CatForm = {
  name: string;
  color: string;
  age: string;
  paws: string;
  price: string;
  image: string;
};

export default function Admin({ initialCats }: AdminProps) {
  const [catsList, setCatsList] = useState<Cat[]>(initialCats);
  const [form, setForm] = useState<CatForm>({
    name: "",
    color: "",
    age: "",
    paws: "",
    price: "",
    image: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      age: Number(form.age),
      paws: Number(form.paws),
      price: Number(form.price),
    };

    try {
      if (editingId) {
        const res = await fetch(`/http://localhost:5000/api/cats/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const updatedCat = await res.json();
        setCatsList(
          catsList.map((cat) => (cat.id === editingId ? updatedCat : cat))
        );
      } else {
        const res = await fetch("http://localhost:5000/api/cats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify(payload),
        });
        const newCat = await res.json();
        setCatsList([...catsList, newCat]);
      }

      setForm({ name: "", color: "", age: "", paws: "", price: "", image: "" });
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (cat: Cat) => {
    setForm({
      name: cat.name,
      color: cat.color,
      age: String(cat.age),
      paws: String(cat.paws),
      price: String(cat.price),
      image: cat.image,
    });
    setEditingId(cat.id);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/cats/${id}`, { method: "DELETE" });
      setCatsList(catsList.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  console.log(token);

  return (
   <div className={sass.login}>
  <div className={sass.card}>
    <div className={sass.title}>Admin Panel</div>

    <form className={sass.form} onSubmit={handleSubmit}>
      {(Object.keys(form) as (keyof CatForm)[]).map((field) => (
        <div className={sass.field} key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button className={sass.button} type="submit">
        {editingId ? "Update" : "Create"}
      </button>
    </form>

    <hr className={sass.divider} />

    <div className={sass.catsList}>
      {catsList.map((cat) => (
        <div className={sass.catItem} key={cat.id}>
          <span>{cat.name} - {cat.color}</span>
          <div>
            <button className={sass.editButton} onClick={() => handleEdit(cat)}>Edit</button>
            <button className={sass.deleteButton} onClick={() => handleDelete(cat.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
