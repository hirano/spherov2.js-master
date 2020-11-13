"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const scanner_1 = require("./lib/scanner");
let noble = require('noble');
let osc = require('osc');
let udpReady = false;
let buffer = '';
let receiving = false;
//const bleName = 'HMSoft'; // Change to name of Bluetooth device
const bleName = 'SM-3E4F'; //sphero mini green
const oscPort = 57121;
const WAIT_TIME = 100;
const PATROL_TIME = 2000;
const WAIT_TIME2 = 2000;
const SPEED = 100;
noble.on('stateChange', state => {
    console.log(state);
    if (state === 'poweredOn') {
        noble.startScanning([], false, error => {
            if (error !== null)
                console.error(error);
        });
    }
});
const udpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: oscPort
});
exports.police = async (toy) => {
    while (true) {
        await toy.setMainLedColor(0xFF, 0, 0);
        udpPort.open();
        await udpPort.send({
            address: '/angle/alpha',
            args: 123
        }, '127.0.0.1', 57110);
        await utils_1.wait(WAIT_TIME);
        await toy.rollTime(SPEED, 270, PATROL_TIME, []);
        await toy.setMainLedColor(0, 0, 0xFF);
        await udpPort.send({
            address: '/angle/beta',
            args: 456
        }, '127.0.0.1', 57110);
        await utils_1.wait(WAIT_TIME);
        await toy.setMainLedColor(0, 0xFF, 0);
        await utils_1.wait(WAIT_TIME);
        await udpPort.close();
    }
};
const main = async () => {
    const sphero1 = await scanner_1.findSpheroMini();
    console.log("Sphero1 : ", sphero1);
    const sphero2 = await scanner_1.findSpheroMini();
    console.log("Sphero1 : ", sphero1);
    if (sphero1) {
        exports.police(sphero1);
    }
    if (sphero2) {
        exports.police(sphero2);
    }
};
main();
