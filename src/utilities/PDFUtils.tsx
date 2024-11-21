import { getDocument, getFilenameFromUrl, PageViewport, PDFDocumentProxy } from "pdfjs-dist";
import { PDFException } from "../components/exception/PDFException";
import { PDFOptions, PDFResponse } from "../components/models/PdfModels";

export class PDFUtils {
    static async getPdf(options: PDFOptions, onProgress?: (progress: number) => void): Promise<PDFResponse | undefined> {
        if (!options.document || !options.canvas) return;

        try {
            onProgress && onProgress(0); // Start progress

            // Load the document using pdfjs-dist
            const loadingTask = getDocument(options.document);
            onProgress && onProgress(20); // Document loading started

            const pdf: PDFDocumentProxy = await loadingTask.promise;
            onProgress && onProgress(50); // Document loaded

            // Prepare canvas and context
            const scale = options.scale || 1; // Use default scale of 1 if not provided
            const canvas = options.canvas;
            const context = canvas.getContext('2d');

            if (!context) return;

            const pageNumber = options.page ?? 1; // Default to the first page
            const page = await pdf.getPage(pageNumber);
            onProgress && onProgress(60); // Page retrieved

            // Get viewport for the page
            const viewport: PageViewport = page.getViewport({ scale });
            onProgress && onProgress(70); // Viewport calculated

            // Set canvas size based on the viewport
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            onProgress && onProgress(80); // Canvas resized

            // Define the render context
            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            // Render the page to the canvas
            await page.render(renderContext).promise;
            onProgress && onProgress(90); // Page rendered

            // Convert the canvas to a data URL
            const imgSrc = canvas.toDataURL();
            onProgress && onProgress(95); // Data URL generated

            // Retrieve metadata from the PDF
            const data = await pdf.getMetadata();
            onProgress && onProgress(100); // Metadata retrieved

            return {
                pdf: imgSrc,
                title: await this.getTitle(options.document, pdf),
                metadata: data.metadata,
                info: data.info,
                pages: pdf.numPages // Include total number of pages
            };

        } catch (error) {
            throw new PDFException(`${error ?? "Couldn't get pdf url"}`);
        }
    }

    static async readPdf(url: string, onProgress?: (progress: number) => void): Promise<PDFResponse | undefined> {
        try {
            onProgress && onProgress(0); // Start progress

            // Load the url using pdfjs-dist
            const loadingTask = getDocument(url);
            onProgress && onProgress(20); // Document loading started

            const pdf: PDFDocumentProxy = await loadingTask.promise;
            onProgress && onProgress(50); // Document loaded

            // Prepare canvas and context
            const scale = 1; // Use default scale of 1 if not provided
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d');

            if (!context) return;

            const page = await pdf.getPage(1);
            onProgress && onProgress(60); // Page retrieved

            // Get viewport for the page
            const viewport: PageViewport = page.getViewport({ scale });
            onProgress && onProgress(70); // Viewport calculated

            // Set canvas size based on the viewport
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            onProgress && onProgress(80); // Canvas resized

            // Define the render context
            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            // Render the page to the canvas
            await page.render(renderContext).promise;
            onProgress && onProgress(90); // Page rendered

            // Convert the canvas to a data URL
            const imgSrc = canvas.toDataURL();
            onProgress && onProgress(95); // Data URL generated

            // Retrieve metadata from the PDF
            const data = await pdf.getMetadata();
            onProgress && onProgress(100); // Metadata retrieved

            return {
                pdf: imgSrc,
                title: await this.getTitle(url, pdf),
                metadata: data.metadata,
                info: data.info,
                pages: pdf.numPages // Include total number of pages
            };

        } catch (error) {
            throw new PDFException(`${error ?? "Couldn't get pdf url"}`);
        }
    }

    static async getTitle(document: string, pdfDocument: PDFDocumentProxy): Promise<string> {
        let title = getFilenameFromUrl(document) || document;

        try {
            return decodeURIComponent(title);
        } catch {
            const titled = await pdfDocument.getMetadata();
            const metadata = titled.metadata;

            if (metadata && metadata.has("dc:title")) {
                const title = metadata.get("dc:title");
                // Ghostscript sometimes returns 'Untitled', so prevent setting the
                // title to 'Untitled.
                if (title !== "Untitled") {
                    return title;
                }
            }
        }

        return ""
    }
}