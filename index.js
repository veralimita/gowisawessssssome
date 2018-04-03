const Twitter = require('twitter'),
    moment = require('moment'),
    CronJob = require('cron').CronJob,
    config = require('./config.json');

const client = new Twitter(config.twitter);
const reliseDay = moment('20180420', 'YYYYMMDD');

function formatedDays(days) {
    if (days < 1) {
        return null;
    }
    if ((days === 1) || (days % 10 === 1) && (days != 11)) {
        return `${days} день`
    }
    if ((days === 2) || (days % 10 === 2) && (days != 12)) {
        return `${days} дня`
    }
    if ((days === 3) || (days % 10 === 3) && (days != 13)) {
        return `${days} дня`
    }
    if ((days === 4) || (days % 10 === 4) && (days != 14)) {
        return `${days} дня`
    }
    return `${days} дней`
}

function makeHashtags(days) {
    return `#godofwar #${days}day${days === 1 ? '' : 's'}left`;
}

function makeTitle() {
    const titles = [
        'О Мой Бог! Бог Войны!!!',
        'Полцарства за красные сферы!!!',
        'Кратос близко!!!',
        'Шрамы украшают мужчину!!!',
        'Кто убил свою жену, тот Кратос!!!',
        'Отец года!!!',
        'Муж года!!!',
        'Девушки! Кратос снова свободен!!!'
    ];
    return titles[Math.floor(Math.random() * titles.length)]
}

function makeBody(diff) {
    const bodies = [
        `Осталось ${formatedDays(diff)} до выхода GOW!`,
        `GOW выходит через ${formatedDays(diff)}!`,
        `${formatedDays(diff)} осталось пылиться PS4!`,
        `Контроллеры на плечо. GOW через ${formatedDays(diff)}!`,
    ];
    return bodies[Math.floor(Math.random() * bodies.length)]
}

function postToTwitter() {
    const currentDay = moment();
    const diff = reliseDay.diff(currentDay, 'days');
    if (diff < 0) {
        console.log('OHHHH, NOOOOOO!');
        process.exit();
    }
    if (diff === 0) {
        client.post('statuses/update',
            {
                status: `Расчехляю контроллер, смахиваю пыль с моей PS4 и беру отпуск на работе! Кратос, жди меня! #godofwar`
            },
            (error) => {
                if (error) {
                    console.error(error);
                }
                process.exit();
            }
        )
    }
    const status = `${makeTitle()} ${makeBody(diff)} ${makeHashtags(diff)}`;

    client.post('statuses/update',
        {status},
        (error, tweet) => {
            if (error) {
                console.error(error);
            }
        }
    )
}

const job = new CronJob('0 10 * * *', postToTwitter);
job.start();

















