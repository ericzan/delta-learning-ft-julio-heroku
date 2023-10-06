export interface WordResponseDto {
    additional: AdditionalWordDto[];
    position: number;
    pronunciation: PronunciationWordDto;
    tranlate: string[];
    word: string;
}
export interface PronunciationWordDto{
    example: string;
    pronunciation: number;
    target: string;
}
export interface AdditionalWordDto{
    apply_link: boolean;
    link: string;
    position: string;
    title: string[];
    type: string;
}