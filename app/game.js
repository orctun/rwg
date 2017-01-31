game.scene.load = function () { game.scene.menu (); }

game.scene.menu = function () {
	game.wipe ();

	//nature
	game.create.box ({ fill: 'rgba(0,0,255,0.5)', h: 200, w: 1280, x: 0, y: 520, z: 1 }).load ();
	game.create.sprite ({ h: 720, i: game.i.sea_day, w: 1280, x: 0, y: 0 }).load ();

	//ship
	game.create.csprite ({ h: 50, i: 'mast', w: 25, x: 300, y: 200 }).load ();
	game.create.csprite ({ h: 50, i: 'plank', w: 50, x: 400, y: 200 }).load ();
	game.create.csprite ({ h: 50, i: 'plank', w: 50, x: 500, y: 200 }).load ();
	game.create.csprite ({ h: 50, i: 'plank', w: 50, x: 600, y: 200 }).load ();
	game.create.csprite ({ h: 50, i: 'plank', w: 50, x: 700, y: 200 }).load ();
	game.create.csprite ({ h: 50, i: 'sail', w: 50, x: 800, y: 200 }).load ();
}
