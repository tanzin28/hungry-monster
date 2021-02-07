const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');

// event Handler /
searchBtn.addEventListener('click', getMealList);


// functions of get meal //
function getMealList() {
    let searchInputText = document.getElementById('search-input').value;
    // console.log(searchInputText);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                mealList.innerHTML = '';
                data.meals.forEach(meal => {
                    const mealItem = document.createElement('div');
                    mealItem.setAttribute('class', 'meal-item');
                    mealItem.innerHTML = `
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="meal">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                    </div>
                    `
                    mealList.appendChild(mealItem);
                });
                loadMeal();

                mealList.classList.remove('noResult');
            } else {
                mealList.innerHTML = "No Mill found as per your request. Sorry!!"
                mealList.classList.add('noResult');
            }

        });
}

function loadMeal() {
    const mealDetails = document.querySelectorAll(".meal-item");
    for (let i = 0; i < mealDetails.length; i++) {
        const food = mealDetails[i];
        food.addEventListener('click', function () {
            const descAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s=${food.innerText}`;
            const ingredient = document.getElementById('ingredient');
            fetch(descAPI)
                .then(response => response.json())
                .then(data => {
                    const listItem = document.createElement('li');
                    document.getElementById("get-name").innerText = data.meals[0].strMeal;

                    listItem.innerText = data.meals[0].strIngredient1;
                    listItem.innerText += data.meals[0].strIngredient2;
                    listItem.innerText += data.meals[0].strIngredient3;
                    ingredient.appendChild(listItem);

                    document.getElementById('show-image').src = data.meals[0].strMealThumb;
                })
            document.getElementById('meal-details').classList.remove('d-none');
        })
    }
}