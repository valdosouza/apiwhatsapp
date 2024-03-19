const Base = require('./base.controller')
const BrowserInstances = require("../function/browser.instances");
const Functions = require("../function/function");
const whatsappController = require('./whatsapp.controller');
const whatsappContactController = require('./whatsappHasContact.controller');
const whatsappTalkController = require('./whatsappHasTalk.controller');
const venom = require('venom-bot');

class ApiController extends Base {

    static open(body) {
        const promise = new Promise(async (resolve, reject) => {
            try {

                var instance = await BrowserInstances.get(body.instance_name);
                if (!instance) {
                    venom
                        .create({
                            session: body.instance_name,
                        },
                            (base64Qr, asciiQR, attempts, urlCode) => {
                                console.log(asciiQR); // Optional to log the QR in the terminal
                                var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                                    response = {};

                                if (matches.length !== 3) {
                                    return new Error('Invalid input string');
                                }
                                response.type = matches[1];
                                response.data = new Buffer.from(matches[2], 'base64');

                                var imageBuffer = response;
                                require('fs').writeFile(
                                    'qrcode' + body.instance_name + '.png',
                                    imageBuffer['data'],
                                    'binary',
                                    function (err) {
                                        if (err != null) {
                                            console.log(err);
                                        }
                                    }
                                );
                            },
                            undefined,
                            { logQR: false }
                        )
                        .then(async (client) => {
                            BrowserInstances.init(body, client)
                                .then((instance) => {
                                    console.log(instance);
                                    this.start(instance);
                                    resolve(instance);
                                })
                        })
                } else {
                    console.log("Instância encontrada");
                    resolve(instance);
                }
            } catch (error) {
                reject("ApiControlller.open: " + error);
            }
        });
        return promise;
    }


    static close(body) {
        const promise = new Promise(async (resolve, reject) => {
            try {
                var result = await BrowserInstances.close(body.instance_name);
                resolve(result);
            } catch (error) {
                reject("ApiControlller.close: " + error);
            }

        })
        return promise;
    }

    static getWelcome(tb_institution_id, number) {
        const promise = new Promise((resolve, reject) => {
            try {
                var welcomeFirst = '';
                if (tb_institution_id == '16350') {
                    welcomeFirst = 'Olá sou seu assistente virtual, caso queira ' +
                        'fazer um pedido de forma prática e rápida clique no link ' +
                        'https://www.delivery.setes.com.br/#/institution=' + tb_institution_id + '/phone=' + number;
                } else {
                    welcomeFirst = 'Olá, bem-vindo ao atendimento online da Spice :) ' +
                        'Este canal é exclusivo para agilizar o seu pedido de forma automática. ' +
                        'Por favor clique no link ' +
                        'https://www.delivery.setes.com.br/#/institution=' + tb_institution_id + '/phone=' + number;
                }
                resolve(welcomeFirst);
            } catch (error) {
                reject("ApiControlller.getWelcome: " + error);
            }
        });
        return promise;
    }

    static getNumberFrom(body) {
        return String(body.from).split('@')[0];
    }

    static getNumberTo(body) {
        return String(body.to).split('@')[0];
    }

    static firstMessage(instance, body) {
        const promise = new Promise(async (resolve, reject) => {
            try {

                var autoAnswer = await Functions.existWord(body.body);
                console.log("autoAnswer: " + autoAnswer);
                var numberFrom = this.getNumberFrom(body);
                var numberTo = this.getNumberTo(body);
                var welcomeFirst = '';
                if ((autoAnswer) && (body.isGroupMsg === false)) {
                    welcomeFirst = await this.getWelcome(instance.tb_institution_id, numberFrom);
                }
                var wahtsMessage = {
                    instance_name: instance.name,
                    tb_institution_id: instance.tb_institution_id,
                    numberFrom: numberTo, //inverte para responder a mensagem
                    numberTo: numberFrom,//inverte para responder a mensagem
                    message: welcomeFirst,
                    type_way: 'out'
                }
                console.log(wahtsMessage);
                this.sender(wahtsMessage)
                    .then(() => {
                        resolve({ message: "Primeira mensagem enviada" })
                    })
            } catch (error) {
                reject("ApiControlller.firstMessage: " + error);
            }
        });
        return promise;
    }

    static saveContact(body) {
        const promise = new Promise(async (resolve, reject) => {
            try {
                var instance = await BrowserInstances.get(String(body.to).split('@')[0]);
                if (instance) {
                    if (String(body.from).split('@')[0] != 'status') {
                        if (body.self == 'in') {
                            var idWhatsApp = String(body.from).split('@')[0];
                            idWhatsApp.replace('-', '');
                            var user = {
                                "tb_institution_id": instance.tb_institution_id,
                                "tb_whatsapp_id": String(body.to).split('@')[0],
                                "id": idWhatsApp.substr(0, 13),
                                "name": body.sender.formattedName,
                                "active": "S"
                            }
                            //Grava o contato caso não encontre                                                
                            //Atualiza o contato para reposicionar o nome da lista 
                            whatsappContactController.getId(user)
                                .then((data) => {
                                    if (!data.length) {
                                        whatsappContactController.create(user);
                                    } else {
                                        whatsappContactController.notReady(user);
                                    }
                                });
                        }
                    }
                    resolve({ message: "Contato gravado com sucesso" });
                } else {
                    resolve({ message: "Sem Instância para gravar o contato" })
                }
            } catch (error) {
                reject("ApiControlller.saveContact: " + error);
            }
        });
        return promise;
    }

    static saveTalk(body) {
        const promise = new Promise(async (resolve, reject) => {
            try {
                var messWhats = {
                    "tb_institution_id": body.tb_institution_id,
                    "tb_whatsapp_id": body.numberFrom,
                    "contact_id": body.numberTo,
                    "body_text": body.message,
                    "type_way": body.type_way,
                    "active": "N"
                }
                whatsappTalkController.create(messWhats);
                resolve({ message: "Conversa gravada com sucesso." });
            } catch (error) {
                reject("ApiControlller.saveTalk: " + error);
            }
        });
        return promise;
    }

    static start(instance) {
        const promise = new Promise((resolve, reject) => {
            try {
                instance.client.onMessage((message) => {
                    if (message.type != 'chat') {
                        message.body = 'No momento não estamos recebendo audios e/ou videos';
                        resolve(message);
                    } else {
                        this.firstMessage(instance, message);
                        this.saveContact(message);
                        var kind_way = '';
                        if (message.fromMe) { kind_way = 'out' } else { kind_way = 'in' };
                        var numberFrom = this.getNumberFrom(message);
                        var numberTo = this.getNumberTo(message);
                        var messWhats = {
                            "tb_institution_id": instance.tb_institution_id,
                            "numberFrom": numberFrom,
                            "numberTo": numberTo,
                            "message": body.message,
                            "type_way": kind_way
                        }
                        this.saveTalk(messWhats)
                        if (kind_way == 'out') {
                            this.saveTalk(messWhats);
                        }
                        resolve({ message: "Serviço iniciado" });
                    }
                });
            } catch (error) {
                reject("ApiControlller.start: " + error);
            }
        });
        return promise;
    }


    static sender(body) {
        const promise = new Promise(async (resolve, reject) => {
            try {
                var instance = await BrowserInstances.get(body.instance_name);
                instance.client.sendText(body.numberTo + '@c.us', body.message)
                    .then(() => {
                        this.saveTalk(body);
                        resolve({ message: "Mensagem enviado com sucesso" })
                    });

            } catch (error) {
                reject("ApiControlller.sender: " + error);
            }
        });
        return promise;
    }
}

module.exports = ApiController;