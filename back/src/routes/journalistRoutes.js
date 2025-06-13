import { Router } from 'express'
import { getArticleByJournalistId } from '../controllers/articleController.js'

const journalistRoute = Router()

journalistRoute.get('/:id/articles', getArticleByJournalistId)

export default journalistRoute