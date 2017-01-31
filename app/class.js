game.create.cbox = function (_) {
	let cbox = game.create.box (_);
		cbox.c = {};
		cbox.c.default = _.fill;
		cbox.c.error = _.error || '#fff';
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
				if (object.type == 'cbox' && id != cbox.id) {
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
				if (object.type == 'csprite' && id != csprite.id) {
					if (game.get.binbox (csprite, object)) {
						csprite.i = csprite.ierror;
						return true;
					}
				}
			}
			csprite.i = csprite.i0;
			return false;
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

game.create.segment = function (_) {
	let segment = game.create.csprite (_);
		segment.hp = _.hp || [1, 1];
		segment.weight = _.weight || 0;
	return segment;
}
