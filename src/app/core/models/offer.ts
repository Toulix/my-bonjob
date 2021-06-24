export interface Offer {
    id: number;
    title: string;
    image: string;
    level: string;
    experience: number;
    location: string;
    contrat: string;
    nbHour: number;
    salary: number;
    startDate: Date;
    description: string;
    status: string;
    applications?: number;
}