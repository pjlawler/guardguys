const services = require('../public/assets/services.json')

const getWeekParams = (weekOf => {
    const fr_date = new Date(`${weekOf} 00:00:00`);
    const to_date = new Date(fr_date.getTime() + (7 * 24 * 60 * 60 * 1000));
    date_range = {
        from: fr_date,
        to: to_date
    }
    return date_range;
});

const moreInfo = (data => {
    console.log(services);
    return services;

})

module.exports = { getWeekParams, moreInfo };