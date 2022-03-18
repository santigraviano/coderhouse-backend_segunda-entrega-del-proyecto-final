import { Router } from "express"
import controller from '../controllers/product.controller.js'
import isAdminMiddleware from "../middlewares/isAdmin.js"

const router = new Router()

router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', isAdminMiddleware, controller.create)
router.put('/:id', isAdminMiddleware, controller.update)
router.delete('/:id', isAdminMiddleware, controller.delete)

export default router