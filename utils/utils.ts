import axios from 'axios';
import Route from '../models/Routes';
import Points from '../models/Points';




// Endpoint para crear una nueva ruta
export async function createRoute (origin: string, destiny: string, update: boolean = false, routeId:string ="") {
  try {
    const points = await Points.find()

    let placeIdA, placeIdB;

    points.forEach(point => {
      if (point.location?.name === origin) {
        placeIdA = point.location?.placeId
      } else if (point.location?.name === destiny) {
         placeIdB = point.location?.placeId
      } 
    })
    
    if (!placeIdA) {
      return { message: 'Ingrese un punto de partida valido' };
    }else if (!placeIdB) {
      return { message: 'Ingrese un punto de destino valido' };
    }else if (!placeIdA && !placeIdB){
      return { message: 'Ingrese un punto de partida y un punto de destino valido' };
    }
    
      const existingRoute = await Route.findOne({ origin, destiny });
      if (!routeId && existingRoute) {
        return { route: existingRoute, message: 'La ruta ya existe.' };
      }
    // Obtener las coordenadas de los points utilizando la API de Google Maps
    const coordinatesA = await getCoordinates(placeIdA!);
    const coordinatesB = await getCoordinates(placeIdB!);
    const distance = await getDistance(coordinatesA, coordinatesB);

    // Crear una nueva instancia del modelo de Ruta con las coordenadas obtenidas
    const newRoute = new Route({
      originCoordinates: coordinatesA,
      destinyCoordinates: coordinatesB,
      origin,
      destiny,
      distance,
    });

    // Guardar la nueva ruta en la base de datos
    
    if (update) {
      await Route.findByIdAndUpdate(routeId, {
        originCoordinates: coordinatesA,
        destinyCoordinates: coordinatesB,
        origin,
        destiny,
        distance,
      }, { new: true });
      return { message: 'Ruta actualizada exitosamente.' };
    } else {
      await newRoute.save();
    }

    const route = await Route.findOne({ origin, destiny });
    return { route, message: 'Ruta creada exitosamente.'};
  } catch (error) {
    return { message: 'Error en el servidor.',error };
  }
};

// Función para obtener las coordenadas de un point utilizando el placeId
export async function getCoordinates(placeId: string) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
  
      const { lat, lng } = response.data.result.geometry.location;
      return { lat, lng };
    } catch (error) {
      throw new Error('Error al obtener las coordenadas del point.');
    }
  }
  
export async function getDistance(pointA: { lat: number; lng: number }, pointB: { lat: number; lng: number }) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pointA.lat},${pointA.lng}&destinations=${pointB.lat},${pointB.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
  
      const distance = response.data.rows[0].elements[0].distance.text;
      return distance;
    } catch (error) {
      throw new Error('Error al calcular la distancia entre los puntos.');
    }
  }