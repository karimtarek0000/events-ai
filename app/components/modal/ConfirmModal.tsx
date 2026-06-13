'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { confirmModal } from '@/utils'
import { useEffect, useState } from 'react'

const ConfirmModal = () => {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const removeSubscribe = confirmModal.subscribe(status => setToggle(status))

    return () => {
      removeSubscribe()
    }
  }, [])

  return (
    <AlertDialog open={toggle}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want delete events?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undo, This will permanently delete your events from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setToggle(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmModal.fnForConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmModal
