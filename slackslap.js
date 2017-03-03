var request = require('request');
var myApp = require('./app');

module.exports = function (req, res, next) {
    var botPayload = {};

    if(req.body.text) {
        var splitText = req.body.text.split(' ');

        if(splitText.length >= 2) {
            botPayload = specificPayload(splitText[1], req.body.user_name, splitText[0], req.body.channel_id);
        }
        else {
            botPayload = randomPayload(req.body.user_name, req.body.text, req.body.channel_id);
        }

        console.log(botPayload.text + ' in channel ' + req.body.channel_name);

        send(botPayload, function(error, status, body) {
            if(error) {
                return next(error);
            }
            else if(status !== 200) {
                return next(new Error('Incoming WebHook: ' + status + ' ' + body));
            }
            else {
                return res.status(200).end();
            }
        });
    }
    else {
        return res.status(200).send('ERROR: @user required after slap command.');
    }
};

function specificPayload(identifier, user, slappedUser, channelID) {
    var payload = {};
    switch(identifier) {
        case "paddle":
            payload = payload_paddle(user, slappedUser, channelID);
            break;
        case "cactus":
            payload = payload_cactus(user, slappedUser, channelID);
            break;
        case "beads":
            payload = payload_beads(user, slappedUser, channelID);
            break;
        case "shoe":
            payload = payload_shoe(user, slappedUser, channelID);
            break;
        case "bag":
            payload = payload_bag(user, slappedUser, channelID);
            break;
        case "pizza":
            payload = payload_pizza(user, slappedUser, channelID);
            break;
        case "trout":
            payload = payload_trout(user, slappedUser, channelID);
            break;
        case "punch":
            payload = payload_punch(user, slappedUser, channelID);
            break;
        case "highfive":
            payload = payload_highfive(user, slappedUser, channelID);
            break;
        default:
            payload = randomPayload(user, slappedUser, channelID);
    }
    return payload;
}

function randomPayload(user, slappedUser, channelID) {
    var payload = {};
    var randomNumber = Math.floor(Math.random()*7);
    switch(randomNumber) {
        case 0:
            payload = payload_paddle(user, slappedUser, channelID);
            break;
        case 1:
            payload = payload_cactus(user, slappedUser, channelID);
            break;
        case 2:
            payload = payload_beads(user, slappedUser, channelID);
            break;
        case 3:
            payload = payload_shoe(user, slappedUser, channelID);
            break;
        case 4:
            payload = payload_bag(user, slappedUser, channelID);
            break;
        case 5:
            payload = payload_pizza(user, slappedUser, channelID);
            break;
        default:
            payload = payload_trout(user, slappedUser, channelID);
    }
    return payload;
}

function payload_paddle(user, slappedUser, channelID) {
    var payload = {};
    payload.text = '_' + user + ' slaps ' + slappedUser + ' ferociously with a ping pong *paddle*_';
    payload.username = 'Paddleslap';
    payload.channel = channelID;
    payload.icon_emoji = ':table_tennis_paddle_and_ball:';
    payload.link_names = 1;
    return payload;
}

function payload_cactus(user, slappedUser, channelID) {
    var payload = {};
    payload.text = '_' + user + ' slaps ' + slappedUser + ' around with a spiky *cactus*_';
    payload.username = 'Cactusslap';
    payload.channel = channelID;
    payload.icon_emoji = ':cactus:';
    payload.link_names = 1;
    return payload;
}

function payload_beads(user, slappedUser, channelID) {
    var payload = {};
    payload.text = '_' + user + ' slaps ' + slappedUser + ' admonishingly with some prayer *beads*_';
    payload.username = 'Beadslap';
    payload.channel = channelID;
    payload.icon_emoji = ':prayer_beads:';
    payload.link_names = 1;
    return payload;
}

function payload_shoe(user, slappedUser, channelID) {
    var payload = {};
    payload.text = '_' + user + ' slaps ' + slappedUser + ' right in the face with a smelly *shoe*_';
    payload.username = 'Shoeslap';
    payload.channel = channelID;
    payload.icon_emoji = ':athletic_shoe:';
    payload.link_names = 1;
    return payload;
}

function payload_trout(user, slappedUser, channelID) {
    var payload = {};
    payload.text = '_' + user + ' slaps ' + slappedUser + ' around a bit with a large *trout*_';
    payload.username = 'Troutslap';
    payload.channel = channelID;
    payload.icon_emoji = ':fish:';
    payload.link_names = 1;
    return payload;
}

function payload_bag(user, slappedUser, channelID) {
    var payload = {};
    payload.text = '_' + user + ' slaps ' + slappedUser + ' curtly with a *bag*_';
    payload.username = 'Bagslap';
    payload.channel = channelID;
    payload.icon_emoji = ':handbag:';
    payload.link_names = 1;
    return payload;
}

function payload_pizza(user, slappedUser, channelID) {
    var payload = {};
    payload.text = '_' + user + ' slaps ' + slappedUser + ' satisfyingly with a greasy slice of *pizza*_';
    payload.username = 'Pizzaslap';
    payload.channel = channelID;
    payload.icon_emoji = ':pizza:';
    payload.link_names = 1;
    return payload;
}

function payload_punch(user, slappedUser, channelID) {
    var payload = {};
    payload.text = '_' + user + ' skips the slap and smacks ' + slappedUser + ' with a wild *punch*_';
    payload.username = 'PUNCH';
    payload.channel = channelID;
    payload.icon_emoji = ':punch:';
    payload.link_names = 1;
    return payload;
}

function payload_highfive(user, slappedUser, channelID) {
    var payload = {};
    payload.text = '_' + user + ' puts all the hostility in the past and smacks ' + slappedUser + ' on the hand with a friendly *highfive*_';
    payload.username = 'HIGHFIVE!';
    payload.channel = channelID;
    payload.icon_emoji = ':raised_hand_with_fingers_splayed:';
    payload.link_names = 1;
    return payload;
}

function send(payload, callback) {
    var path = myApp.slackPath;
    var uri = 'https://hooks.slack.com/services' + path;
  
    request({
        uri: uri,
        method: 'POST',
        body: JSON.stringify(payload)
    }, function(error, response, body) {
        if(error) {
            return callback(error);
        }

        callback(null, response.statusCode, body);
    }); 
}
