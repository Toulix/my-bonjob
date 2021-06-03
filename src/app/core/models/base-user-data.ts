import { Experience } from "./experience"
import { Formation } from "./fomations"
import { Language } from "./language"
import { Others } from "./others"

export interface BaseUserData {
    user?: {
        firstname?: string;
        lastname?: string;
        email?: string;
        profil?: string;
        description?: string;
        video?: string;
        pjs?: {name: string,url: string }[];
        galeries?: {name: string, url: string}[];
        experiences?: Experience[];
        formations?: Formation[]
        languages?: Language[];
        others?: Others;
    }
} 