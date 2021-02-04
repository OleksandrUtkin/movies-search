import React, {useState, useEffect, useRef} from 'react';

const Filter = ({genresList, setGenreFilterId, setCurrentPage}) => {
    const filterByList = ['Thriller', 'Action', 'Comedy', 'Adventure'];
    const [filterByValue, setFilterByValue] = useState(null);
    const [showSortDropDown, setShowSortDropDown] = useState(false);

    const filterValueRef = useRef(null);
    const clearSortRef = useRef(null);

    const onSortByItemClick = (genre) => {
        setCurrentPage(1);
        setFilterByValue(genre);
        setShowSortDropDown(false);
        setGenreFilterId(genresList.filter(genreObj => genreObj.name === genre)[0].id);
    };

    // open filter dropdown && clear sort
    useEffect(() => {
        const showSortDropDownFunc = (event) => {
            setShowSortDropDown(!showSortDropDown);
        };

        const clearSort = () => {
            setCurrentPage(1);
            setFilterByValue(null);
            setGenreFilterId(false);
        };

        const clickOnSortValue = (event) => {
            clearSortRef.current && clearSortRef.current.contains(event.target) ? clearSort() : showSortDropDownFunc();
        };

        const sortValueContainer = document.querySelector('.sort__value');
        sortValueContainer && sortValueContainer.addEventListener('click', clickOnSortValue);

        return () => sortValueContainer && sortValueContainer.removeEventListener("click", clickOnSortValue);
    }, [filterByValue, showSortDropDown, setCurrentPage, setGenreFilterId]);

    // hide filter dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            !filterValueRef.current.contains(event.target) && showSortDropDown && setShowSortDropDown(false);
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [showSortDropDown]);


    return (
        <div className="sort-wrap">
            <div className='sort'>
                <div className='sort__value' ref={filterValueRef}>
                    <span>{filterByValue ? filterByValue : 'Genres'}</span>
                    {filterByValue &&
                        <div className="sort__clear" ref={clearSortRef}>
                            <div></div>
                            <div></div>
                        </div>
                    }
                </div>
                {showSortDropDown && <ul className='sort__dropdown'>
                    {filterByList.map((genre, index) =>
                        <li
                            key={genre + index}
                            onClick={() => onSortByItemClick(genre)}>
                            {genre}
                        </li>
                    )}
                </ul>}
            </div>
        </div>
    );
};

export default Filter;
