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

// Получаем элементы
const wrapper = document.querySelector('.widget__hall-img-wrapper');
const img = wrapper.querySelector('.widget__hall-img');
const title = wrapper.closest('.widget__hall').querySelector('.booking-title');
const left = wrapper.querySelector('.arrow--left');
const right = wrapper.querySelector('.arrow--right');

let current = 0;
let interval;

// Функция отображения текущего зала
function show(i) {
  current = (i + halls.length) % halls.length;
  img.src = halls[current].image;
  title.textContent = halls[current].name;

  if (typeof window.setSelectedHallFromWidget === "function") {
    window.setSelectedHallFromWidget(halls[current].id);
  }
}

// Управление
function next() { show(current + 1); }
function prev() { show(current - 1); }

function startAuto() {
  console.log("Запуск автопрокрутки");
  stopAuto();
  interval = setInterval(next, 3000);
}

function stopAuto() {
  console.log("Остановка автопрокрутки");
  if (interval) clearInterval(interval);
}

window.startAuto = startAuto;
window.stopAuto = stopAuto;

// Инициализация
show(0);
startAuto();

// Наведение для паузы
wrapper.addEventListener('mouseenter', stopAuto);
wrapper.addEventListener('mouseleave', startAuto);
left.addEventListener('click', prev);
right.addEventListener('click', next);

// Работа с модалкой
const popupRoot = document.getElementById("app");
let appMounted = false;

function openPopup() {
  if (!appMounted && typeof window.mountApp === "function") {
    window.mountApp();
    appMounted = true;
  }

  requestAnimationFrame(() => {
    const overlay = popupRoot.querySelector(".modal-overlay");
    if (overlay) {
      console.log("overlay найден");
      overlay.classList.remove("hidden");
      stopAuto(); // Останавливаем автопрокрутку при открытии модалки
    } else {
      console.error("Модалка не найдена внутри #app");
    }
  });
}

/* popupRoot.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.add("hidden");
    startAuto(); // Возобновляем автопрокрутку при закрытии модалки
  }
});
 */
// Кнопки для открытия модалки
document.querySelector(".widget__hall__button")?.addEventListener("click", openPopup);
document.querySelector(".mobile__button--book")?.addEventListener("click", openPopup);