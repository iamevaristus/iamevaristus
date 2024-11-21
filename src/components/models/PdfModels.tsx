import { Metadata } from "pdfjs-dist/types/src/display/metadata";

export interface PDFResponse {
    pdf: string;
    title: string;
    metadata: Metadata;
    info: Object;
    pages: number | undefined;
}

export interface PDFOptions {
    document: string;
    canvas: HTMLCanvasElement | null;
    scale?: number;
    page?: number;
}