import { JSX, useState } from 'react';
import { SortOffersType, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortType } from '../../store/action';

export default function SortOptions(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector((state) => state.sortType);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (type: SortType) => {
    dispatch(changeSortType(type));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {Object.values(SortOffersType).map((type) => (
          <li
            key={type}
            className={`places__option ${currentSort === type ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortChange(type as SortType)} // приведение типа — безопасно
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}
