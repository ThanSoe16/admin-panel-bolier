import { DetailTable } from "@/components/shared/detail-table";
import { TemplateDetailsData } from "@/features/blog-templates/types";

const PageMeta = ({ data }: { data: TemplateDetailsData }) => {
  return (
    <div>
      <DetailTable
        title="Supported Page Sections"
        data={data.PageMeta.map((item) => ({
          label: item.name,
          value: item.providedSection.join(", "),
        }))}
      />
    </div>
  );
};
export default PageMeta;
