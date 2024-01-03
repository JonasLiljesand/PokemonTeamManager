import { sample } from "./pokemonSample.js"



const teamViewbtn = document.getElementById('teamViewButton')
const searchViewBtn = document.getElementById('searchViewButton')
const reservViewBtn = document.getElementById('reservButton')
const viewTeamSec = document.getElementById('activeTeamSection')
const TeamSizeCounter = document.getElementById('teamSizeCounterSec')
const viewSearchAndBenchSec = document.getElementById('searchAndBench')
const viewReservSec = document.getElementById('reservSec')
const searchField = document.getElementById('pokemonSearchByName')
// let nameField = document.getElementById('nameField')
const resultsDiv = document.getElementById("resultsDiv");
const active1 = document.getElementById('active1')
let pokedex = document.getElementById('pokemonName')
// const pokemon1 = document.getElementById('active1')
// const pokemon2 = document.getElementById('active2')
// const pokemon3 = document.getElementById('active3')
const reservListSec = document.getElementById('reservListaSec')

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

// reservViewBtn.addEventListener("click", () => {
// 	viewSearchAndBenchSec.style.display = 'none'
// 	viewTeamSec.style.display = 'none'
// 	viewReservSec.style.display = 'block'
// 	})





async function fetchPokemonData() {
    try {
        const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const data = await resp.json();

        const pokePromises = data.results.map(async pokemon => {
            const pokemonResp = await fetch(pokemon.url);
            const enskildPokemonData = await pokemonResp.json();

            return {
                name: enskildPokemonData.name,
                id: enskildPokemonData.id,
                image: enskildPokemonData.sprites.front_default

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
		pokeListItem.textContent = pokemon.name;

		// const pokeImage = document.createElement('img')
		// pokeImage = pokemon.image
		const nameField = document.createElement('input',)
		nameField.placeholder = `Namnge din ${pokemon.name}`

		nameField.style.width = '10em'


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



//Lägger till pokemon i aktivts team om plats finnns, pushar till reserv annars
function addToTeam(valdPokemon) {
	if(teamList.length < 3) {
	teamList.push(valdPokemon)
	console.log("längd på teamlista", + teamList.length);
	visaTeam()
	TeamSizeCounter.innerHTML = `<p>${teamList.length}/3</p>`
	} else {
		createAndAddToReservList()
	}
}

function visaTeam() {
	const pokemon1 = document.getElementById('active1')
	const pokemon2 = document.getElementById('active2')
	const pokemon3 = document.getElementById('active3')

if(teamList.length > 0) {
	console.log("nammnet på pokemonen är", teamList[0].name);
	const pokeImgHTML = `<img src="${teamList[0].image}"/>`
	const SpecialnameHTML = `<p>${teamList[0].specialNamn}</p>`
	const pokemonNameHTML = `<p>${teamList[0].name}</p>`
	if(teamList[0].specialNamn !== undefined) {
	pokemon1.innerHTML = pokeImgHTML + SpecialnameHTML + pokemonNameHTML
	} else {
		pokemon1.innerHTML = pokeImgHTML + pokemonNameHTML
	}
	} else {
		pokemon1.innerHTML = '';
	}

	if (teamList.length > 1) {

	console.log("nammnet på pokemonen är", teamList[1].name);
	const pokeImgHTML = `<img src="${teamList[1].image}"/>`
	const SpecialnameHTML = `<p>${teamList[1].specialNamn}</p>`
	const pokemonNameHTML = `<p>${teamList[1].name}</p>`
	if(teamList[1].specialNamn !== undefined) {
	pokemon2.innerHTML = pokeImgHTML + SpecialnameHTML + pokemonNameHTML
	} else {
		pokemon2.innerHTML = pokeImgHTML + pokemonNameHTML
	}
	} else {
		pokemon2.innerHTML = '';
	}

	if (teamList.length > 2) {

	console.log("nammnet på pokemonen är", teamList[2].name);
	const pokeImgHTML = `<img src="${teamList[2].image}"/>`
	const SpecialnameHTML = `<p>${teamList[2].specialNamn}</p>`
	const pokemonNameHTML = `<p>${teamList[2].name}</p>`
	if(teamList[2].specialNamn !== undefined) {
	pokemon3.innerHTML = pokeImgHTML + SpecialnameHTML + pokemonNameHTML
	} else {
		pokemon3.innerHTML = pokeImgHTML + pokemonNameHTML
	}
	} else {
		pokemon3.innerHTML = '';
	}
}

function createAndAddToReservList() {
	reservList.push(valdPokemon)
		console.log(reservList);

}