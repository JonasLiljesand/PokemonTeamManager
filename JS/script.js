import { sample } from "./pokemonSample.js"



const teamViewbtn = document.getElementById('teamViewButton')
const searchViewBtn = document.getElementById('searchViewButton')
const reservViewBtn = document.getElementById('reservButton')
const viewTeamSec = document.getElementById('activeTeamSection')
const viewSearchAndBenchSec = document.getElementById('searchAndBench')
const viewReservSec = document.getElementById('reservSec')
const searchField = document.getElementById('pokemonSearchByName')
// const nameField = document.getElementById('nameField')
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



// 	async function fetchPokemonData() {
//   try {
//     const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
//     const data = await response.json();

//     const pokemonList = data.results;

//     const pokemonData = await Promise.all(pokemonList.map(async (pokemon) => {
//       const response = await fetch(pokemon.url);
//       const pokemonDetails = await response.json();

//       return {
//         name: pokemonDetails.name,
//         image: pokemonDetails.sprites.front_default,
//       };
//     }));
// 	   console.log(pokemonData);
//   } catch (error) {
//     console.error('Error fetching data', error);
//   }
// }



// fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
//       .then(resp => resp.json())
// 	  .then(data => {
// 		pokemon = data.results.map(pokemon => {
// 		return {name: pokemon.name, id: pokemon.id}
// 		// return {image: pokemon.sprites.front_default}

// 		})

// 	//  pokemon = data.results.map(pokemon => ({
//     //   name: pokemon.name,
//     //   image: pokemon.sprites.front_default
//     // 	}));
// 		console.log(pokemon.length);
// 	  })
// 	  .catch(error => console.error('error fetching data', error))


async function fetchPokemonData() {
    try {
        const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const data = await resp.json();

        const pokePromises = data.results.map(async pokemon => {
            const pokemonResp = await fetch(pokemon.url);
            const pokemon = await pokemonResp.json();

            return {
                name: pokemon.name,
                id: pokemon.id,
                // image: pokemon.sprites.front_default
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

		// pokeListItem.appendChild(pokeImage)
		pokeListItem.appendChild(nameField)
		pokeListItem.appendChild(addBtn)
		resultsDiv.appendChild(pokeListItem)

	})

})


console.log("Filter Name Length:", filterName.length);
searchField.addEventListener("keydown", enter => {
	if(enter.key === "Enter" && filterName.length === 1) {
		if(nameField.value !== '' ) {
			filterName[0].nameField = nameField.value;
		}
		// console.log("test");
		teamList.push(filterName)
		console.log(teamList.length);
		// console.log(teamList[0].nameField)
		// console.log([]);
		addToTeam()
	}

})




// function addToTeam() {
// 	if(active1.innerHTML === '' ) {
// 		document.getElementById('active1').innerHTML = teamList[0].name
// 	}
// }
