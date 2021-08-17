const Category = require("../../models/Category");
const Articles = require("../../models/Articles");

const categoryCont = {
  createCategory: async (req, res) => {
    try {
      const { nameCategory } = req.body;
      const category = await Category.findOne({ nameCategory });
      if (category)
        return res.status(400).json({ msg: "This category already exists." });

      const newCategory = new Category({ nameCategory });

      await newCategory.save();
      res.json({ msg: "Category is created" });
    } catch (err) {
      return res.status(401).json({ msg: err.message });
    }
  },
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(401).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (req.user.role.toString() !== "admin") {
        if (
          req.user.role.toString() !== "atelier" )
          return res.status(401).json("You are not allowed to do that!");
      }else{const result = await Category.updateOne(
        {_id:req.params.id},
        {$set:{...req.body}});

    result.nModified?res.send({msg:"Category is updated"})
    :res.send({msg:" Category is already updated"})}
        
    } catch (error) {
        res.status(400).send({message:"there is no category with this id"})
    }
   
  },
  deleteCategory: async (req, res) => {
    try {
    const products = await Articles.findOne({ category: req.params.id });
      if (products)
        return res.status(400).json({
          msg: "Please delete all products in this category first.",
        });

      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Category is deleted" });
    } catch (err) {
      return res.status(401).json({ msg: err.message });
    }
  },
  getCategory: async (req,res)=>{
    try {
      const result = await Category.findById(req.params.id)
      res.json({ response: result, message: "get category successfuly" });
    } catch (error) {
      return res.status(401).json({ msg: err.message });
    }
  }
};

module.exports = categoryCont;
