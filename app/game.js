game.scene.load = function () { game.scene.menu (); }

game.scene.menu = function () {
	game.wipe ();

	//phys
	game.create.phys ({ g: 0.5, waterline: 200 }).load ();

	//nature
	game.create.box ({ fill: 'rgba(0,0,255,0.5)', h: 200, w: 1280, x: 0, y: 520, z: 1 }).load ();
	game.create.sprite ({ h: 720, i: game.i.sea_day, w: 1280, x: 0, y: 0 }).load ();

	//ship
	game.create.item ({ block: false, float: 1, h: 50, i: 'sail', w: 50, weight: 1, x: 800, y: 200 }).load ();
	game.create.item ({ block: false, float: 1, h: 50, i: 'sail', w: 50, weight: 1, x: 800, y: 300 }).load ();

	game.create.item ({ block: true, float: -1, h: 50, i: 'mast', w: 25, weight: 1, x: 300, y: 200 }).load ();

	game.create.item ({ block: true, float: 0, h: 50, i: 'plank', w: 50, weight: 1, x: 400, y: 200 }).load ();
	game.create.item ({ block: true, float: 0, h: 50, i: 'plank', w: 50, weight: 1, x: 500, y: 200 }).load ();
	game.create.item ({ block: true, float: 0, h: 50, i: 'plank', w: 50, weight: 1, x: 600, y: 200 }).load ();
	game.create.item ({ block: true, float: 0, h: 50, i: 'plank', w: 50, weight: 1, x: 700, y: 200 }).load ();

	game.create.item ({ block: true, float: -1, h: 50, i: 'box', w: 50, weight: 1, x: 400, y: 100 }).load ();
}
