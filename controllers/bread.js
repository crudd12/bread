const router = require('express').Router()
const Bread = require('../models/bread')

// GET retrieve all the bread -- "breads" is the key (key can be named anything) - "Bread" is the data model to pull from and the path
router.get('/', (req, res) => {
    res.render('index', {
        breads: Bread 
    })
})

// GET retrieve bread by index
router.get('/new', (req, res) => {
    res.render('new')
})

router.get('/:index', (req, res) => {
    const { index } = req.params  
    res.render('show', {
        bread: Bread[index],
        index: index 
    })
})

router.get('/:index/edit', (req, res) => {
    const { index } = req.params
    res.render('edit', {
        bread: Bread[index],
        index
    })
})

// CREATE
router.post('/', (req, res) => {
    if (!req.body.image) req.body.image = 'https://houseofnasheats.com/wp-content/uploads/2022/02/French-Bread-1.jpg'
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    console.log(req.body)
    Bread.push(req.body)
    res.redirect('/bread') 
})

// PUT update bread
router.put('/:index', (req, res) => {
    const { index } = req.params  
    if (!req.body.image) req.body.image = 'https://houseofnasheats.com/wp-content/uploads/2022/02/French-Bread-1.jpg'
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread[index] = req.body
    res.redirect(`/bread/${index}`)
})

// DELETE
router.delete('/:index', (req, res) => {
    const { index } = req.params
    Bread.splice(index, 1)
    res.redirect('/bread')
})

module.exports = router 