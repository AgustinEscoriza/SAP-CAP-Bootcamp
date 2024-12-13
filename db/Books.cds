namespace my.bookshop;

entity Books {
    key ID           : Integer;
        title        : String;
        stock        : Integer;
        isBestSeller : Boolean;
}

entity Author {
    name : String;
}
