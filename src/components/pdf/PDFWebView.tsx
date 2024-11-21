import React from "react";
import { PDFUtils } from "../../utilities/PDFUtils";
import { PDFOptions, PDFResponse } from "../models/PdfModels";

interface PDFWebViewProps {
    document: string;
    scale?: number;
    height?: number | string;
    width?: number | string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    style?: React.CSSProperties;
    canvasWidth?: string;
    canvasHeight?: string;
    canvasStyle?: React.CSSProperties;
    loader?: React.ReactNode;
}

export const PDFWebView: React.FC<PDFWebViewProps> = ({
    document,
    scale = 1,
    height = "auto",
    width = "auto",
    objectFit = 'cover',
    style,
    canvasHeight = "100%",
    canvasWidth = "100%",
    canvasStyle,
    loader
}) => {
    const [pageCount, setPageCount] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(true);
    const canvasRefs = React.useRef<(HTMLCanvasElement | null)[]>([]);
    const [documentUrls, setDocumentUrls] = React.useState<string[]>([]);

    React.useEffect(() => {
        const loadPDF = async () => {
            try {
                setLoading(true);
                // Load PDF and get response for all pages
                const response: PDFResponse | undefined = await PDFUtils.readPdf(document);

                if (response) {
                    setPageCount(response.pages || 1);
                }
            } catch (error) {
                console.error("Error loading PDF:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPDF();
    }, [document]);

    React.useEffect(() => {
        // Render each page on its respective canvas
        const renderPages = async () => {
            const urls: string[] = [];

            for (let i = 0; i < pageCount; i++) {
                if (canvasRefs.current[i]) {
                    const options: PDFOptions = {
                        document: document,
                        canvas: canvasRefs.current[i],
                        page: i + 1, // Page numbers start from 1
                        scale: scale,
                    };

                    const response = await PDFUtils.getPdf(options);
                    if(response) {
                        urls.push(response.pdf)
                    }
                }
            }

            setDocumentUrls(urls)
        };

        if (pageCount > 0) {
            renderPages();
        }
    }, [pageCount, document, scale]);

    const imgStyle: React.CSSProperties = {
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
        objectFit: objectFit,
        ...style
    };

    const canStyle: React.CSSProperties = {
        width: canvasWidth,
        height: canvasHeight,
        ...canvasStyle
    }


    if(loading) {
        return (
            loader || <p>Loading PDF...</p>
        )
    } else {
        return (
            <React.Fragment>
                {Array.from({ length: pageCount }, (_, index) => (
                    <canvas key={index} ref={el => (canvasRefs.current[index] = el)} style={canStyle}>
                        <img src={documentUrls[index]} style={imgStyle}  />
                    </canvas>
                ))}
            </React.Fragment>
        )
    }
};