"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import sass from "./Register.module.scss";
import API_BASE_URL from "@/config/api";

interface RegisterForm {
  userName: string;
  email: string;
  password: string;
}

const Register = () => {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Ошибка регистрации");

      alert("Регистрация прошла успешно!");
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={sass.register}>
      <div className={sass.card}>
        <h2 className={sass.title}>Регистрация</h2>

        <form className={sass.form} onSubmit={handleSubmit}>
          <div className={sass.field}>
            <label htmlFor="userName">Имя</label>
            <input
              type="text"
              id="userName"
              placeholder="Введите имя"
              value={form.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={sass.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Введите email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={sass.field}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className={sass.error}>{error}</p>}

          <button type="submit" className={sass.button} disabled={loading}>
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className={sass.text}>
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
