const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => { 
  try {
    const d = await Category.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(d);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async  (req, res) => { 
  try {
    const d = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if (!d) {
      res.status(404).json({message: 'Could not find a category with that ID!'});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => { 
  try {
    const d = await Category.create(req.body);
    res.status(200).json(d);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => { 
  try {
    const d = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!d[0]) {
      res.status(404).json({message: 'Could not find a category with that ID!'});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => { 
  try {
    const d = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!d) {
      res.status(404).json({message: 'Could not find a category with that ID!'});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;