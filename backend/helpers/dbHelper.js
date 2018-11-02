module.exports = {

    paging: function(aggregation, nPerPage, actualPage){
        return aggregation.skip(actualPage > 0 ? ((actualPage-1)*nPerPage ):0)
            .limit(nPerPage)
    }
    
}