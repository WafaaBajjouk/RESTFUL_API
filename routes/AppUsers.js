import express from "express";
import User from '../model/user.js';

const router= express.Router();

// Afficher tt
router.get('/', async (req, res) => {
  // res.send("test")
    try {
      const user = await User.find()
      res.json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

  // affichage by ID
  router.get('/:id', getUser,(req, res) => {
    res.send(res.user)
  })


//fonction intermediare de recherche
  async function getUser(req, res, next) {
    let user
    try {
      user = await User.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find this user' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  }
  
  //ajouter
  router.post('/', async (req, res) => {
    const user = new User({
      name: req.body.name,
      password: req.body.password,

    })
    try {
      const newUser = await user.save()
      res.status(201).json(newUser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  

  // modifier
  router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
      res.user.name = req.body.name
    }

    if (req.body.password != null) {
      res.user.password = req.body.password
    }

    try {
      const updatedUser = await res.user.save()
      res.json(updatedUser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
  // Supprimer
  router.delete('/:id', getUser, async (req, res) => {
    try {
      await res.user.remove()
      res.json({ message: 'Deleted User' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
export default router;