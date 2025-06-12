import { CITIES_LOCATION } from '../../const';
import { changeCity } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { JSX } from 'react';

export default function CityList(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {CITIES_LOCATION.map((city) => (
        <li className="locations__item" key={city.name}>
          <a
            className={`locations__item-link tabs__item ${city.name === activeCity ? 'tabs__item--active' : ''}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(changeCity(city.name));
            }}
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
