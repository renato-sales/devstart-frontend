import {
  exploreCourses,
  filterSearchCourses,
  loadCourses,
  printAllCourses,
  searchCourses,
} from "./modules/courses.js";
import { renderCompanyMap } from "./modules/map.js";
import { calculateRoute } from "./modules/route.js";
import { loadTestimonials } from "./modules/testimonials.js";

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
const btnCalculateCep = document.querySelector("#btnCalculateCep");

document.addEventListener("DOMContentLoaded", () => {
  loadCourses(listCourses);
});
btnSearch.addEventListener("click", () => searchCourses(input, listCourses));

allCourses.addEventListener("click", () => printAllCourses(listCourses));

btnExploreCourses.addEventListener("click", () =>
  exploreCourses(sectionExploreCourses)
);

selectOption.addEventListener("change", () =>
  filterSearchCourses(selectOption, listCourses)
);

document.addEventListener("DOMContentLoaded", () => {
  loadTestimonials(listTestimonals);
});

btnUpdateTestimonials.addEventListener("click", () => {
  loadTestimonials(listTestimonals);
});

btnCalculateCep.addEventListener("click", calculateRoute);

window.addEventListener("DOMContentLoaded", () => {
  renderCompanyMap();
});
