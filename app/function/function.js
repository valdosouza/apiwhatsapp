module.exports = class Function {

    static async existWord (body) {

        //return false;
        var autoAnswer = [
            "Boa",
            "noite",
            "Tarde",
            "Promoção",
            "promocao",
            "Olá",
            "ola",
            "pizza",
            "tudo bem",
            "manda",
            "cardápio",
            "cardapio",
            "pedido",
			"Spice",
        ];

        var msgOriginal = body.split(" ");
        
        for (var w = 0, lenWord = msgOriginal.length; w < lenWord; ++w) {
            var word = msgOriginal[w];

            for (var c = 0, lenComp = autoAnswer.length; c < lenComp; ++c) {
                var compare = autoAnswer[c];
                if (word.toUpperCase().includes(compare.toUpperCase())) {                    
                    return  true;                    
                }
            };           
        };
        return false;

    }

}
