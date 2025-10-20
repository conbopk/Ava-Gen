"use client";

import {Button} from "~/components/ui/button";
import {authClient} from "~/lib/auth-client";
import {env} from "~/env";

export default function Upgrade() {
  const upgrade = async () => {
    await authClient.checkout({
      products: [
          env.NEXT_PUBLIC_SMALL_CREDIT_PACK_ID,
          env.NEXT_PUBLIC_MEDIUM_CREDIT_PACK_ID,
          env.NEXT_PUBLIC_LARGE_CREDIT_PACK_ID,
      ],
    });
  };

  return (
      <Button
        variant='outline'
        size='sm'
        className='ml-2 text-purple-600'
        onClick={upgrade}
      >
        Upgrade
      </Button>
  );
}