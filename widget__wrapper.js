const halls = [
  { id: 1, name: "Малый зал", image: "hall1.jpg" },
  { id: 2, name: "Мастерская", image: "hall2.jpg" },
  { id: 3, name: "Детский зал", image: "hall3.jpg" },
  { id: 4, name: "Лофт", image: "hall1.jpg" },
  { id: 5, name: "Хромакей", image: "hall2.jpg" },
  { id: 6, name: "Малый зал", image: "hall3.jpg" },
  { id: 7, name: "Мастерская", image: "hall1.jpg" },
  { id: 8, name: "Детский зал", image: "hall2.jpg" },
  { id: 9, name: "Лофт", image: "hall3.jpg" },
  { id: 10, name: "Хромакей", image: "hall1.jpg" }
];

document.querySelectorAll('.widget__hall-img-wrapper').forEach((wrapper) => {
  const hallGroup = [...halls]; // один и тот же массив для всех карточек
  const img = wrapper.querySelector('.widget__hall-img');
  const title = wrapper.closest('.widget__hall').querySelector('.booking-title');
  const left = wrapper.querySelector('.arrow--left');
  const right = wrapper.querySelector('.arrow--right');

  let current = 0;
  let interval;

  function show(i) {
    current = (i + hallGroup.length) % hallGroup.length;
    img.src = hallGroup[current].image;
    title.textContent = hallGroup[current].name;

     if (typeof window.setSelectedHallFromWidget === "function") {
    window.setSelectedHallFromWidget(hallGroup[current].id);
  }
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function startAuto() {
    stopAuto();
    interval = setInterval(next, 3000);
  }

  function stopAuto() {
    if (interval) clearInterval(interval);
  }

  show(0);
  startAuto();

  wrapper.addEventListener('mouseenter', stopAuto);
  wrapper.addEventListener('mouseleave', startAuto);
  left.addEventListener('click', prev);
  right.addEventListener('click', next);
});


 const popupRoot = document.getElementById("app");
let appMounted = false;

// Показать модалку
function openPopup() {
  if (!appMounted && typeof window.mountApp === "function") {
    window.mountApp();
    appMounted = true;
  }

  // Подождать, пока React успеет отрисовать модалку
  requestAnimationFrame(() => {
    const overlay = popupRoot.querySelector(".modal-overlay");
    if (overlay) {
       console.log("overlay найден");
      overlay.classList.remove("hidden");
    } else {
      console.error("Модалка не найдена внутри #app");
    }
  });
}

// Скрытие при клике на фон
popupRoot.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.add("hidden");
  }
});

// Кнопки бронирования для каждого зала
document.querySelectorAll(".widget__hall__button").forEach((btn) => {
  btn.addEventListener("click", openPopup);
});

// Кнопка бронирования в мобильной секции
document.querySelector(".mobile__button--book")?.addEventListener("click", openPopup);
