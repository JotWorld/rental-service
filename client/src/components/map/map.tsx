import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FullOffer } from '../../types/offer';

type MapProps = {
  offers: FullOffer[];
  activeOfferId: string | null;
};

const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 30],
});

const activeIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [30, 30],
});

function Map({ offers, activeOfferId }: MapProps) {
  const defaultLocation = {
    lat: 52.38333,
    lng: 4.9,
    zoom: 12,
  };

  return (
    <MapContainer
      center={[defaultLocation.lat, defaultLocation.lng]}
      zoom={defaultLocation.zoom}
      scrollWheelZoom
      className="cities__map"
      style={{ height: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {offers.map((offer) => (
        <Marker
          key={offer.id}
          position={[offer.location.latitude, offer.location.longitude]}
          icon={offer.id === activeOfferId ? activeIcon : defaultIcon}
        />
      ))}
    </MapContainer>
  );
}

export default Map;
