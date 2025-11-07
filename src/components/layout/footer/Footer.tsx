"use client";
import { FormEvent, useState } from "react";
import sass from "./Footer.module.scss";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !agree) {
      alert("Заполните email и подтвердите согласие!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("Некорректный email!");
      return;
    }

    try {
      const chat_id = "-1002597947748";
      const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN; // токен в .env
      const api_url = `https://api.telegram.org/bot${token}/sendMessage`;

      await axios.post(api_url, {
        chat_id,
        parse_mode: "HTML",
        text: `📧 <b>!</b>\nEmail: ${email}`,
      });

      alert("Подписка оформлена!");
      setEmail("");
      setAgree(false);
    } catch (error) {
      console.error(error);
      alert("Ошибка отправки. Попробуйте позже.");
    }
  };

  return (
    <div className="container">
      <footer className={sass.footer}>
        <div className={sass.title}>
          <h1>Успей купить!</h1>
          <p>
            Подпишись и успей <br />
            словить все акции
          </p>
        </div>

        <form className={sass.form} onSubmit={handleSubmit}>
          <div className={sass.inputGroup}>
            <input
              type="email"
              placeholder="Введите ваш email"
              className={sass.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className={sass.checkboxLabel}>
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                required
              />
              <span>Подписаться на новости</span>
            </label>
          </div>
          <button type="submit" className={sass.button}>
            Подписаться
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
