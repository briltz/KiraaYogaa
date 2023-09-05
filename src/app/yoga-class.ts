export interface YogaClass {
    date: Date,
    type: string,
    duration: string,
    price?: number
    viewOnly?: boolean,
    link?: string,
    location?: string
}