'use strict';
const os = require('os');
const fs = require('fs');
const path = require('path');


class BrowserInstances {
    static init(body,client) {
        const promise = new Promise(async (resolve, reject) => {
            try {
                var newInstance = {
                    tb_institution_id: body.tb_institution_id,
                    name: body.instance_name,
                    client : client
                }
                BrowserInstances.list.push(newInstance);
                resolve(newInstance)
            } catch (error) {
                reject("BrowserInstances.init: " + error)
            }
        });
        return promise;
    }

    static async close(instance_name) {
        var instance = this.get(instance_name);
        if (instance) { //só adiciona se não existir
            if (instance.state != "CLOSED") {
                if (instance.client)
                    await instance.client.then(async client => {
                        try {
                            await client.close();
                        } catch (error) {
                            console.log("client.close(): " + error.message);
                        }
                        instance.state = "CLOSED";
                        instance.client = false;
                        console.log("client.close - instance.state: " + instance.state);
                    });

                return { result: "success", message: "CLOSED" };
            } else {//close
                return { result: "success", message: instance.state };
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }

    static async get(instance_name) {
        const promise = new Promise(async (resolve, reject) => {
            try {
                var instanceFound = null;
                if (BrowserInstances.list.length > 0) {
                    for (var instance of BrowserInstances.list) {
                        if (instance_name == instance.name) {
                            var instanceFound = instance;
                            break;
                        }
                    }
                }
                resolve(instanceFound);
            } catch (error) {
                reject("instance.get: " + error)
            }
        });
        return promise;
    }

    static async getQrcode(instance_name) {
        var instance = await redisClient.get(instance_name);
        if (instance) {
            //if (["UNPAIRED", "UNPAIRED_IDLE"].includes(instance.state)) {
            if (["UNPAIRED_IDLE"].includes(instance.state)) {
                //restart instance
                await this.close(instance_name);
                this.start(instance_name);
                return { result: "error", message: instance.state };
            } else if (["CLOSED"].includes(instance.state)) {
                this.start(instance_name);
                return { result: "error", message: instance.state };
            } else { //CONNECTED
                if (instance.status != 'isLogged') {
                    return { result: "success", message: instance.state, qrcode: instance.qrcode };
                } else {
                    return { result: "success", message: instance.state };
                }
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }
}
module.exports = BrowserInstances;
