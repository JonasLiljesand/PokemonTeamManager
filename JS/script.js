import { sample } from "./pokemonSample.js"



const teamViewbtn = document.getElementById('teamViewButton')
const searchViewBtn = document.getElementById('searchViewButton')
const viewTeamSec = document.getElementById('activeTeamSection')
const viewSearchAndBenchSec = document.getElementById('searchAndBench')
let pokedex = document.getElementById('pokedex')
let search = ''

teamViewbtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'none'
	viewTeamSec.style.display = 'block'
})

searchViewBtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'block'
	viewTeamSec.style.display = 'none'


async function searchPokemon() {
	// const Name = document.getElementById('pokedex')

	const resp = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')


console.log(resp.value);

}

searchPokemon()


	})


function match() {
	const pokeMatch = sample.results.name.filter(x => x.toLowerCase().includes(search))
	console.log(pokeMatch);

}
