export const uploadPDF = (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No PDF uploaded"
        });
    }

    res.status(200).json({
        success: true,
        message: "PDF Uploaded Successfully",
        file: req.file.filename
    });

};