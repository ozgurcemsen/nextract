'use strict';

/**
 * Example: Query and sort...
 */

var path = require('path'),
    Nextract = require(path.resolve(__dirname, '../nextract'));

var ETL = new Nextract();

ETL.loadPlugin('Core', ['Database', 'Calculator', 'Logger']).then(function () {
  return ETL.Plugins.Core.Database.select('nextract_sample', 'select first_name, last_name, age, salary from users');
}).then(function (data) {
  return ETL.Plugins.Core.Calculator.add(data, 'salary', 1000, 'new_salary');
}).then(function (data) {
  //Lets add a new full name property
  return ETL.Plugins.Core.Calculator.concat(data, ['Mr/Mrs:', 'first_name', 'last_name'], ' ', 'full_name');
}).then(function (data) {
  ETL.Plugins.Core.Logger.debug('Manipulated queryResults:', data);
}).catch(function (err) {
  ETL.Plugins.Core.Logger.error('ETL process failed:', err);
});
