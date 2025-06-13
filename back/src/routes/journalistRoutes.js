import { Router } from 'express'
import { getAllJournalists, getArticleByJournalistId } from '../controllers/journalistController.js'

const journalistRoute = Router()

journalistRoute.get('/', getAllJournalists)
journalistRoute.get('/:id/articles', getArticleByJournalistId)

export default journalistRoute