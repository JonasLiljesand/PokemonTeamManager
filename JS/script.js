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



searchField.addEventListener("input", e => {
	const value = e.target.value
	console.log(value);
})


fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(resp => resp.json())
	  .then(data => {
		// pokemon = data.map{
		data.results.forEach(pokemon => {
		const pokeListItem = pokemonDataTemp.content.cloneNode(true).children[0]
		const listItemName = pokemon.name
		// const searchListName =
		console.log(listItemName);
		})
	  })
