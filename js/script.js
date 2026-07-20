import { comments } from "../data/comments.js";
import { getRandomUsers } from "../services/randomuser.js";

loadCourses();
loadTestimonials();
const input = document.querySelector("#searchCourse");
const listCourses = document.querySelector("#listCourses");
const btnSearch = document.querySelector("#btnSearch");
const allCourses = document.querySelector(
  "#section-courses__info__all-courses"
);
const btnExploreCourses = document.querySelector("#btnExploreCourses");
const sectionExploreCourses = document.querySelector(
  "#section-explore-courses"
);
const selectOption = document.querySelector("#level");
const listTestimonals = document.querySelector("#listTestimonials");
const btnUpdateTestimonials = document.querySelector(
  "#section-testimonials__update__testimonials"
);

function selectOptionChange() {
  const optionSelected = selectOption.value;
}

function exploreCourses() {
  sectionExploreCourses.scrollIntoView({
    behavior: "smooth",
  });
}

async function searchCourses() {
  const textInput = input.value.toLowerCase();
  const response = await fetch("../data/courses.json");
  const data = await response.json();
  const filterCourses = data.filter((course) =>
    course.titulo.toLowerCase().includes(textInput)
  );

  if (textInput === "") {
    listCourses.innerHTML = "";
    listCourses.innerHTML += `<span class="section-courses__content__search__font-color-search_failure">Curso não encontrado.</span>`;
  } else {
    printCourses(filterCourses);
  }
}

async function loadCourses() {
  const response = await fetch("../data/courses.json");
  const data = await response.json();
  const courses = data.slice(0, 3);
  printCourses(courses);
}

function printCourses(courses) {
  listCourses.innerHTML = "";

  if (courses.length === 0) {
    listCourses.innerHTML += `<span class="section-courses__content__search__font-color-search_failure">O curso que você digitou não foi encontrado. Tente novamente!</span>`;
  } else {
    courses.forEach((course) => {
      listCourses.innerHTML += `
        <article class="section-courses__cards__card">
          <div class="section-courses__cards__card__content__img">
            <img src="${course.image}"/>
          </div>
          <div class="section-courses__cards__card__info">
            <h3>${course.titulo}</h3>
            <p>${course.descricao}</p>
            <div class="section-courses__cards__card__info__specific">
              <div
              class="section-courses__cards__card__info__specific__time-level">
                <img src="../assets/main/section-courses/clock-regular-full.svg"/>
                <span>${course.duracao}</span>
              </div>
              <div class="section-courses__cards__card__info__specific__time-level">
                <img src="../assets/main/section-courses/signal-solid-full.svg"/>
                <span>${course.nivel}</span>
              </div>
              <div class="section-courses__cards__card__info__specific__time-level">
                <img src="../assets/main/section-courses/star-solid-full.svg"/>
                <span>${course.classificacao}</span>
              </div>
            </div>
            <div class="section-courses__cards__card__info__price-button">
              <span>${course.preco}</span>
              <a href="#">Ver curso</a>
            </div>
          </div>
        </article>
      `;
    });
  }
}

async function printAllCourses() {
  const response = await fetch("../data/courses.json");
  const data = await response.json();
  printCourses(data);
}

async function filterSearchCourses() {
  const filterLevel = selectOption.value.toLowerCase();
  const response = await fetch("../data/courses.json");
  const data = await response.json();
  const filterCourses = data.filter((course) =>
    course.nivel.toLowerCase().includes(filterLevel)
  );
  listCourses.innerHTML = "";

  if (selectOption.value == "Todos") {
    printAllCourses();
  } else {
    printCourses(filterCourses);
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date
    .toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
}

async function loadTestimonials() {
  const data = await getRandomUsers();
  const testimonials = data.slice(0, 3);
  printTestimonials(testimonials);
}

function printTestimonials(testimonials) {
  listTestimonals.innerHTML = "";

  testimonials.forEach((testimonial) => {
    const dataFormatada = formatDate(testimonial.registered.date);
    const radomComment = comments[Math.floor(Math.random() * comments.length)];

    listTestimonals.innerHTML += `
      <article class="section-testimonials__cards__card">
        <div class="section-testimonials__cards__card__content">
          <img src="${testimonial.picture.medium}"/>
          <div class="section-testimonials__cards__card__content__texts">
            <h3>${testimonial.name.first} ${testimonial.name.last}</h3>
            <span>${testimonial.login.username}</span>
            <div>
              <img src="../assets/main/section-courses/star-solid-full.svg" alt="image star"
              />
              <img src="../assets/main/section-courses/star-solid-full.svg" alt="image star"
              />
              <img src="../assets/main/section-courses/star-solid-full.svg" alt="image star"
              />
              <img src="../assets/main/section-courses/star-solid-full.svg" alt="image star"
              />
              <img src="../assets/main/section-courses/star-solid-full.svg" alt="image star"
              />
            </div>
          </div>
        </div>
        <div class="section-testimonials__cards__card__content">
          <p>${radomComment}
          </p>
        </div>
        <span>${dataFormatada}</span>
      </article>      
    `;
  });
}

btnSearch.addEventListener("click", searchCourses);

allCourses.addEventListener("click", printAllCourses);

btnExploreCourses.addEventListener("click", exploreCourses);

selectOption.addEventListener("change", selectOptionChange);

selectOption.addEventListener("change", filterSearchCourses);

btnUpdateTestimonials.addEventListener("click", loadTestimonials);
