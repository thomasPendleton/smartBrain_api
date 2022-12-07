
const getProfile = (req, res, knex) => { 
    const {id} = req.params
    knex
    .select('*')
    .from('users')
    .where({id})
    .then(user => { 
        if(user.length){
            res.json(user)
        } else {
            res.status(404).json('no such user')
        }}
    )
    .catch(err => res.status(400).json('error getting user'))

 }
 

module.exports = {
    getProfile
}