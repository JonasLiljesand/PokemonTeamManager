import { sample } from "./pokemonSample.js"



const teamViewbtn = document.getElementById('teamViewButton')
const searchViewBtn = document.getElementById('searchViewButton')
const reservViewBtn = document.getElementById('reservButton')
const viewTeamSec = document.getElementById('activeTeamSection')
const viewSearchAndBenchSec = document.getElementById('searchAndBench')
const viewReservSec = document.getElementById('reservSec')
const searchField = document.getElementById('pokemonSearchByName')
// let nameField = document.getElementById('nameField')
const resultsDiv = document.getElementById("resultsDiv");
const active1 = document.getElementById('active1')
let pokedex = document.getElementById('pokemonName')
const reservList = []
const teamList = []
let search = ''

let pokemon = []
let filterName = []


teamViewbtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'none'
	viewTeamSec.style.display = 'block'
	viewReservSec.style.display = 'none'
})

searchViewBtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'block'
	viewTeamSec.style.display = 'none'
	viewReservSec.style.display = 'none'})

reservViewBtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'none'
	viewTeamSec.style.display = 'none'
	viewReservSec.style.display = 'block'
	})





async function fetchPokemonData() {
    try {
        const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const data = await resp.json();

        const pokePromises = data.results.map(async pokemon => {
            const pokemonResp = await fetch(pokemon.url);
            // const enskildPokemonData = await pokemonResp.json();

            return {
                name: pokemon.name,
                id: pokemon.id,
                // image: pokemon.sprites.front_default

			// 	 sprites: {
            // front_default: sprites.front_default,
        	// 	},
            };
        });

        const pokemonData = await Promise.all(pokePromises);
        return pokemonData;
    } catch (error) {
        console.error('error fetching data', error);
    }
}

async function getPokemon() {
    try {
        const pokemonData = await fetchPokemonData();
        pokemon = pokemonData;
        console.log(pokemon.length);
    } catch (error) {
        console.error('error getting Pokemon', error);
    }
}

getPokemon();

// function egetNamn(valdPokemon) {
// 	console.log("egetNamn blir callat");
// 	console.log("nameField.value:", nameField.value);
// 	if (nameField.value.length >= 1) {
// 		valdPokemon.specialNamn = nameField.value
// 		console.log(valdPokemon.specialNamn);
// 	}
// }



searchField.addEventListener("input", e => {
	const value = e.target.value.toLowerCase();
	filterName = pokemon.filter(x => x.name.includes(value))

	resultsDiv.innerHTML = "";
	//TODO: begränsa antalet matchningar till ~10-15
	filterName.forEach(pokemon => {
		const pokeListItem = document.createElement('div');
		pokeListItem.textContent = pokemon.name + pokemon.id;

		// const pokeImage = document.createElement('img')
		// pokeImage = pokemon.image
		const nameField = document.createElement('input',)
		nameField.placeholder = `Namnge din ${pokemon.name}`
		const addBtn = document.createElement('button')
		addBtn.textContent = 'lägg till i lag'
		addBtn.addEventListener("click", () => {
			if (nameField.value.length >= 1) {
					console.log("nameField.value:", nameField.value);
					pokemon.specialNamn = nameField.value
					console.log(pokemon.specialNamn);
				}
				// teamList.push(pokemon)
				addToTeam(pokemon)
				console.log(teamList);
			})


		// pokeListItem.appendChild(pokeImage)
		pokeListItem.appendChild(nameField)
		pokeListItem.appendChild(addBtn)
		resultsDiv.appendChild(pokeListItem)

	})

})



// console.log("Filter Name Length:", filterName.length);
// searchField.addEventListener("keydown", enter => {
// 	if(enter.key === "Enter" && filterName.length === 1) {
// 		if(nameField.value !== '' ) {
// 			filterName[0].nameField = nameField.value;
// 		}
// 		// console.log("test");
// 		teamList.push(filterName)
// 		console.log(teamList.length);
// 		// console.log(teamList[0].nameField)
// 		// console.log([]);
// 		addToTeam()
// 	}

// })



function addToTeam(valdPokemon) {
	if(teamList.length < 3) {
	teamList.push(valdPokemon)
	} else {
		reservList.push(valdPokemon)
		console.log(reservList);
	}
}