import Config from 'react-native-config';

const fetchHeatmapData = async () => {
  try {
    const res = await fetch(Config.BACKEND + '/crime', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    return { "type": "FeatureCollection", "features": json.data };
  } catch (err) {
    console.error("Error trying to fetch heatmap data:", err)
    return { "type": "FeatureCollection", "features": [] };
  }
}

const fetchParkingData = async ({ lat = 54, long = -5, radius = null }) => {
  try {
    let queryParams = `latitude=${lat}&longitude=${long}`;
    if (radius != null) {
      queryParams += `&radius=${radius}`;
    }

    console.log(`${Config.BACKEND}/parking/nearby?${queryParams}`);
    const res = await fetch(`${Config.BACKEND}/parking/nearby?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    return { "type": "FeatureCollection", "features": json };
  } catch (err) {
    console.error("Error trying to fetch parking data:", err)
    return { "type": "FeatureCollection", "features": [] };
  }
}

export { fetchHeatmapData, fetchParkingData };