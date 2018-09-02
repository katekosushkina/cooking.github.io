function removeCurrentRecipe(){
  $("#currentRecipe").html('');
  $("#currentRecipe").css({'position': 'absolute','z-index': '0', 'height': '0', 'width': '0', 'clear': 'both', 'background-color':'white' });
};

$(document).ready(function(){

  $( "#autocomplete" ).focus();
  $('#autocomplete').autocomplete({
      serviceUrl: 'autocomplete.json',
      minChars: 2,
      delimiter: /(,|;)\s*/,
      maxHeight: 400,
      width: 300,
      zIndex: 9999,
      deferRequestBy: 0,
      params: { country: 'Yes'},
      onSelect: function(data, value){ },
  });
  
  $.ajax({
  url: "https://raw.githubusercontent.com/katekosushkina/cooking.by/master/food.json",
}).done(function(text) {
  let data = JSON.parse(text);
  data.tabs.map((tab, i)=>{
    let foodList = "";
    let activeClass = i===0?'active':'';
    $("#myTab").append(`
      <li class="nav-item">
        <a class="nav-link ${activeClass}" id="home-tab" data-toggle="tab"
        href="#tab${i}" role="tab" aria-controls="home" aria-selected="true">
        ${tab.name}</a>
      </li>`)
    tab.foodList.map((food, j)=>{
      foodList +=
      `<div class="cont" id="cont_${i}_${j}">
        <div class="name"> ${food.name}
          <i class="far fa-heart pic_${i}_${j}"></i> </div>
        <img src="${food.img}" class="foodImg">
      </div>`
    });
    $("#myTabContent").append(
      `<div class="tab-pane fade show ${activeClass}" id="tab${i}" role="tabpanel" aria-labelledby="home-tab">
        ${foodList}
      </div>`)
  });
});

$("body").on('click', ".nav", function(){
  removeCurrentRecipe();
});

$("body").on('click', ".fa-heart", function(){
  $(this).toggleClass('far').toggleClass('fas');
  let clas = $(this).attr("class");
  if ($(this).hasClass('fas')){
    localStorage.setItem(clas, true);
  } else {
    localStorage.removeItem(clas);
  }
})

$("#checkbox").on('click', function(){
  if ($(this).prop("checked")) {
  $(".far").closest('.cont').hide();
} else {
$(".far").closest('.cont').show();
}
})


$("body").on('click', ".foodImg", function(){
  let id = "#"+$(this).parent().attr('id');
  inf = ($(id).html());
  imgSrc = $(this).attr('src');
  $.ajax({
  url: "https://raw.githubusercontent.com/katekosushkina/cooking.by/master/food.json",
}).done(function(text) {
  let data = JSON.parse(text);
  data.tabs.map((tab, i)=>{
    tab.foodList.map((food, j)=>{
      let foodImg = food.img;
      if (imgSrc===foodImg){
            $("#currentRecipe").append(
                `<button type="button" onclick="removeCurrentRecipe()">назад</button>
                ${inf}
                <div class="components"><b>${food.components.join('<br>')}</b>
                </div>
                <div class="recipe" style="border:1px solid black">${food.recipe}
                </div>
                <a href="#top" onclick="window.scrollTo(0,0);return!1;">Наверх</a>`)
                $("#currentRecipe").css({'position': 'absolute','z-index': '999999', 'height': '1000px', 'width': '100%', 'clear': 'both', 'background-color':'white' });
            }
        });
      });
  });

});
});
