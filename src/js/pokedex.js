// "fetch" é uma paradinha q cê usa pra levar ao site/ buscar o conteudo no proprio site


const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonNext = document.querySelector(".btn-next");
const buttonPrev = document.querySelector(".btn-prev");

let searchPokemon = 1;

//CONECTAR E CAPTURAR AS INFORMAÇÕES DA POKE API

const fetchPokemon = async (pokemon) => {
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
    
        const data = await APIResponse.json();
    
        return data;
    } 

};

const renderPokemon = async (pokemon) => {

    pokemonName.textContent = "Loading...";
    pokemonNumber.textContent = "⌛";
    pokemonImage.src = "https://i.imgur.com/aMz1Qtu.gif";

    const data = await fetchPokemon(pokemon);
    
    console.log(data);


    if (data) {
        //CASO TUDO DÊ CERTO
        
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        pokemonImage.style.width = "25%";
        pokemonNumber.textContent = data.id;
        pokemonName.textContent = data.name;
        input.value = "";
        searchPokemon = data.id;

    } else {
        //CASO DÊ ERRADO

        pokemonImage.src = "https://i.pinimg.com/originals/47/14/28/47142839defcb4270fffff88cf9f082b.gif";
        pokemonNumber.textContent = "";
        pokemonName.textContent = "Not found :(";
        pokemonImage.style.width = "30%";

    }

};

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

buttonPrev.addEventListener("click", () => {
    
    if (searchPokemon > 1) {

        searchPokemon -= 1;
        renderPokemon(searchPokemon);   
    }
});

buttonNext.addEventListener("click", () => {

    searchPokemon += 1;

    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

