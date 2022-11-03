const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ['category_name', 'id'],
    include: [
      {
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        model: Product,
      },
    ] ,
  })
  // be sure to include its associated Products
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    res.status(500).json(err);
    console.log(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne ({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes:['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],

  })
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'NO category found for this id!' });
      return;
    }
    res.json(dbCategoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
  });

router.post('/', (req, res) => {
  // create a new category
  Category.create({
      category_name: req.body.category_name,
    })
.then((dbProductData) => res.json(dbProductData))
.catch((err) => {
  res.status(500).json(err);
  console.log(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'NO category found for this id!' });
      return;
    }
    res.json(dbCategoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'NO category found for this id!' });
        return;
      }
      res.json(dbCategoryData);
      })
      .catch((err) => {
        res.status(500).json(err);
        console.log(err);
      });
  });

module.exports = router;
