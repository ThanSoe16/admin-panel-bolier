import formatAnchorTagValue from "@/utils/formatAnchorTagValue";
import Quill from "quill";
import "react-quill-new/dist/quill.snow.css";
const Link = Quill.import("formats/link") as any;

class CustomLinkBlot extends Link {
  static sanitize(url: string, protocols: string[]) {
    const formattedUrl = formatAnchorTagValue(url);
    return formattedUrl;
  }
}

export default CustomLinkBlot;
