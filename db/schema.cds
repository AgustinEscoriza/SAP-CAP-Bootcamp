using {my.bookshop as my} from './Books';

service MyService @(path: '/test') {
  entity Books as projection on my.Books;
  function calculateTotalStock() returns Integer;
  action   resetAllBooks()       returns String;
}
