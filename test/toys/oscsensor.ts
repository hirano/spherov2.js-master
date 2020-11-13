
import { findSpheroMini } from '../../src/examples/lib/scanner';
import { wait } from '../../src/utils';
import { Event } from '../../src/toys/core';
import { ICommandWithRaw } from '../../src/commands/types';
import { SpheroMini } from '../../src/toys/sphero-mini';

let noble = require('noble');
let osc = require('osc');
let udpReady = false;
let buffer = '';
let receiving = false;

//const bleName = 'HMSoft'; // Change to name of Bluetooth device
const bleName = 'SM-3E4F'; //sphero mini green
const oscPort = 57111; // for Recieve ?


noble.on('stateChange', state => {
	console.log( state );

	if ( state === 'poweredOn' ) {

		noble.startScanning( [], false, error => {
			if ( error !== null )	console.error( error );
		});
	}
});


const udpPorts = new osc.UDPPort({
    localAddress:"127.0.0.1",
    localPort: oscPort
});


const main = async () => {
  const sphero = await findSpheroMini();
	udpPorts.open();
	console.log("Sphero : ", sphero);
	sphero.on(Event.onSensor,)
  if (sphero) {
    await sphero.configureSensorStream();
    sphero.on(Event.onSensor, (command: ICommandWithRaw) => {

			const line = command.payload.map((i: number) => `${i}`.padStart(3, '0')).join(' ');
      console.log('Sensor Read', line);
			udpPorts.send({address:'/accel',args:line}, '127.0.0.1', 57110 );
    });
    while (true) {
      await wait(1000);
    	console.log('Waiting');
			await sphero.rollTime(10, 270, 500, []);
	    await sphero.setMainLedColor(0, 0, 0xFF);
			await wait(1000);
			await sphero.rollTime(10, 90, 500, []);
			await sphero.setMainLedColor(0, 0xFF, 0);
    }
  }
};

main();
