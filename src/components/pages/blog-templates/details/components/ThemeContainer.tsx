import { TemplateDetailsData } from "@/features/blog-templates/types";
import { Flex, Grid } from "@radix-ui/themes";

const ThemeContainer = ({ data }: { data: TemplateDetailsData }) => {
  return (
    <div>
      <div className="w-full flex items-center justify-center h-14 font-bold break-words whitespace-normal bg-brand-secondary px-3 py-4 text-default text-center normal-text shadow">
        Theme Data
      </div>
      <Grid
        columns={{ initial: "1", md: "2" }}
        className="gap-4 border divide-x divide-y"
      >
        {data.colors.map((item, index) => (
          <div className="p-4" key={index}>
            <div className="font-bold pb-4">{item.name}</div>
            {item.colorCode.map((color, index) => (
              <Grid align={"center"} key={index} gap="2" className="pl-6">
                <div className="font-bold text-sm">{color.name}</div>
                <Flex
                  direction="column"
                  justify={"center"}
                  align={"center"}
                  className="w-[70px]"
                >
                  <div
                    style={{
                      backgroundColor: color.code,
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  <div className="text-center text-sm">{color.code}</div>
                </Flex>
              </Grid>
            ))}
          </div>
        ))}
      </Grid>
    </div>
  );
};
export default ThemeContainer;
