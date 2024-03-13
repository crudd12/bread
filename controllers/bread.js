const router = require('express').Router()
const Bread = require('../models/bread')

// GET retrieve all the bread -- "breads" is the key (key can be named anything) - "Bread" is the data model to pull from and the path
router.get('/', async (req, res) => {
    try {
        const breads = await Bread.find()
        res.render('index', {
            breads
        })
    } catch (error) {
        console.log('error:', error)
        res.json({ message: 'error getting bread' })
    }
})

// Render New page
router.get('/new', (req, res) => {
    res.render('new')
})

// GET retrieve bread by index
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    res.render('show', {
        bread
    })
})

// router.get('/:index/edit', (req, res) => {
//     const { index } = req.params
//     res.render('edit', {
//         bread: Bread[index],
//         index
//     })
// })

// edit bread page
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    res.render('edit', {
        bread
    })
})

// CREATE
router.post('/', async (req, res) => {
    if (!req.body.image) req.body.image = undefined
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    await Bread.create(req.body)
    res.redirect('/bread')
})

// PUT update bread
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!req.body.image) req.body.image = 'https://houseofnasheats.com/wp-content/uploads/2022/02/French-Bread-1.jpg'
        if (req.body.hasGluten === 'on') {
            req.body.hasGluten = true
        } else {
            req.body.hasGluten = false
        }
        const bread = await Bread.findByIdAndUpdate(id, req.body, { new: true })
        res.redirect(`/bread/${bread.id}`)
    } catch (error) {
        console.log('error:', error)
        res.json({ message: 'error updating bread' })
    }
})

// PUT update bread
// router.put('/:index', (req, res) => {
//     const { index } = req.params  
//     if (!req.body.image) req.body.image = 'https://houseofnasheats.com/wp-content/uploads/2022/02/French-Bread-1.jpg'
//     if (req.body.hasGluten === 'on') {
//         req.body.hasGluten = true
//     } else {
//         req.body.hasGluten = false
//     }
//     Bread[index] = req.body
//     res.redirect(`/bread/${index}`)
// })

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const bread = await Bread.findByIdAndDelete(id)
        res.redirect('/bread')
    } catch (error) {
        console.log('error:', error)
        res.json({ message: 'error deleting bread' })
    }
})

module.exports = router 