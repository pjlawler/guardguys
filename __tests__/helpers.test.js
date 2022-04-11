const { getWeekParams } = require('../utils/helpers');

test('getWeekParams() returns a object with from and to dates', () => {
    const weekOf = "2022-04-04"
    const fr_date = new Date('2022-04-04 00:00:00');
    const to_date = new Date('2022-04-11 00:00:00');

    expect(getWeekParams(weekOf)).toEqual({ from: fr_date, to: to_date });
});