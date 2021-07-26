const getData = (searchName) => {
  const API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`;
  fetch(API)
    .then((res) => res.json())
    .then((data) => displayMealData(data));
};

const searchFood = () => {
  const searchName = document.getElementById("search-meal").value;
  getData(searchName);
  document.getElementById("search-meal").value = "";
  document.getElementById("product-area").innerHTML = "";
};

const displayMealData = (data) => {
  data.meals.map((item) => {
    const mealName = item.strMeal;
    const mealThumb = item.strMealThumb;
    const productDisplay = document.getElementById("product-area");
    const mealCard = document.createElement("div");
    mealCard.innerHTML = `
    <div id="meal-card" onclick="showDetails('${mealName}')">
        <div id="food-icon">
            <img src="${mealThumb}">
        </div>
            <h3 id="food-name">${mealName}</h3>
    </div>
    `;
    productDisplay.appendChild(mealCard);
  });
};

const showDetails = (name) => {
  const API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      const item = data.meals[0];
      const {
        strMeal,
        strMealThumb,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
      } = item;
      const mealItem = document.createElement("div");
      mealItem.innerHTML = `
      <div id="card-details">
          <div><img src="${strMealThumb}"></div>
          <div id="meal-info">
          <h2>${strMeal}</h2>
          <h3> Ingredient <h3>
          <ul>
              <li>${strIngredient1}</li>
              <li>${strIngredient2}</li>
              <li>${strIngredient3}</li>
              <li>${strIngredient4}</li>
              <li>${strIngredient5}</li>
              <li>${strIngredient6}</li>
          </ul>
          </div>
      
      </div>
      
      `;
      document.getElementById("product-details").appendChild(mealItem);
    });

  document.getElementById("main-area").style.display = "none";
  document.getElementById("product-details").style.display = "block";
};

const displayChange = () => {
  document.getElementById("main-area").style.display = "block";
  document.getElementById("product-details").style.display = "none";
};
