"use client";

import { Heading } from "@radix-ui/themes"
import { LoadingSmall } from "@/components/ui-lib";

export default function SetupPage(){
    return(
        <>
            <Heading mb="3">欢迎来到ChatGPT-Admin-Web安装向导</Heading>
            <div><LoadingSmall /></div>
        </>
    )
}