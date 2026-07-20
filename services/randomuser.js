export async function getRandomUsers() {
  const response = await fetch("https://randomuser.me/api/?results=20&nat=br");
  const data = await response.json();
  return data.results;
}
