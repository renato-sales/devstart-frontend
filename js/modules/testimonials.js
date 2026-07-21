import { comments } from "../../data/comments.js";
import { getRandomUsers } from "../services/randomUserAPI.js";
import { formatDate } from "../utils/formatDate.js";

export async function loadTestimonials(listTestimonals) {
  const data = await getRandomUsers();
  const quantity = window.innerWidth <= 768 ? 4 : 3;
  const testimonials = data.slice(0, quantity);

  printTestimonials(testimonials, listTestimonals);
}

export function printTestimonials(testimonials, listTestimonals) {
  listTestimonals.innerHTML = "";

  testimonials.forEach((testimonial) => {
    const date = formatDate(testimonial.registered.date);
    const randomComment = comments[Math.floor(Math.random() * comments.length)];

    listTestimonals.innerHTML += `
      <article class="section-testimonials__cards__card">
        <div class="section-testimonials__cards__card__content">
          <img src="${testimonial.picture.medium}"/>
          <div class="section-testimonials__cards__card__content__texts">
            <h3>${testimonial.name.first} ${testimonial.name.last}</h3>
            <span>${testimonial.login.username}</span>
            <div>
              <img src="assets/star-solid-full.svg"/>
              <img src="assets/star-solid-full.svg"/>
              <img src="assets/star-solid-full.svg"/>
              <img src="assets/star-solid-full.svg"/>
              <img src="assets/star-solid-full.svg"/>
            </div>
          </div>
        </div>
        <div class="section-testimonials__cards__card__content">
          <p>${randomComment}</p>
        </div>
        <span>${date}</span>
      </article>
    `;
  });
}
