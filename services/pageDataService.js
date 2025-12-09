

const pageData=(page,expenses_per_page,totalExpenses)=>{

    const pageData={
        currentPage:page,                                     // Which page user is currently on
        hasNextPage: expenses_per_page* page < totalExpenses, // If more pages exist ahead
        nextPage:page+1,                                      // Page number to go forward
        hasPreviousPage:page>1,                               // If a page exists before current one
        previousPage:page-1,                                  // Page number to go back
        total:totalExpenses,                                  // Total number of expense records in DB
        lastPage:Math.ceil(totalExpenses/expenses_per_page)   // Total number of pages available
    }

    return pageData;
}

module.exports={pageData};