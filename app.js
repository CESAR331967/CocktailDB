//$(document).ready(function () {
let id; let imgURL; let title; let valorId; 
function link(index) {
  $(".imagen").hide();
  var url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${index}`
  $.get(url, function (respuesta) {
    console.log(respuesta);
    if(respuesta.drinks===null){
      $('.cantidad').html('sorry, no drinks matched your search');return
    }
    id = respuesta.drinks[0].idDrink;
    imgURL = respuesta.drinks[0].strDrinkThumb;
    title = respuesta.drinks[0].strDrink;
    $(`<div class='car'><img id='${id}' src='${imgURL}'class='img-thumbnail' >
              <h6 class="text-center">${title}</h6></div>`).appendTo('.imagen');
  }); return $(".imagen").show();
}
/////Evento click busqueda Alfabetica
$(".leter").on("click", "span", function () {
  $('.imagen').html('');//Borramos para nueva carga
  $('.cantidad').html('No hay cocktel')//Borramos cantidad
  Alfabetica($(this).text())//Obtenemos caracter y vamos a buscar
});
function Alfabetica(caracter) {
  for (let index = 0; index < array[caracter].length; index++) {//Recorremos todo el arreglo
    link(array[caracter][index])//Con los nombre llamamos a la API
    $('.cantidad').html(index + 1 + ` cockteles con ${caracter}`);//Ponemos la cantidad
  } 
 }
/////evento id
$(".imagen").on("click", "img", function () {
  valorId = $(this).attr('id');
  sessionStorage.setItem("id_", valorId); /*Guardando los datos en el LocalStorage*/
  parent.location = 'drink.html';
});
function miFuncion() {
  var id = sessionStorage.getItem("id_");
  var url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const displayDrink = (data) => {
     const drink = data.drinks[0];
    const { strDrinkThumb: image, strDrink: name, strInstructions: desc } = drink;
    const list = [
      drink.strIngredient1,
      drink.strIngredient2,
      drink.strIngredient3,
      drink.strIngredient4,
      drink.strIngredient5,
      drink.strIngredient6,
      drink.strIngredient7,
      drink.strIngredient8
    ];
    const img = document.querySelector('.drink-img');
    const drinkName = document.querySelector('.drink-name');
    const description = document.querySelector('.drink-desc');
    const ingredients = document.querySelector('.drink-ingredients');
    img.src = image;
    document.title = name;
    drinkName.textContent = name;
    description.textContent = desc;
    ingredients.innerHTML = list
      .map((item) => {
        if (!item) return;
        return `<li><i class="far fa-check-square"></i> ${item}</li>`;
      })
      .join('');
      $('.receta').append(drink.strAlcoholic +" - ");
      if (drink.strMeasure1!== null) {
        $('.receta').append(drink.strMeasure1+" ");
      }
      if (drink.strMeasure2!== null) {
        $('.receta').append(drink.strMeasure2+" ");
      }
      if (drink.strMeasure3!== null) {
        $('.receta').append(drink.strMeasure3+" ");
      }
      if (drink.strMeasure4!== null) {
        $('.receta').append(drink.strMeasure4+" ");
      }
      if (drink.strMeasure5!== null) {
        $('.receta').append(drink.strMeasure5+" ");
      }
      if (drink.strMeasure6!== null) {
        $('.receta').append(drink.strMeasure6+" ");
      }
      if (drink.strMeasure6!== null) {
        $('.receta').append(drink.strMeasure7+" ");
      }
  };
  $.get(url, function (respuesta) {
      displayDrink(respuesta)
   })
   localStorage.removeItem("id");
}

$(".text-search" ).keyup(function(e) {
   var str = $("#myInput").val();
   $('.cantidad').html('Busque por Nombre o Caracter');
   $('.imagen').html('');
   link(str)
});
