game.scene.load = function () { game.scene.menu (); }

game.scene.menu = function () {
	game.wipe ();

	//phys
	game.create.phys ({ g: 1, waterline: 520 }).load ();

	//nature
	game.create.box ({ fill: 'rgba(0,0,255,0.5)', h: 200, w: 1280, x: 0, y: 520, z: 1 }).load ();
	game.create.sprite ({ h: 520, i: game.i.sea_day, repeat: true, w: 1280, x: 0, y: 0 }).load ();

	//ship
	let ship = game.create.ship ({ h: 400, w: 500, x: 390, y: 160 }); ship.load ();

		game.create.item ({ block: false, float: 1, h: 50, i: 'sail', my: true, w: 50, weight: 0, x: 475, y: 350 }).load ();
		game.create.item ({ block: false, float: 1, h: 50, i: 'sail', my: true, w: 50, weight: 0, x: 475, y: 400 }).load ();
		game.create.item ({ block: false, float: 1, h: 50, i: 'sail', my: true, w: 50, weight: 0, x: 525, y: 350 }).load ();
		game.create.item ({ block: false, float: 1, h: 50, i: 'sail', my: true, w: 50, weight: 0, x: 525, y: 400 }).load ();

		game.create.item ({ block: true, float: -1, h: 50, hp: [2, 2], i: 'mast', my: true, w: 25, weight: 1, x: 512, y: 200 }).load ();

		game.create.item ({ block: true, float: 1, h: 50, hp: [1, 1], i: 'plank', my: true, w: 50, weight: 1, x: 400, y: 300 }).load ();
		game.create.item ({ block: true, float: 1, h: 50, hp: [1, 1], i: 'plank', my: true, w: 50, weight: 1, x: 450, y: 300 }).load ();
		game.create.item ({ block: true, float: 1, h: 50, hp: [1, 1], i: 'plank', my: true, w: 50, weight: 1, x: 500, y: 300 }).load ();
		game.create.item ({ block: true, float: 1, h: 50, hp: [1, 1], i: 'plank', my: true, w: 50, weight: 1, x: 550, y: 300 }).load ();

		game.create.item ({ block: true, float: -1, h: 50, i: 'box', my: true, w: 50, weight: 1, x: 400, y: 100 }).load ();
		game.create.item ({ block: true, float: -1, h: 25, i: 'bag', my: true, w: 50, weight: 1, x: 450, y: 100 }).load ();


	//ui
	game.create.sprite ({ h: 100, i: game.i.hud, w: 500, x: 390, y: 0, z: 1 }).load ();

	let edit = game.create.button ({ action: function () { edit.i = (ship.editing) ? game.i.hammer_error : game.i.hammer; ship.edit (); }, h: 50, i: game.i.hammer_error, w: 50, x: 415, y: 20, z: 1 }); edit.load ();
}
