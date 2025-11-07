"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import sass from "./Login.module.scss";
import API_BASE_URL from "@/config/api";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
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
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка входа");
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={sass.login}>
      <div className={sass.card}>
        <h2 className={sass.title}>Вход в аккаунт</h2>

        <form className={sass.form} onSubmit={handleSubmit}>
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
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <p className={sass.text}>
          Нет аккаунта? <a href="/register">Зарегистрируйтесь</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
