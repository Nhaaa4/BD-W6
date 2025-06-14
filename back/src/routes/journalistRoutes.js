import { Router } from 'express'
import { getAllJournalists, getArticleByJournalistId } from '../controllers/journalistController.js'

const journalistRouter = Router()

journalistRouter.get('/', getAllJournalists)
journalistRouter.get('/:id/articles', getArticleByJournalistId)

export default journalistRouter