
const db = require('../../data/db-config')

const checkSchemeId = async (req, res, next) => {
  const {scheme_id} = req.params
try{
  const scheme = await db('schemes')
  .where('scheme_id', scheme_id)
  .first()

  if(!scheme) {
    next({
      status: 404, 
    message:`scheme with scheme_id ${scheme_id} not found`})
  } else {

    next()
  }
} catch (err) {
  next(err)
}
}


const validateScheme = (req, res, next) => {
  const {scheme_name} = req.body
if (
  scheme_name === undefined || // if it does not exist on the req obj
  typeof scheme_name !== "string" || // if type is not "string"
  !scheme_name.trim() // if type is empty after trimming
) {
 next({
   status: 400,
   message: 'invalid scheme_name',
 })
} else {
  next()
}
}


const validateStep = (req, res, next) => {
  const {instructions, step_number} = req.body
 
   if(
     instructions === undefined || 
     typeof instructions !== "string" ||
     !instructions.trim() ||
     typeof step_number !== "number" || //  NaN == not a number
     step_number < 1
   ) {
    next({ 
      status: 400, 
      message: "invalid step" 
    })
   } else {
     next()
   }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
