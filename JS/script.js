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

let reservList = []
let teamList = []
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
pokeUI(pokemon)

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
	teamSize()

	} else {
		createAndAddToReservList(valdPokemon)
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
	reservList.push(reservPokemon)
	console.log(reservList.length);

	let ReservUl = document.createElement("ul")

	reservList.forEach(pokemon => {

		// ReservUl.innerHTML = pokemon.name +' '+ pokemon.specialNamn

		if(pokemon.specialNamn !== undefined) {
	ReservUl.innerHTML = pokemon.specialNamn  +' '+ pokemon.name
	} else {
		ReservUl.innerHTML = pokemon.name
	}

	});
	reservListSec.appendChild(ReservUl)


}

function kickBtnFun(pokemon2Kick) {
	const kickBtn = document.createElement('button')
		kickBtn.textContent = 'Ta bort från lag'
		kickBtn.addEventListener("click", () => {
			if(pokemon.specialNamn !== '') {
			teamList = teamList.filter( pokemon => pokemon.specialNamn !== pokemon2Kick.specialNamn)
			} else {
				teamList = teamList.filter( pokemon => pokemon.id !== pokemon2Kick.id)
			}

				console.log(teamList);
				visaTeam()
				teamSize()
			})

		return kickBtn

}

function teamSize() {
	TeamSizeCounter.innerHTML = `<p>${teamList.length}/3</p>`
}


function pokeUI(pokemonUI) {
let unikID = 0
for (let i = 0; i < pokemonUI.length; i++) {
  pokemoUI[i].unikId = `object-${unikID++}`;
}
return pokemonUI
}