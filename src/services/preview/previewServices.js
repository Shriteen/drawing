import BasePreview from "./BasePreview";
import RectanglePreview from "./RectanglePreview";
import CirclePreview from "./CirclePreview";
import LinePreview from "./LinePreview";
import PenPreview from "./PenPreview";
import EraserPreview from "./EraserPreview";
import TextPreview from "./TextPreview";

const previewServices = {
    "rectangle": RectanglePreview,
    "circle": CirclePreview,
    "line": LinePreview,
    "pen": PenPreview,
    "eraser": EraserPreview,
    "text": TextPreview
};

export default previewServices;
