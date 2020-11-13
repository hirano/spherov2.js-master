"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_1 = require("./lib/scanner");
const utils_1 = require("../utils");
const core_1 = require("../toys/core");
let noble = require('noble');
let osc = require('osc');
let udpReady = false;
let buffer = '';
let receiving = false;
//const bleName = 'HMSoft'; // Change to name of Bluetooth device
const bleName = 'SM-3E4F'; //sphero mini green
const oscPort = 57111; // for Recieve ?
noble.on('stateChange', state => {
    console.log(state);
    if (state === 'poweredOn') {
        noble.startScanning([], false, error => {
            if (error !== null)
                console.error(error);
        });
    }
});
const udpPorts = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: oscPort
});
const main = async () => {
    const sphero = await scanner_1.findSpheroMini();
    udpPorts.open();
    console.log("Sphero : ", sphero);
    sphero.on(core_1.Event.onSensor);
    if (sphero) {
        await sphero.configureSensorStream();
        sphero.on(core_1.Event.onSensor, (command) => {
            const line = command.payload.map((i) => `${i}`.padStart(3, '0')).join(' ');
            console.log('Sensor Read', line);
            udpPorts.send({ address: '/accel', args: line }, '127.0.0.1', 57110);
        });
        while (true) {
            await utils_1.wait(1000);
            console.log('Waiting');
            await sphero.rollTime(10, 270, 500, []);
            await sphero.setMainLedColor(0, 0, 0xFF);
            await utils_1.wait(1000);
            await sphero.rollTime(10, 90, 500, []);
            await sphero.setMainLedColor(0, 0xFF, 0);
        }
    }
};
main();
