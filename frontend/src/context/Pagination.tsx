interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

function getVisiblePages(current: number, total: number): (number | string)[] {
    const pages: (number | string)[] = [];

    const showLeftDots = current > 4;
    const showRightDots = current < total - 3;

    if (!showLeftDots) {
        // Near the start
        for (let i = 1; i <= Math.min(5, total); i++) pages.push(i);
        if (total > 6) {
            pages.push('...');
            pages.push(total);
        }
    } else if (!showRightDots) {
        // Near the end
        pages.push(1);
        pages.push('...');
        for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
        // In the middle
        pages.push(1);
        pages.push('...');
        pages.push(current - 1, current, current + 1);
        pages.push('...');
        pages.push(total);
    }

    return pages;
}


const Pagination = ({currentPage, totalPages, pageSize, onPageChange, onPageSizeChange}:PaginationProps) => {
    const visiblePages = getVisiblePages(currentPage, totalPages);

    return (
        <div className="flex item-center justify-center mt-4">
            <button disabled={currentPage === 1}  onClick={() => onPageChange(currentPage - 1)}>Previous</button>

                {visiblePages.map((page, index) =>
                    typeof page === 'string' ? (
                        <span key={`dots-${index}`} className="px-2">...</span>
                    ) : (
                        <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        disabled={currentPage === page}
                        className={`px-2 ${page === currentPage ? 'font-bold underline' : ''}`}
                        >
                        {page}
                        </button>
                    )
                )}


                <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>

                <br />
                <label>
                    Results per page:
                    <select value={pageSize} onChange={(p) => {onPageSizeChange(Number(p.target.value));
                        onPageChange(1);
                    }}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </label>
        </div>
    );
}
export default Pagination