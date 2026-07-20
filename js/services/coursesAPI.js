let coursesCache = null;

export async function getCourses() {
  if (coursesCache) {
    return coursesCache;
  }

  const response = await fetch("../data/courses.json");
  const data = await response.json();
  coursesCache = data;

  return data;
}
