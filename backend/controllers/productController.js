import Product from '../models/productmodel.js'
import User from '../models/User.js'
import Category from '../models/Category.js'
import mongoose from "mongoose"

//get all products
const getAllProds = async(req,res)=>{
    const prods = await Product.find({}).sort({createdAt:-1}) //leave blank since we want all.

    res.status(200).json(prods)
}

//get single prod, query by id,name,category
const getProductById = async (req,res)=>{
    try {
        const {id} = req.params //gives us the id that we type.

        const tprod = await Product.findById(id);
        if(!tprod){
            return res.status(404).json({error:"No corresponding product with given id."})
        }
        res.status(200).json(tprod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getProductByName = async (req, res) => {
    var name = req.params.name;
    try {
        //well originally find was used but then found this method that was more efficient.
      const tprods = await Product.aggregate([
        {
          $match: {
            Pname: { $regex: new RegExp(name, 'i') }
          }
        }
      ]);
  
      if (!tprods.length) {
        const ttprods = await Product.aggregate([
          {
            $match: {
              description: { $regex: new RegExp(name, 'i') }
            }
          }
        ]);
        if (!ttprods.length) {
          return res.status(404).json({ error: "No products with matching name found." });
        }
        res.status(200).json(ttprods);
      }else {
        res.status(200).json(tprods);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


const getProductByCategory = async (req, res) => {
    try {
      var Category  = req.params.category;
      const tprods = await Product.aggregate([
        {
          $match: {
            category: { $regex: new RegExp(Category, 'i') }
          }
        }
      ]);
  
      if (!tprods.length) {
        return res.status(404).json({ error: "No products with matching category found." });
      }
      res.status(200).json(tprods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
};

//create new product
const createProd = async (req,res) =>{
    const {Pname,price,stock,variants, description, warranty, Distribution_inf, Discount_rate, category, images, rating, numOfReviews,reviews } = req.body;
    //add prod document to db.
    try {
        const prod = await Product.create({
            Pname,
            price,
            stock,
            variants,
            description,
            warranty,
            Distribution_inf,
            Discount_rate,
            category,
            images,
            rating,
            numOfReviews,
            reviews
        }); //this is async.
        res.status(200).json(prod);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

//update a product
const updateProduct = async(req,res) =>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such product"})
  }

  const product = await Product.findOneAndUpdate({_id:id},{...req.body}) //spread is used since we dont know how many field to update.
  if(!product){
    return res.status(404).json({error:"No corresponding product with given id."})
  }
  res.status(200).json(product);

}

//delete product
const deleteProduct = async(req,res) =>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such product"})
  }

  const product = await Product.findOneAndDelete({_id: id})
  if(!product){
    return res.status(404).json({error:"No corresponding product with given id."})
  }
  res.status(200).json(product);
}

const createProductReview = async(req, res) =>{
  const { rating, comment} = req.body;
  const {id} = req.params;
  const postedBy = await User.findById(req.user._id);
    const review = {
        user: req.user._id,
        user_name: postedBy.name,
        rating: Number(rating),
        comment
    }
  
    const product = await Product.findById(id);
  
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
      
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                product.rating = ((product.rating*product.reviews.length)-(review.rating)+Number(rating))/(product.reviews.length);
                review.comment = comment;
                review.rating = rating;
                review.approved = false;
                
            }
        })
        

    } else {
        product.rating = ((product.rating*product.reviews.length)+review.rating)/(product.reviews.length+1)
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }
    
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    }) 
}
// Get Product Reviews   =>   /api/v1/reviews
const getProductReviews = async (req, res) => {
  const {id} = req.params;
  const product = await Product.findById(id);

  res.status(200).json({
      success: true,
      reviews: product.reviews
  })
}

const sortByPriceDescending = async (req, res) => {
  try {
      //well originally find was used but then found this method that was more efficient.
    const tprods = await Product.aggregate([
      {
        $sort: {
          price: -1
        }
      }
    ]);

    res.status(200).json(tprods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sortByRatingDescending = async (req, res) => {
  try {
      //well originally find was used but then found this method that was more efficient.
    const tprods = await Product.aggregate([
      {
        $sort: {
          rating: -1
        }
      }
    ]);

    res.status(200).json(tprods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sortByPopularityDescending = async (req, res) => {
  try {
      //well originally find was used but then found this method that was more efficient.
    const tprods = await Product.aggregate([
      {
        $sort: {
          numOfReviews: -1
        }
      }
    ]);

    res.status(200).json(tprods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const getStock = async (req, res) => {
  const { productId } = req.params; // Assuming you pass the product ID in the request parameters

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const stock = product.stock;
    res.json({ stock });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getAllRatings = async (req, res) => {
  const { productId } = req.params; // Assuming you pass the product ID in the request parameters

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const approvedRatings = product.reviews
      .filter(review => review.approved)
      .map(review => review.rating);

    res.json({ ratings: approvedRatings });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateReviewApproval = async (req, res) => {
  const { reviewId, productId } = req.body;
  console.log(reviewId, productId);
  try {
    const result = await Product.updateOne(
      { _id: productId, "reviews._id": reviewId },
      { $set: { "reviews.$.approved": true } }
    );
    console.log("Review updated successfully:", result);
  } catch (error) {
    console.log("Error updating review:", error);
  }
};

const addCategory = async (req, res) => {
  try {
    const categoryName = req.params.name;
    if (!categoryName) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const category = new Category({
      name: categoryName
    });

    await category.save();
    res.status(200).json({ message: 'Category added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add category' });
  }
};
const getAllCategories = async(req,res)=>{
  const categories = await Category.find().sort({createdAt:-1})

  res.status(200).json(categories)
}







export {
    addCategory,
    getAllRatings,
    getStock,
    createProd,
    getAllProds,
    getProductById,
    getProductByName,
    getProductByCategory,
    deleteProduct,
    updateProduct,
    createProductReview,
    getProductReviews,
    sortByPriceDescending,
    sortByRatingDescending,
    sortByPopularityDescending,
    updateReviewApproval,
    getAllCategories
};