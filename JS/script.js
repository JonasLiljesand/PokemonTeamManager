import { sample } from "./pokemonSample.js"



const teamViewbtn = document.getElementById('teamViewButton')
const searchViewBtn = document.getElementById('searchViewButton')
const viewTeamSec = document.getElementById('activeTeamSection')
const viewSearchAndBenchSec = document.getElementById('searchAndBench')
const pokemonDataTemp =document.getElementById('pokemonDataTemp')
const searchField = document.getElementById('pokemonSearchByName')
let pokedex = document.getElementById('pokemonName')
let search = ''

let pokemon = []

teamViewbtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'none'
	viewTeamSec.style.display = 'block'
})

searchViewBtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'block'
	viewTeamSec.style.display = 'none'})






fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(resp => resp.json())
	  .then(data => {
		pokemon = data.results.map(pokemon => {
		const pokeListItem = pokemonDataTemp.content.cloneNode(true).children[0]

		// const searchListName =
		// console.log(pokemon.name);
		return {name: pokemon.name}



		})
	  })

searchField.addEventListener("input", e => {
	const value = e.target.value.toLowerCase()

	pokemon.forEach(pokemon => {
		const matchesSearch = pokemon.name.includes(value)
		console.log(matchesSearch.name);
	})

})