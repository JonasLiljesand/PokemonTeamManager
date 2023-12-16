const teamViewbtn = document.getElementById('teamViewButton')
const searchViewBtn = document.getElementById('searchViewButton')
const viewTeamSec = document.getElementById('activeTeamSection')
const viewSearchAndBenchSec = document.getElementById('searchAndBench')

teamViewbtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'none'
	viewTeamSec.style.display = 'block'
})

searchViewBtn.addEventListener("click", () => {
	viewSearchAndBenchSec.style.display = 'block'
	viewTeamSec.style.display = 'none'
})