import { sample } from "./pokemonSample.js"



const teamViewbtn = document.getElementById('teamViewButton')
const searchViewBtn = document.getElementById('searchViewButton')
const reservViewBtn = document.getElementById('reservButton')
const viewTeamSec = document.getElementById('activeTeamSection')
const viewSearchAndBenchSec = document.getElementById('searchAndBench')
const viewReservSec = document.getElementById('reservSec')
const pokemonDataTemp =document.getElementById('pokemonDataTemp')
const searchField = document.getElementById('pokemonSearchByName')
const resultsDiv = document.getElementById("resultsDiv");
let pokedex = document.getElementById('pokemonName')
const reservList = []
let search = ''

let pokemon = []
let filterName = {}

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






fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(resp => resp.json())
	  .then(data => {
		pokemon = data.results.map(pokemon => {
		// const pokeListItem = pokemonDataTemp.content.cloneNode(true).children[0]

		// // const searchListName =
		// // console.log(pokemon.name);
		return {name: pokemon.name}



		})
	  })
	  .catch(error => console.error('error fetching data', error))

searchField.addEventListener("input", e => {
	const value = e.target.value.toLowerCase();
	const filterName = pokemon.filter(x => x.name.includes(value))

	resultsDiv.innerHTML = "";

	filterName.forEach(pokemon => {
		const pokeListItem = document.createElement('div');
		pokeListItem.textContent = pokemon.name;
		resultsDiv.appendChild(pokeListItem)
	})

})

searchField.addEventListener("keyup", p => {
	if(p.key === "Enter" || filterName.length === 1) {
		reservList.push(filterName)
		console.log(reservList);
	}

})
