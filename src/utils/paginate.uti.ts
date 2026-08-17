export function paginate(
    items: any[],
    page: number,
    limit: number,
    length: number
){
       if (length === 0) {
        return { items: [], totalPages: 0, currentPage: 0 };
    }

    const startIndex = page * limit + 1;
    const endIndex = Math.min(startIndex + limit - 1, length);

    return {
        items,
        pages: Math.ceil(length / limit),
        pageRange: `${startIndex}-${endIndex} of ${length}`,
    };

}