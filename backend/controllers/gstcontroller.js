import { validateGST } from "../middleware/validateGstData";
import gstReturn from "../models/gstreturn";
import { calculateGST } from "../services/gstCalculator";
export const createGST = async (req,res) => {
    try {
        validateGST(req.body);
        
        const tax = calculateGST(req.body);

        const gstreturn = await gstReturn.create({
            ...req.body,
            ...tax,
            status: "READY_FOR_FILLING"
        });

        res.status(201).json(gstreturn);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

