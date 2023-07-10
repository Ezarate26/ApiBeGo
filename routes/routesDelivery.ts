import express from 'express';
import {
    createRoutes,
    updateRoute,
    deleteRouteById,
    getRouteById,
    getAllRoutes
} from '../controllers/routesController';

const router = express.Router();

router.post('/createRoutes', createRoutes);

router.put('/updateRoute/:id', updateRoute);

router.get('/getRouteById/:id', getRouteById);

router.get('/getAllRoutes', getAllRoutes);

router.delete('/deleteRouteById/:id', deleteRouteById);


export default router
