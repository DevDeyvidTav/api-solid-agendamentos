export interface IScheduleCreate {
    name: string;
    phone: string;
    date: Date;
    user_id: string;
}
export interface IScheduleUpdate {
    id: string;
    phone: string;
    date: Date;
    name: string;
}