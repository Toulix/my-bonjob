import { Candidate } from "./candidate";

export interface CandidateListResponse {
    total: number;
    items: Candidate[];
}