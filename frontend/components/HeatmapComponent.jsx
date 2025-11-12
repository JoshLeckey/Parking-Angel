import MapboxGL from "@react-native-mapbox-gl/maps";

const HeatmapComponent = ({ data }) => {
  return (
    <MapboxGL.ShapeSource id='heatmap' shape={data}>
      <MapboxGL.HeatmapLayer
        id='heatmap-layer'
        sourceID='heatmap'
        style={
          {
            heatmapWeight: ['interpolate', ['linear'], ['get', 'weight'], 0, 0, 1, 1],
            heatmapIntensity: .7,
            heatmapOpacity: 0.5,
            heatmapRadius: 50
          }
        }
      />
    </MapboxGL.ShapeSource>
  );
};

export default HeatmapComponent;