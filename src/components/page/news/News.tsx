import sass from "./News.module.scss";

const videos = [
  {
    src: "https://www.youtube.com/embed/_J19SOCHTEk",
    title: "Редкий кот найден в Кыргызстане!",
  },
  {
    src: "https://www.youtube.com/embed/vqEugUuSkJ4",
    title: "В Кыргызстане кошек отстреливать вместе с собаками! ну лайкните правозащитники 🙏#россия #беларусь",
  },
  {
    src: "https://www.youtube.com/embed/M_iHK7LkQdY",
    title: "cat games #веселыекоты #cat #видосыоткота #прикольныекоты #funnycats #funny #pets #animals #cute",
  },
];

const News = () => {
  return (
    <div className={`${sass.news} container`}>
      <h1>Новости</h1>
      <div className={sass.videos}>
        {videos.map((video, index) => (
          <div className={sass.video} key={index}>
            <iframe
              src={video.src}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
