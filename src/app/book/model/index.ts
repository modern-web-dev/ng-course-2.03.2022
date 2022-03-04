export interface Book {
  id: number|undefined;
  author: string;
  title: string;
}


// export interface Book {
//   id: number;
//   author: Author;
//   details: BookDetails;
//   title: string;
// }
// export interface BookDetails{
//   pages: number;
// }
//
// export interface Author {
//   firstname:string
//   lastname:string
// }
export type BookProperties = Omit<Book, "id">;
