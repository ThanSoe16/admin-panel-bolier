import { z } from "zod"

export const saleHistoryFilter = z.object({
  start:z.string().optional(),
  end:z.string().optional(),
  pageIndex:z.number().optional(),
  rowPerPage:z.number().optional(),
  word:z.string().optional(),
})
export type SaleHistoryFilter = z.infer<typeof saleHistoryFilter>;