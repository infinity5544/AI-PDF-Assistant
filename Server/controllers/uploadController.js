import { createDocumentFromPDF } from "../services/documentService.js";

export async function uploadPDF(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF.",
            });
        }

        const document = await createDocumentFromPDF(req.file);

        res.status(201).json({
            success: true,
            message: "PDF uploaded successfully.",
            document,
        });

    } catch (error) {
        next(error);
    }
}