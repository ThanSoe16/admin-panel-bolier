"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/features/base/hooks/useDebounce";
import { usePagination } from "@/features/base/hooks/usePagination";
import { useGetInvoiceUserSpecification } from "@/features/invoice/services/mutations";
import {
  useGetInvoiceUserDetail,
  useGetInvoiceUsers,
} from "@/features/invoice/services/queries";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Flex } from "@radix-ui/themes";
import { ArrowRight, CircleChevronUp, CircleX } from "lucide-react";
import { useState } from "react";

const UserBlogInput = ({ form }: { form: any }) => {
  const { query, setWord } = usePagination();
  const [inputFocus, setInputFocus] = useState(false);
  const debouncedSearch = useDebounce(query.word, 500);

  const lastInvoiceSpecification = useGetInvoiceUserSpecification();

  const invoiceUsers = useGetInvoiceUsers({
    word: debouncedSearch,
    pageIndex: query.pageIndex,
    rowPerPage: 100,
  });

  const invoiceUserDetail = useGetInvoiceUserDetail(
    form.watch("merchantBlogId")
  );

  return (
    <div>
      {form.watch("oneSiteUserId") ? (
        <Flex
          align="center"
          justify="between"
          className="px-4 py-4 border-2 border-primary bg-secondary rounded-2xl"
        >
          <div className="">
            <div className="font-semibold text-base">
              {invoiceUserDetail?.data?.body?.data?.BlogNameAndLogo[0]?.name ??
                ""}
            </div>
            <div className="text-sm text-primary pt-1">
              {!!invoiceUserDetail?.data?.body?.data?.blogDomain
                ? invoiceUserDetail?.data?.body?.data?.blogDomain
                : !!invoiceUserDetail?.data?.body?.data?.previewDomain
                ? invoiceUserDetail?.data?.body?.data?.previewDomain
                : "-"}
            </div>
            <Flex align="center" className="gap-2 pt-2">
              <Avatar className="w-8 h-8 bg-muted flex items-center justify-center">
                <AvatarImage
                  src={
                    invoiceUserDetail?.data?.body?.data?.OneSiteUser?.image ??
                    ""
                  }
                  className="w-8 h-8"
                />
                <AvatarFallback>
                  {invoiceUserDetail?.data?.body?.data?.OneSiteUser?.username
                    .charAt(0)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                {invoiceUserDetail?.data?.body?.data?.OneSiteUser?.username}
              </div>
            </Flex>
          </div>
          <CircleX
            className="text-foreground"
            size={18}
            onClick={() => {
              form.reset();
              form.setValue("CPU", "");
              setWord("");
            }}
          />
        </Flex>
      ) : (
        <Command
          className={cn(inputFocus ? "h-[360px]" : "h-12", "w-full relative ")}
        >
          <div className="relative">
            <input
              placeholder="Search by blog name, domain or username"
              onFocus={() => setInputFocus(true)}
              value={query.word}
              onChange={(e) => setWord(e.target.value)}
              className={cn(
                "border-border",
                "peer flex h-12 w-full rounded-xl border px-3 py-1 text-sm md:text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-gray-400 placeholder:text-sm focus:placeholder-white focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
            {query.word && (
              <CircleX
                className="absolute right-3 top-3.5 text-foreground h-5 w-5 cursor-pointer"
                onClick={() => setWord("")}
              />
            )}
            {!query.word && inputFocus && (
              <CircleChevronUp
                className="absolute right-3 top-3.5 text-primary h-5 w-5 cursor-pointer"
                onClick={() => setInputFocus(false)}
              />
            )}
          </div>

          {inputFocus && (
            <CommandList className="absolute top-14 z-50 bg-white shadow w-full border rounded-xl h-[352px] overflow-auto">
              <CommandEmpty>No results found.</CommandEmpty>
              {invoiceUsers.data?.body?.data.map((user) => (
                <CommandItem className="border-b" key={user.id}>
                  <Flex
                    align="center"
                    justify="between"
                    className="w-full pr-2"
                    onClick={() => {
                      lastInvoiceSpecification
                        .mutateAsync(user.id)
                        .then((res) => {
                          form.setValue("CPU", res.body?.data?.CPU.toString());
                          form.setValue("RAM", res.body?.data?.RAM.toString());
                          form.setValue(
                            "Storage",
                            res.body?.data?.Storage.toString()
                          );
                        })
                        .finally(() => {
                          form.setValue("oneSiteUserId", user.OneSiteUser.id);
                          form.setValue("merchantBlogId", user.id);
                          setInputFocus(false);
                          form.trigger();
                        });
                    }}
                  >
                    <div className="px-3 py-2">
                      <div className="font-semibold text-base">
                        {user.BlogNameAndLogo[0]?.name ?? ""}
                      </div>
                      <div className="text-sm text-primary pt-1">
                        {!!user.blogDomain
                          ? user.blogDomain
                          : !!user.previewDomain
                          ? user.previewDomain
                          : "-"}
                      </div>
                      <Flex align="center" className="gap-2 pt-2">
                        <Avatar className="w-8 h-8 bg-muted flex items-center justify-center">
                          <AvatarImage
                            src={user.OneSiteUser?.image ?? ""}
                            className="w-8 h-8"
                          />
                          <AvatarFallback>
                            {user.OneSiteUser?.username.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          {user.OneSiteUser?.username}
                        </div>
                      </Flex>
                    </div>
                    <ArrowRight className="text-primary min-w-5 min-h-5" />
                  </Flex>
                </CommandItem>
              ))}
            </CommandList>
          )}
        </Command>
      )}
    </div>
  );
};
export default UserBlogInput;
