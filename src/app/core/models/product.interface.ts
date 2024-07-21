export interface ProductInterface {
  id: string ;
  name: string | null;
  description: string | null;
  logo: string | null;
  date_release: string | null;
  date_revision: string| null;
  }
  export interface ResponseGetAllProducts{
    data:ProductInterface[];
  }

  export interface ProductUpdateInterface {
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
  }

  

  export interface ResponseAddProduct{
    message:string;
    data:ProductInterface;
  }
  export interface ResponseUpdateProduct{
    message:string;
    data:ProductUpdateInterface;
  }
  export interface GenericResponse{
    message:string;
  }