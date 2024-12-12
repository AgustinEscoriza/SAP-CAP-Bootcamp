namespace my.bookshop;

entity Books {
    key ID           : Integer;
        title        : String;
        stock        : Integer;
        isBestSeller : Boolean;
} actions {
    action   buyBook()  returns String;
    function getStock() returns Integer;
}
