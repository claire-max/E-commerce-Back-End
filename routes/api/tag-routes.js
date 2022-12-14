const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => { 
  try {
    const d = await Tag.findAll({
      include: [ 
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })
    res.status(200).json(d);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => { 
  try {
    const d = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
    if (!d) {
      res.status(404).json({message: "Couldn't find that tag ID!"});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const d = await Tag.create(req.body);
    res.status(200).json(d);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async(req, res) => { 
  try {
    const d = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!d[0]) {
      res.status(404).json({message: "Couldn't find that tag ID!"});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => { 
  try {
    const d = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!d) {
      res.status(404).json({message: "Couldn't find that tag ID!"});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;