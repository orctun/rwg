game.scene.load = function () { game.scene.menu (); }

game.scene.menu = function () {
	game.wipe ();

	//phys
	game.create.phys ({ g: 0.5, waterline: 520 }).load ();

	//nature
	game.create.box ({ fill: 'rgba(0,0,255,0.5)', h: 200, w: 1280, x: 0, y: 520, z: 1 }).load ();
	game.create.sprite ({ h: 520, i: game.i.sea_day, repeat: false, w: 1280, x: 0, y: 0 }).load ();

	//ship
	game.create.item ({ block: false, float: 1, h: 50, i: 'sail', w: 50, weight: 0, x: 475, y: 350 }).load ();
	game.create.item ({ block: false, float: 1, h: 50, i: 'sail', w: 50, weight: 0, x: 475, y: 400 }).load ();
	game.create.item ({ block: false, float: 1, h: 50, i: 'sail', w: 50, weight: 0, x: 525, y: 350 }).load ();
	game.create.item ({ block: false, float: 1, h: 50, i: 'sail', w: 50, weight: 0, x: 525, y: 400 }).load ();

	game.create.item ({ block: true, float: -1, h: 50, i: 'mast', w: 25, weight: 1, x: 512, y: 200 }).load ();

	game.create.item ({ block: true, float: 1, h: 50, i: 'plank', w: 50, weight: 1, x: 400, y: 300 }).load ();
	game.create.item ({ block: true, float: 1, h: 50, i: 'plank', w: 50, weight: 1, x: 450, y: 300 }).load ();
	game.create.item ({ block: true, float: 1, h: 50, i: 'plank', w: 50, weight: 1, x: 500, y: 300 }).load ();
	game.create.item ({ block: true, float: 1, h: 50, i: 'plank', w: 50, weight: 1, x: 550, y: 300 }).load ();

	game.create.item ({ block: true, float: -1, h: 50, i: 'box', w: 50, weight: 1, x: 400, y: 100 }).load ();
	game.create.item ({ block: true, float: -1, h: 25, i: 'bag', w: 50, weight: 1, x: 450, y: 100 }).load ();
}
