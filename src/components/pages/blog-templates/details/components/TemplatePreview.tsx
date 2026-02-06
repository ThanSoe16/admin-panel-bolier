"use client";
import { useState } from "react";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CurrencyFormat } from "@/utils/currencyFormat";
import { Button } from "@/components/ui/button";

interface Props {
  onClose: () => void;
  templateData: TemplateData;
}

interface Page {
  id: string;
  name: string;
  url: string;
}

type ViewKey = "pc" | "tablet" | "mobile";

interface TemplateData {
  name: string;
  price: number;
  views: {
    //eslint-disable-next-line
    [key in ViewKey]: {
      pages: Page[];
    };
  };
  pages: Page[];
}

export default function TemplatePreview(props: Props) {
  const [currentView, setCurrentView] = useState<ViewKey>("pc");
  const [selectedPage, setSelectedPage] = useState<string>(
    props.templateData?.pages[0]?.id
  );

  const templateData = props.templateData;

  return (
    <div className="w-full relative">
      <div className="w-full p-2">
        <div className="flex flex-row justify-between  w-full items-center px-4 -mt-4 md:px-20">
          <div className="flex gap-4">
            {(["pc", "tablet", "mobile"] as const).map((view) => (
              <button
                key={view}
                className={`p-2 rounded-[8px] text-[#4B4B4B] ${
                  currentView === view
                    ? "bg-brand-secondary text-white "
                    : "bg-[#F7F7F7]"
                }`}
                onClick={() => setCurrentView(view)}
              >
                {view === "pc" ? (
                  <Icons.Laptop
                    className={cn(
                      "w-4 h-4 md:w-6 md:h-6",
                      currentView === "pc" && "text-[#2663FF]"
                    )}
                  />
                ) : view === "tablet" ? (
                  <Icons.Tablet
                    className={cn(
                      "w-4 h-4 md:w-6 md:h-6",
                      currentView === "tablet" && "text-[#2663FF]"
                    )}
                  />
                ) : (
                  <Icons.Mobile
                    className={cn(
                      "w-4 h-4 md:w-6 md:h-6",
                      currentView === "mobile" && "text-[#2663FF]"
                    )}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 overflow-x-scroll scrollbar-hide flex-1 ">
            {templateData.pages.map((page, index) => (
              <button
                key={page.id}
                className={`w-fit px-3 py-1 cursor-pointer shrink-0 text-sm md:text-base leading-[24px] font-bold ${
                  selectedPage === page.id
                    ? "border-b-3 border-[#1859FF] "
                    : "text-default-secondary"
                }`}
                onClick={() => {
                  setSelectedPage(page.id);
                  const container = document.querySelector(
                    ".scrollable-container"
                  );
                  if (container) {
                    const buttons = container.querySelectorAll("button");
                    const targetButton = buttons[index];
                    if (targetButton) {
                      targetButton.scrollIntoView({
                        behavior: "smooth",
                        inline: "center",
                      });
                    }
                  }
                }}
              >
                {page.name}
              </button>
            ))}
          </div>

          <Button
            variant={"ghost"}
            className=" bg-[#E6E6E6] w-12 h-12 flex justify-center items-center rounded-xl"
            onClick={() => props.onClose()}
          >
            <Icons.Close className="w-6 h-6 text-default" />
          </Button>
        </div>

        <div className="mt-4 max-h-[70vh] overflow-y-scroll scrollbar-hide">
          {templateData.views[currentView].pages.find(
            (page) => page.id === selectedPage
          )?.url ? (
            <Image
              src={
                templateData.views[currentView].pages.find(
                  (page) => page.id === selectedPage
                )?.url || ""
              }
              alt={`${selectedPage} preview`}
              width={3280}
              height={2160}
              className="w-full max-w-2xl h-full mx-auto rounded-lg shadow-md"
            />
          ) : null}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 bg-[#181818] w-full p-4 md:px-[40px] xl:px-[120px] h-fit">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <Image
              src={
                templateData.views[currentView].pages.find(
                  (page) => page.id === selectedPage
                )?.url || ""
              }
              alt={`${selectedPage} preview`}
              width={3280}
              height={2160}
              className="w-[90px] h-[64px] object-center object-cover rounded-[8px]"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm md:text-base leading-[24px] text-[#B9B9B9]">
                Video & Images of
              </p>
              <p className="text-sm md:text-base leading-[24px] text-white font-semibold">
                {" "}
                {templateData.name}{" "}
              </p>
            </div>
          </div>
          <p className="font-semibold text-base md:text-xl leading-[28px] lg:leading-[40px] text-white">
            ${CurrencyFormat(templateData.price)}
          </p>
        </div>
      </div>
    </div>
  );
}
