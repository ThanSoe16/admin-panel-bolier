'use client'
import { useGetLandingLanguages } from '@/features/landing-languages/services/queries'

const useGetLandingEngLanguageId = () => {
  const { data: landingLanguages } = useGetLandingLanguages()
  return landingLanguages?.body?.data?.find((lang) => lang.key === "en")?.id ?? ""
}

export default useGetLandingEngLanguageId