export const validateGST = (req, res, next) => {
    const {gstin, sales, purchase } = req.body;
    if (!data.gstin || data.gstin.length !== 15) {
        throw new Error("Invalid GSTIN");
    } 

    if (purchase < 0 || sales < 0) {
        throw new Error("Negative Values are not allowed");  
    }

    next();
};

