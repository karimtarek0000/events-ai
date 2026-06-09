'use client'

import { useStoreUserEffect } from '@/hooks/userStore'
import { BarLoader } from 'react-spinners'

const LoadingBarAuth = () => {
  const { isLoading } = useStoreUserEffect()

  return (
    <div className="absolute bottom-0 left-0 right-0 w-full">
      {isLoading ? (
        <BarLoader
          color="#22c55e"
          height={3}
          width={1000}
          cssOverride={{ width: '100%', display: 'block' }}
        />
      ) : null}
    </div>
  )
}

export default LoadingBarAuth
