document.getElementById('play').addEventListener('click',()=>{
	state = 'main';
	create();
	document.getElementById('mainMenu').style.display = 'none';
},false);

for (let i = 0; i < document.getElementsByClassName('replay').length; i++) {
	document.getElementsByClassName('replay')[i].addEventListener('click',()=>{
		state = 'main';
		create();
		document.getElementById('gameOver').style.display = 'none';
		document.getElementById('win').style.display = 'none';
	},false);

}

for (let i = 0; i < document.getElementsByClassName('menu').length; i++) {
	document.getElementsByClassName('menu')[i].addEventListener('click',()=>{
		state = 'mainMenu';
		document.getElementById('mainMenu').style.display = 'block';
		document.getElementById('gameOver').style.display = 'none';
		document.getElementById('win').style.display = 'none';
	},false);

}