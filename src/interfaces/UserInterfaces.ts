export interface Icreate {
    name: string;
    email: string;
    password: string;
}

export interface Iupdate {
    email: string;
    newPassword: string;
}

export interface IAuth {
    email: string;
    password: string;
}