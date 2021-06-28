import { Experience } from "src/app/core/models/experience";
import { Formation } from "src/app/core/models/fomations";
import { Language } from "src/app/core/models/language";
import { Others } from "src/app/core/models/others";

export interface CandidateListResponse {
    total: number,
    items: [{
        id?: number,
        firstname?: string,
        lastname?: string,
        email?: string,
        profil?: string,
        description?: string,
        video?: string,
        pjs?: { name: string, url: string }[],
        galeries?: { name: string, url: string }[],
        experiences?: Experience[],
        formations?: Formation[],
        languages?: Language[],
        others?: Others,
    }]
}