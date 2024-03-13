import { remark } from "remark";
import html from "remark-html";

async function MdComponent(content: string) {
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return contentHtml;
}
export default MdComponent;
