import { Router } from "express";
import { getAllCategories, getArticleByCategoryId } from "../controllers/categoryController.js";


const categoryRouter = Router()

categoryRouter.get('/', getAllCategories)
categoryRouter.get('/:id/articles', getArticleByCategoryId)

export default categoryRouter