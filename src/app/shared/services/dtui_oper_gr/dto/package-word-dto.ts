import { WordResponseDto } from "./word-response-dto";

export interface PackageWordDto {
    label: string;
    maxlevel: string;
    message: WordResponseDto[];
    packageId: string;
}
