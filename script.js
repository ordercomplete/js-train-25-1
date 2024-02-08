// Завдання 1
async function getData() {
  try {
    const data = await fetchFakeData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Завдання 2
async function logRandomNumberAfterSeconds(seconds) {
  try {
    const randomNumber = await getRandomNumberAfterSeconds(seconds);
    console.log(randomNumber);
  } catch (error) {
    console.error(error);
  }
}

function getRandomNumberAfterSeconds(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, seconds * 1000);
  });
}

// Завдання 3
async function getDataFromUrl(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Завдання 4
async function postDataWithAuth(url, data, authToken) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Завдання 5
async function* asyncGenerator() {
  let i = 0;
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield i++;
  }
}

async function printFiveItems() {
  const gen = asyncGenerator();
  for await (const value of gen) {
    console.log(value);
    if (value === 4) break;
  }
}

// Завдання 6
async function* gatherData() {
  try {
    const dbData = await getDataFromDB();
    yield dbData;
    const apiData = await getDataFromAPI();
    yield apiData;
    const cacheData = await getDataFromCache();
    yield cacheData;
  } catch (error) {
    console.error(error);
  }
}

async function displayData() {
  const generator = gatherData();
  for await (const value of generator) {
    console.log(value);
  }
}
// Функція, яка симулює витягування даних з бази даних
async function getDataFromDB() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Дані з бази даних");
    }, 1000);
  });
}

// Функція, яка симулює отримання даних з API
async function getDataFromAPI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Дані з API");
    }, 800);
  });
}

// Функція, яка симулює отримання даних з кешу
async function getDataFromCache() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Дані з кешу");
    }, 600);
  });
}

// Завдання 7
function* countdownGenerator(start) {
  let count = start;
  while (count >= 0) {
    yield count;
    count--;
  }
}

function executeCountdown() {
  const countdown = countdownGenerator(5);
  let nextValue = countdown.next();
  while (!nextValue.done) {
    console.log(nextValue.value);
    nextValue = countdown.next();
  }
}

// Виконання завдань
console.log("Завдання: 1 ==============================");
function fetchFakeData() {
  const fakeData = {
    name: "John",
    age: 30,
  };
  return Promise.resolve(fakeData);
}
getData().then(() => {
  console.log("Завдання: 2 ==============================");
  logRandomNumberAfterSeconds().then(() => {
    console.log("Завдання: 3 ==============================");
    getDataFromUrl("https://swapi.dev/api/people/1").then(() => {
      console.log("Завдання: 4 ==============================");
      postDataWithAuth(
        "https://jsonplaceholder.typicode.com/posts",
        { title: "foo", body: "bar", userId: 1 },
        "Bearer your-token"
      ).then(() => {
        console.log("Завдання: 5 ==============================");
        printFiveItems().then(() => {
          console.log("Завдання: 6 ==============================");

          displayData().then(() => {
            console.log("Завдання: 7 ==============================");
            executeCountdown();
          });
        });
      });
    });
  });
});
