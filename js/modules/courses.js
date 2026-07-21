import { getCourses } from "../services/coursesAPI.js";

export function exploreCourses(sectionExploreCourses) {
  sectionExploreCourses.scrollIntoView({
    behavior: "smooth",
  });
}

export async function searchCourses(input, listCourses) {
  const textInput = input.value.toLowerCase();
  const data = await getCourses();

  const filterCourses = data.filter((course) =>
    course.titulo.toLowerCase().includes(textInput)
  );

  if (textInput === "") {
    alert("Digite um curso válido");
    return;
  } else {
    printCourses(filterCourses, listCourses);
  }
}

export async function loadCourses(listCourses) {
  const data = await getCourses();
  let quantity = 0;

  if (window.innerWidth <= 480) {
    quantity = 2;
  } else if (window.innerWidth <= 768) {
    quantity = 4;
  } else {
    quantity = 3;
  }

  const courses = data.slice(0, quantity);
  printCourses(courses, listCourses);
}

export function printCourses(courses, listCourses) {
  listCourses.innerHTML = "";

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
            <div class="section-courses__cards__card__info__specific__time-level">
              <img src="assets/clock-regular-full.svg"/>
              <span>${course.duracao}</span>
            </div>

            <div class="section-courses__cards__card__info__specific__time-level">
              <img src="assets/signal-solid-full.svg"/>
              <span>${course.nivel}</span>
            </div>

            <div class="section-courses__cards__card__info__specific__time-level">
              <img src="assets/star-solid-full.svg"/>
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

export async function printAllCourses(listCourses) {
  const data = await getCourses();
  printCourses(data, listCourses);
}

export async function filterSearchCourses(selectOption, listCourses) {
  const filterLevel = selectOption.value.toLowerCase();
  const data = await getCourses();

  if (selectOption.value === "Todos") {
    return printCourses(data, listCourses);
  }

  const filterCourses = data.filter((course) =>
    course.nivel.toLowerCase().includes(filterLevel)
  );

  printCourses(filterCourses, listCourses);
}
