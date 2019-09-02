export interface  User{
    id?:number;
    name:string;
    age:number;
    sex:'male'| 'female';
    location:string;
    generalInfo:string;
    favoriteDogs: number[];
}