import React, {useState, useEffect, useRef} from 'react';

const Sort = (props) => {
    const [sortByValue, setSortByValue] = useState(null);
    const [showSortDropDown, setShowSortDropDown] = useState(false);
    const sortByList = ['Thriller', 'Action', 'Comedy', 'Adventure'];
    const sortValueRef = useRef(null);
    const clearSortRef = useRef(null);

    const onSortByItemClick = (genre) => {
        setSortByValue(genre);
        setShowSortDropDown(false);
    };

    // open sort dropdown && clear sort
    useEffect(() => {
        const showSortDropDownFunc = (event) => {
            setShowSortDropDown(!showSortDropDown);
        };

        const clearSort = () => {
            setSortByValue(null);
        };

        const clickOnSortValue = (event) => {
            clearSortRef.current && clearSortRef.current.contains(event.target) ? clearSort() : showSortDropDownFunc();
        };

        const sortValueContainer = document.querySelector('.sort__value');
        sortValueContainer && sortValueContainer.addEventListener('click', clickOnSortValue);

        return () => sortValueContainer && sortValueContainer.removeEventListener("click", clickOnSortValue);
    }, [sortByValue, showSortDropDown]);


    // hide dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            !sortValueRef.current.contains(event.target) && showSortDropDown && setShowSortDropDown(false);
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [showSortDropDown]);


    return (
        <div className="sort-wrap">
            <div className='sort'>
                <div className='sort__value' ref={sortValueRef}>
                    <span>{sortByValue ? sortByValue : 'Sort by'}</span>
                    {sortByValue &&
                    <div className="sort__clear" ref={clearSortRef}>
                        <div></div>
                        <div></div>
                    </div>}
                </div>
                {showSortDropDown && <ul className='sort__dropdown'>
                    {sortByList.map((genre, index) =>
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

export default Sort;
