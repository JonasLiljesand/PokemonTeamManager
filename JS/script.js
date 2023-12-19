import { sample } from "./pokemonSample.js"



const teamViewbtn = document.getElementById('teamViewButton')
const searchViewBtn = document.getElementById('searchViewButton')
const viewTeamSec = document.getElementById('activeTeamSection')
const viewSearchAndBenchSec = document.getElementById('searchAndBench')
const pokemonDataTemp =document.querySelector('pokemonDataTemp')
let pokedex = document.getElementById('pokemonName')
let search = ''

teamViewbtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'none'
	viewTeamSec.style.display = 'block'
})

searchViewBtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'block'
	viewTeamSec.style.display = 'none'})


fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(resp => resp.json()).then(data => {
		data.results.forEach(pokemon => {
		const pokeListItem = pokemonDataTemp.textContent.cloneNode(true).children [0]
		const searchListName =
		console.log(pokemon);
		})
	  })
