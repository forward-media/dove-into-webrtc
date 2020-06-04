import { EventEmitter } from 'events';
import * as socketio from 'socket.io';
import { Logger } from './Logger';
const logger = new Logger('Peer');
import { ROLE } from './defines';
import {Room} from './Room';

export class Peer extends EventEmitter {
	roler: ROLE;
	closed = false;
	joined = false;
	displayName: string;
	picture: string;
	platform: string;
	address: string;
	enterTime = Date.now();

	disconnectCheck = 0;
	intervalHandler;

	constructor(
		public id: string, 
		public socket: socketio.Socket,
		public room: Room) {

		super();

		logger.info('constructor() [id:"%s", socket:"%s"]', id, socket.id);

		this.address = socket.handshake.address;
		this.setMaxListeners(Infinity);
		this.handlePeer();
	}

	close() {
		logger.info('peer %s call close()', this.id);

		this.closed = true;

		if (this.socket){
			this.socket.disconnect(true);
		}

		if ( this.intervalHandler ) {
			clearInterval(this.intervalHandler);
		}
		this.emit('close');
	}

	public handlePeerReconnect(socket: socketio.Socket) {
		this.socket.leave(this.room.id);
		this.socket.disconnect(true);
		logger.info('peer %s reconnnected! disconnect previous connection now.', this.id);

		this.socket = socket;
		this.socket.join(this.room.id);
		this.room.setupSocketHandler(this);
		this.handlePeer();
	}

	private handlePeer() {
		this.socket.on('disconnect', (reason) => {
			if (this.closed) {
				return;
			}

			logger.debug('"socket disconnect" event [id:%s], reason: %s', this.id, reason);
			this.close();
		});

		this.socket.on('error', (error) => {
			logger.info('socket error, peer: %s, error: %s', this.id, error);
		});
	}

	peerInfo() {
		const peerInfo = {
			id          : this.id,
			roler		: this.roler,
			displayName : this.displayName,
			picture     : this.picture,
			platform	: this.platform,
			address		: this.address,
			durationTime	: (Date.now() -  this.enterTime) / 1000,
		};

		return peerInfo;
	}
}
