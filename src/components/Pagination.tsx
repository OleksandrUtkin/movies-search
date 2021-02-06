import React from 'react';

interface PropsTypes {
    moviesPages: number[]
    currentPage:  number
    setCurrentPage: (page : number) => void
}

const Pagination: React.FC<PropsTypes> = ({moviesPages, currentPage, setCurrentPage}) => {

    return (
        <div className='pagination'>
            <button
                className={currentPage > 1 ? 'pagination__prev' : 'pagination__prev pagination__prev_disabled'}
                onClick={() => setCurrentPage(--currentPage)}>
                Prev
            </button>
            {moviesPages.slice(currentPage > 1 ? currentPage - 2 : currentPage - 1, currentPage > 1 ? currentPage + 1 : currentPage + 2)
                .map(page =>
                    <button
                        key={page}
                        className={page === currentPage ? 'pagination__btn pagination__btn_active' : 'pagination__btn'}
                        onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
            )}
            <button
                className={currentPage < moviesPages.length ? 'pagination__next' : 'pagination__next pagination__next_disabled'}
                onClick={() => setCurrentPage(++currentPage)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
