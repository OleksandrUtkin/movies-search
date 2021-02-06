import React, { useState, useEffect, useRef } from "react";

interface propsTypes {
  genresList: { id: number; name: string }[];
  setGenreFilterId: (id: number | false) => void;
  setCurrentPage: (page: number) => void;
}

const Filter: React.FC<propsTypes> = ({
  genresList,
  setGenreFilterId,
  setCurrentPage,
}) => {
  const filterByList = ["Thriller", "Action", "Comedy", "Adventure"];
  const [filterByValue, setFilterByValue] = useState<boolean | string>(false);
  const [showSortDropDown, setShowSortDropDown] = useState(false);
  const filterValueRef = useRef<HTMLDivElement>(null);
  const clearSortRef = useRef<HTMLDivElement>(null);

  const onSortByItemClick = (genre: string | false) => {
    setCurrentPage(1);
    setFilterByValue(genre);
    setShowSortDropDown(false);
    setGenreFilterId(
      genresList.filter((genreObj) => genreObj.name === genre)[0].id
    );
  };

  const showSortDropDownFunc = () => {
    setShowSortDropDown(!showSortDropDown);
  };

  const clearSort = () => {
    setCurrentPage(1);
    setFilterByValue(false);
    setGenreFilterId(false);
  };

  const clickOnSortValue = (event: React.SyntheticEvent<HTMLDivElement>) => {
    clearSortRef.current && clearSortRef.current.contains(event.target as Node)
      ? clearSort()
      : showSortDropDownFunc();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterValueRef.current)
        !filterValueRef.current.contains(event.target as Node) &&
          showSortDropDown &&
          setShowSortDropDown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSortDropDown]);

  return (
    <div className="sort-wrap">
      <div className="sort">
        <div
          className="sort__value"
          ref={filterValueRef}
          onClick={clickOnSortValue}
        >
          <span>{filterByValue ? filterByValue : "Genres"}</span>
          {filterByValue && (
            <div className="sort__clear" ref={clearSortRef}>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
        {showSortDropDown && (
          <ul className="sort__dropdown">
            {filterByList.map((genre, index) => (
              <li key={genre + index} onClick={() => onSortByItemClick(genre)}>
                {genre}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter;
