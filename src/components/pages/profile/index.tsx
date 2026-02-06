"use client"
import React, { useState } from 'react'
import PageTitle from '@/components/shared/PageTitle'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { useGetMe } from '@/features/auth/service/queries'
import { Loading } from '@/components/shared/loading'
import Status from '@/components/shared/Status'
import { Button } from '@/components/ui/button'
import { LogOut, Pencil } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import LogoutDialog from '@/components/shared/LogoutDialog'
import { toSentenceCase } from '@/utils/toSentenceCase'

const Profile = () => {
  const { data, isLoading } = useGetMe();
  const [ open, setOpen ] = useState(false);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className=''>
      <PageTitle>  Profile </PageTitle>
      <Card>
        <CardContent >
          <div className='flex flex-row gap-4 justify-start items-start'>
            <Avatar className='w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full object-cover' >
              <AvatarImage src={data?.body?.data?.Avatar?.url} alt="admin" />
              <AvatarFallback>
                <Image
                  src={"/images/user.svg"}
                  width={240}
                  height={240}
                  alt="avatar"
                  className='w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full object-cover'
                />
              </AvatarFallback>
            </Avatar>

            <div className='flex flex-col justify-start items-start gap-2'>
              <p className='text-default font-bold text-xl md:text-2xl '> {data?.body?.data?.name} </p>
              <Status
                showGreenDot={Boolean(data?.body?.data?.AdminAccountStatus || "")}
                status={toSentenceCase(data?.body?.data?.AdminAccountStatus || "")}
              />

              <div className='flex flex-row justify-start items-center gap-0'>
                <p className='text-default-secondary text-sm md:text-base w-[100px]'>User Role:</p>
                <p className='text-default text-sm md:text-base'> {data?.body?.data?.AdminRole?.name || "-"} </p>
              </div>

              <div className='flex flex-row justify-start items-center gap-0'>
                <p className='text-default-secondary text-sm md:text-base w-[100px]'> Login ID:</p>
                <p className='text-brand text-sm md:text-base'> {data?.body?.data?.loginId || "-"} </p>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>

      <div className='flex flex-row gap-4 justify-start items-center mt-4 font-bold'>
        <Link href={"/profile/change-password"}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </Link>

        <Button
          variant={"secondary"}
          onClick={() => setOpen(true)}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>

      {
        open && (
          <LogoutDialog
            open={open}
            handleClose={() => setOpen(false)}
          />
        )
      }
    </div>

  )
}

export default Profile