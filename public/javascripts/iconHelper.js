const handlebars = require('handlebars')
const iconSelected = handlebars.registerHelper('iconSelected', (recordIconName, optionName, options) => {
  if (recordIconName === optionName) {
    return options.fn(this)
  } else {
    return options.inverse(this) 
  }
})