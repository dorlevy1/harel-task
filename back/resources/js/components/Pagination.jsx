const decodeLabel = (label) => {
    return label
        .replace(/&laquo;/g, '\u00AB')
        .replace(/&raquo;/g, '\u00BB')
        .replace(/&amp;/g, '&');
};

const Pagination = ({ meta, onPageChange }) => {
    if (!meta || meta.last_page <= 1) return null;

    const handlePageClick = (page) => () => page && onPageChange(Number(page));

    return (
        <div className="flex justify-center gap-2 mt-6">
            {meta.links.map((link, i) => {
                const page = link.url ? new URL(link.url, window.location.origin).searchParams.get('page') : null;
                return (
                    <button
                        key={i}
                        disabled={!link.url || link.active}
                        onClick={handlePageClick(page)}
                        className={`px-3 py-1.5 text-sm rounded-md ${
                            link.active
                                ? 'bg-blue-600 text-white'
                                : link.url
                                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {decodeLabel(link.label)}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
