document.addEventListener('DOMContentLoaded', () => {

let all_monsters = [];
let next_15 = [];
const monster_container = document.querySelector('#monster-container')
const newest_monster = document.querySelector('#newest-monster-container')
const add_monster_form = document.querySelector('#create-monster')
const button_div = document.querySelector('#buttons')
let fetch_cap = 15
const link = `http://localhost:3000/monsters/?_limit=${fetch_cap}`

fetch(link, {method:'GET'})
.then((responseObject) => responseObject.json())
.then(monsters => monsters.forEach((monster) =>
{monster_container.innerHTML += 
`<p>${monster.name}</p><br><p>${monster.age}</p><br><p>${monster.description}</p>`}))

// fetch('http://localhost:3000/monsters', {method:'GET'})
// .then((responseObject) => responseObject.json())
// .then((mons)=> console.log(mons))




add_monster_form.addEventListener('submit', function(e) {
	e.preventDefault()
	const inputName = add_monster_form.querySelector('#inputName').value
	const inputAge = add_monster_form.querySelector('#inputAge').value
	const inputDescription = add_monster_form.querySelector('#inputDescription').value


	fetch('http://localhost:3000/monsters', {method:'POST',
	headers: {"Content-Type": "application/json",
	  Accept: "application/json"},
	  body: JSON.stringify({ name: inputName, age: inputAge, description: inputDescription })
	})
	.then((responseObject) => responseObject.json()).then((mons)=>{newest_monster.innerHTML = `<p>${mons.name}</p><br><p>${mons.age}</p><br><p>${mons.description}</p>`})

})

	button_div.addEventListener('click', function(e){
		fetch('http://localhost:3000/monsters/?_limit=500', {method:'GET'})
		.then((responseObject) => responseObject.json())
		.then(monsters => {all_monsters = monsters
			next_15 = all_monsters.slice(fetch_cap,`${fetch_cap+15}`)
			fetch_cap += 15
			
			next_15.forEach(function(monster){
				monster_container.innerHTML += `<p>${monster.name}</p><br><p>${monster.age}</p><br><p>${monster.description}</p>`
			})

		})

	})



})//end of DOM content loaded thing, 