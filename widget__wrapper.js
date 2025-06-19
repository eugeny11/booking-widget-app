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

document.querySelectorAll('.widget__hall-img-wrapper').forEach((wrapper, index) => {
  const id = Number(wrapper.dataset.id) || index + 1;
  const hallGroup = halls.filter(h => h.id === id || h.id % 5 === id % 5); // Примерная логика группировки
  const img = wrapper.querySelector('.widget__hall-img');
  const title = wrapper.closest('.widget__hall__card').querySelector('.booking-title');
  const left = wrapper.querySelector('.arrow--left');
  const right = wrapper.querySelector('.arrow--right');

  let current = 0;
  let interval;

  function show(i) {
    current = (i + hallGroup.length) % hallGroup.length;
    img.src = hallGroup[current].image;
    title.textContent = hallGroup[current].name;
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

 const popup = document.getElementById('app');

document.querySelectorAll('.widget__hall__button').forEach((btn) => {
  btn.addEventListener('click', () => {
   
    popup.classList.remove('hidden');

    if (typeof window.mountApp === 'function') {
      window.mountApp();
    } else {
      console.error("mountApp не определена");
    }
  });
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});

document.querySelector(".mobile__button--book")?.addEventListener("click", () => {
  document.getElementById("app").classList.remove("hidden");

  // если у тебя mountApp() экспортируется глобально:
  if (typeof window.mountApp === "function") {
    window.mountApp();
  }
});