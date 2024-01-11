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
const pokemon1 = document.getElementById('active1')
const pokemon2 = document.getElementById('active2')
const pokemon3 = document.getElementById('active3')
const reservListSec = document.getElementById('reservListaSec')
const addResBtn = document.createElement('button')


let reservList = []
let teamList = []
let pokemon = []
let filterName = []


teamViewbtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'none'
	viewTeamSec.style.display = 'block'
})

searchViewBtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'block'
	viewTeamSec.style.display = 'none'
})


async function fetchPokemonData() {
    try {
        const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const data = await resp.json();

        const pokePromises = data.results.map(async pokemon => {
            const pokemonResp = await fetch(pokemon.url)
            const enskildPokemonData = await pokemonResp.json()

            return {
                name: enskildPokemonData.name,
                id: enskildPokemonData.id,
                image: enskildPokemonData.sprites.front_default

            };
        });

        const pokemonData = await Promise.all(pokePromises)
        return pokemonData;
    } catch (error) {
        console.error('error fetching data', error)
    }
}

async function getPokemon() {
    try {
        const pokemonData = await fetchPokemonData();
        // pokemon = pokemonData;
		pokemon.push(...pokemonData);
        console.log(pokemon.length);

    } catch (error) {
        console.error('error getting Pokemon', error);
    }

}



getPokemon();




searchField.addEventListener("input", e => {
	const value = e.target.value.toLowerCase();
	filterName = pokemon.filter(x => x.name.startsWith(value))



	resultsDiv.innerHTML = "";
	//TODO: begränsa antalet matchningar till ~10-15
	filterName.forEach(pokemon => {
		const pokeListItem = document.createElement('div');
		pokeListItem.textContent = pokemon.name;

		const nameField = document.createElement('input',)
		nameField.placeholder = `Namnge din ${pokemon.name}`

		nameField.style.width = '10em'


		const addBtn = document.createElement('button')
		addBtn.textContent = 'lägg till i lag'
		addBtn.addEventListener("click", () => {

			const kopia = { ...pokemon}

				// alla pokemons med samma specialNamn kickas om en kickas, TODO: Tillåt inte att flera heter samma
				if (nameField.value.length !== '') {
						console.log("nameField.value:", nameField.value);
						kopia.specialNamn = nameField.value
						nameField.value = ''
						console.log(kopia.specialNamn);




					} else {

					teamList.push(pokemon)

					}
					addToTeam(kopia)
					addMsg.style.display = 'inline'
					// addMsg.classList.add('fade.out')
					console.log(teamList);

				})
		const addMsg = document.createElement('p')
		addMsg.id = 'addMsg'
		addMsg.textContent = 'Fångad!'
		addMsg.style.display = 'none'


		pokeListItem.appendChild(nameField)
		pokeListItem.appendChild(addBtn)
		pokeListItem.appendChild(addMsg)
		resultsDiv.appendChild(pokeListItem)

		pokeListItem.classList.add('boxSection')
		pokeListItem.id = 'pokeListItem'

		addBtn.id = 'addBtn'


		})

})



//Lägger till pokemon i aktivts team om plats finnns, pushar till reserv annars
function addToTeam(valdPokemon) {
	// goerUnik(valdPokemon)
	if(teamList.length < 3) {

	teamList.push(valdPokemon)
	console.log("längd på teamlista", + teamList.length);
	visaTeam()
	teamSize()
	CheckTeamBox()

	} else {
		createAndAddToReservList(valdPokemon)
	}
}

function visaTeam() {
console.log(teamList);

if(teamList.length > 0) {
	console.log("nammnet på pokemonen är", teamList[0].name);
	const pokeImgHTML = `<img src="${teamList[0].image}"/>`
	const SpecialnameHTML = `<p>${teamList[0].specialNamn}</p>`
	const pokemonNameHTML = `<p>${teamList[0].name}</p>`
	if(teamList[0].specialNamn !== undefined) {
	pokemon1.innerHTML = pokeImgHTML + SpecialnameHTML + pokemonNameHTML;
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

	if(pokemon1.innerHTML !== '') {
		pokemon1.appendChild(kickBtnFun(teamList[0]))
	}
	if(pokemon2.innerHTML !== '') {
		pokemon2.appendChild(kickBtnFun(teamList[1]))
	}
	if(pokemon3.innerHTML !== '') {
		pokemon3.appendChild(kickBtnFun(teamList[2]))
	}

}



function createAndAddToReservList(reservPokemon) {
	// goerUnik(reservPokemon)
	reservList.push(reservPokemon)
	console.log(reservList.length);

	let reservUl = document.createElement("ul")





		if(pokemon.specialNamn !== undefined) {
	reservUl.innerHTML = reservPokemon.specialNamn  +' '+ reservPokemon.name
	} else {
		reservUl.innerHTML = (pokeImgHTML = `<img src="${reservPokemon.image}"/>`), reservPokemon.name
	}


	addResBtn.textContent = 'Lägg till i lag'
	reservListSec.appendChild(reservUl)
	// reservul.appendChild(addResBtn)


}

function kickBtnFun(pokemon2Kick) {
	const kickBtn = document.createElement('button')
		kickBtn.textContent = 'Ta bort från lag'
		kickBtn.addEventListener("click", () => {
			if(pokemon2Kick.hasOwnProperty('specialNamn') && pokemon2Kick.specialNamn !== '' ) {
			teamList = teamList.filter( pokemon => pokemon.specialNamn !== pokemon2Kick.specialNamn)
			console.log("kickad via specialnamn");
			} else {
				teamList = teamList.filter( pokemon => pokemon.name !== pokemon2Kick.name)
				console.log("kickad via namn");
			}

				console.log(teamList);
				visaTeam()
				teamSize()
				CheckTeamBox()

			})

		return kickBtn

}

function teamSize() {
	TeamSizeCounter.innerHTML = `<p>${teamList.length}/3</p>`
}


function CheckTeamBox(){
	if(active1.textContent === ''){
					active1.innerHTML = '<p>Lagmedlem 1</p>'
				}
				if(active2.textContent === ''){
					active2.innerHTML = '<p>Lagmedlem 2</p>'
				}
				if(active3.textContent === ''){
					active3.innerHTML = '<p>Lagmedlem 3</p>'
				}

}