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
			if (game.get.pinbox ({ x: event.x, y: event.y }, csprite)) {
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
					object.speed += phys.g;
					if (!phys.collision ({ h: object.h, id: object.id, w: object.w, x: object.x, y: object.y + object.speed })) {
						if (object.y + object.h + object.speed <= canvas.height - phys.waterline + 0.5 * object.h) {
							if (object.float <= 0) {
								object.y = object.y + object.speed;
								game.zen (object);
							}
						} else {
							if (object.y + object.h <= canvas.height) {
								if (object.float < 0) {
									object.y = object.y + object.speed;
									game.zen (object);
								}
							}
							object.speed = 0;
						}
					} else {
						object.speed = 0;
					}
				}
			}
		}

		phys.tick = function () {
			phys.gravity ();
		}

	return phys;
}

game.create.item = function (_) {
	let item = game.create.csprite (_);
		item.block = _.block;
		item.float = _.float || 0;
		item.hp = _.hp || [1, 1];
		item.price = _.price || 0;
		item.speed = 0;
		item.type = 'item';
		item.weight = _.weight || 0;

		item.destroy = function (destroy) {
			if (destroy || item.hp <= 0) { delete game.object[item.id]; }
		}

	return item;
}
