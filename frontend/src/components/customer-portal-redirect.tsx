"use client";

import { Loader2 } from "lucide-react";
import {useEffect, useRef} from "react";
import {authClient} from "~/lib/auth-client";
import {useRouter} from "next/navigation";

export default function CustomerPortalRedirect() {
  const hasRedirected = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (hasRedirected.current) {
      router.push("/");
      return;
    }

    const portal = async () => {
      hasRedirected.current = true;
      await authClient.customer.portal();
    };
    void portal();
  }, [router]);

  return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='flex items-center gap-2'>
          <Loader2 className='h-5 w-5 animate-spin'/>
          <span className='text-muted-foreground'>
            Loading customer portal...
          </span>
        </div>
      </div>
  );
}