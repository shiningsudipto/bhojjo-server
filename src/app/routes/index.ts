import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { ProductRoutes } from '../modules/product/product.route'
import { PackageRoutes } from '../modules/package/package.route'
import { CategoryRoutes } from '../modules/category/category.route'
import { OrderRoutes } from '../modules/order/order.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/package',
    route: PackageRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
