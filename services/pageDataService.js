

const pageData=(page,expenses_per_page,totalExpenses)=>{

    const pageData={
        currentPage:page,
        hasNextPage: expenses_per_page* page < totalExpenses,
        nextPage:page+1,
        hasPreviousPage:page>1,
        previousPage:page-1,
        total:totalExpenses,
        lastPage:Math.ceil(totalExpenses/expenses_per_page)
    }

    return pageData;
}

module.exports={pageData};