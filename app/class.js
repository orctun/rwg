game.create.cbox = function (_) {
	let cbox = game.create.box (_);
		cbox.c = {};
		cbox.c.default = _.fill;
		cbox.c.error = _.error || '#fff';
		cbox.overlay = _.overlay || true;
		cbox.status = 'drop';
		cbox.type = 'cbox';

		cbox.drag = function () {
			if (cbox.status == 'drag') {
				cbox.error ();
				cbox.move (cbox.vx - cbox.dx, cbox.vy - cbox.dy);
			}
		}

		cbox.drop = function () {
			if (cbox.status == 'drag') {
				cbox.status = 'drop';
				if (cbox.error ()) {
					cbox.fill = cbox.c.default;
					cbox.move (cbox.x0, cbox.y0);
				}
			}
		}

		cbox.error = function () {
			for (let id in game.object) {
				let object = game.object[id];
				if (object.overlay && id != cbox.id) {
					if (game.get.binbox (cbox, object)) {
						cbox.fill = cbox.c.error;
						return true;
					}
				}
			}
			cbox.fill = cbox.c.default;
			return false;
		}

		cbox.pick = function (event) {
			if (game.get.pinbox ({ x: event.x, y: event.y }, cbox)) {
				cbox.x0 = cbox.x;
				cbox.y0 = cbox.y;
				cbox.dx = event.x - cbox.x;
				cbox.dy = event.y - cbox.y;
				cbox.status = 'drag';
			}
		}

		cbox.mousedown = function (event) {
			cbox.pick (event);
		}

		cbox.mousemove = function (event) {
			cbox.vx = event.x;
			cbox.vy = event.y;
		}

		cbox.mouseup = function () {
			cbox.drop ();
		}

		cbox.tick = function () {
			cbox.drag ();
		}

	return cbox;
}

game.create.csprite = function (_) {
	let csprite = game.create.sprite (_);
		csprite.dnd = _.dnd || false;
		csprite.i0 = game.get.i (_.i);
		csprite.ierror = _.ierror || game.get.i (_.i + '_error');
		csprite.i = game.get.i (_.i);
		csprite.inversion = _.inversion || false;
		csprite.overlay = _.overlay || true;
		csprite.status = 'drop';
		csprite.type = 'csprite';

		csprite.drag = function () {
			if (csprite.status == 'drag') {
				csprite.error ();
				csprite.move (csprite.vx - csprite.dx, csprite.vy - csprite.dy);
			}
		}

		csprite.drop = function () {
			if (csprite.status == 'drag') {
				csprite.status = 'drop';
				if (csprite.error ()) {
					csprite.i = csprite.i0;
					csprite.move (csprite.x0, csprite.y0);
				}
			}
		}

		csprite.error = function () {
			for (let id in game.object) {
				let object = game.object[id];
				if (object.overlay && id != csprite.id) {
					if (game.get.binbox (csprite, object)) {
						csprite.i = csprite.ierror;
						return !csprite.inversion;
					}
				}
			}
			csprite.i = csprite.i0;
			return csprite.inversion;
		}

		csprite.pick = function (event) {
			if (csprite.dnd == true && game.get.pinbox ({ x: event.x, y: event.y }, csprite)) {
				csprite.x0 = csprite.x;
				csprite.y0 = csprite.y;
				csprite.dx = event.x - csprite.x;
				csprite.dy = event.y - csprite.y;
				csprite.status = 'drag';
			}
		}

		csprite.mousedown = function (event) {
			csprite.pick (event);
		}

		csprite.mousemove = function (event) {
			csprite.vx = event.x;
			csprite.vy = event.y;
		}

		csprite.mouseup = function () {
			csprite.drop ();
		}

		csprite.tick = function () {
			csprite.drag ();
		}

	return csprite;
}

game.create.item = function (_) {
	let item = game.create.csprite (_);
		item.block = _.block;
		item.float = _.float || 0;
		item.hp = _.hp || [1, 1];
		item.price = _.price || 0;
		item.fallspeed = 0;
		item.type = 'item';
		item.weight = _.weight || 0;

		item.destroy = function (destroy) {
			if (destroy || item.hp <= 0) { delete game.object[item.id]; }
		}

	return item;
}

game.create.phys = function (_) {
	let phys = game.create.object (_);
		phys.g = _.g || 0;
		phys.waterline = _.waterline || 0;

		phys.collision = function (o) {
			for (let id in game.object) {
				let object = game.object[id];
				if (object.block == true && id != o.id) {
					if (game.get.binbox (o, object)) {
						return true;
					}
				}
			}
			return false;
		}

		phys.gravity = function () {
			for (let id in game.object) {
				let object = game.object[id];
				if (object.type == 'item') {
					if (object.y + object.h < canvas.height && !phys.collision ({ h: object.h, id: object.id, w: object.w, x: object.x, y: object.y + object.fallspeed + phys.g })) {
						if (object.y - phys.g + 0.5 * object.h < phys.waterline) {
							if (object.weight > 0) {
								object.fallspeed += phys.g;
								object.y += object.fallspeed;
								game.zen (object);
							} else {
								object.fallspeed = 0;
							}
						}
						if (object.y - phys.g + 0.5 * object.h > phys.waterline) {
							if (object.float < 0) {
								object.fallspeed = phys.g;
								object.y += object.fallspeed;
								game.zen (object);
							}
							if (object.float == 0) {
								object.fallspeed = 0;
							}
							if (object.float > 0) {
								object.fallspeed = -phys.g;
								object.y += object.fallspeed;
								game.zen (object);
							}

						}
						if (object.y - phys.g + 0.5 * object.h == phys.waterline) {
							object.fallspeed = 0;
						}
					} else {
						object.fallspeed = 0;
					}
				}
			}
		}

		phys.tick = function () {
			phys.gravity ();
		}

	return phys;
}

game.create.ship = function (_) {
	let ship = game.create.box (_);
		ship.float = _.float || 0;
		ship.hp = _.hp || [0, 0];
		ship.editing = _.editing || false;
		ship.load = _.load || function () {};
		ship.weight = _.weight || 0;

		ship.ui = {};
		ship.ui.hp = game.create.text ({ align: 'center', color: '#fff', text: ship.hp[0] + ' / ' + ship.hp[1], x: 640, y: 88, z: 1 }); ship.ui.hp.load ();
		ship.ui.hpbar = game.create.bar ({ fill: '#f00', h: 10, now: ship.hp[0], max: 12, w: 400, x: 441, y: 90 }); ship.ui.hpbar.load ();



		ship.edit = function () {
			if (!ship.editing) {
				ship.editing = true;
				ship.dnd (true);
				ship.fill = 'rgba(0,0,0,0.1)';
				game.zen (ship);
			} else {
				ship.editing = false;
				ship.dnd (false);
				ship.fill = 'transparent';
				game.zen (ship);
			}
		}

		ship.dnd = function (dnd) {
			for (let id in game.object) {
				let object = game.object[id];
				if (object.type == 'item' && object.my == true) {
					object.dnd = dnd;
				}
			}
		}

		ship.get = {
			get hp () {
				ship.status ();
				return ship.hp[0];
			},
			get hpmax () {
				ship.status ();
				return ship.hp[1];
			}
		}

		ship.status = function () {
			let float = 0;
			let hp0 = 0;
			let hp1 = 0;
			let weight = 0;
			for (let id in game.object) {
				let object = game.object[id];
				if (object.my == true) {
					if (game.get.binbox (object, ship)) {
						float += object.float;
						hp0 += object.hp[0];
						hp1 += object.hp[1];
						weight += object.weight;
					}
				}
			}
			ship.float = float;
			ship.hp[0] = hp0;
			ship.hp[1] = hp1;
			ship.weight = weight;
		}

		ship.tick = function () {
			ship.status ();
			ship.ui.status ();
		}

		ship.ui.status = function () {
			ship.ui.hp.text = ship.hp[0] + ' / ' + ship.hp[1];
			ship.ui.hpbar.now = ship.hp[0];
			ship.ui.hpbar.max = ship.hp[1];
		}

	return ship;
}
