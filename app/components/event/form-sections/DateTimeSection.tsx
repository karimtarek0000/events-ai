'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { EventFormValues } from '@/validations/events.schema'
import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export function DateTimeSection() {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<EventFormValues>()

  const [startOpen, setStartOpen] = useState(false)
  const [endOpen, setEndOpen] = useState(false)

  const currentStartDate = watch('startDate')

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Date & Time</h3>

      <FieldGroup className="flex flex-row justify-between w-full">
        {/* Start */}
        <FieldGroup className="max-w-xs max-md:flex-wrap flex-row">
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <>
                <Field>
                  <FieldLabel>Start Date</FieldLabel>
                  <Popover open={startOpen} onOpenChange={setStartOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-32 justify-between font-normal">
                        {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={date => {
                          field.onChange(date)

                          // 2. Reset the endDate when startDate calendar changes
                          setValue('endDate', undefined as unknown as Date, {
                            shouldValidate: true,
                          })

                          setStartOpen(false)
                        }}
                        disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.startDate && (
                    <p className="text-sm text-destructive">{errors.startDate.message}</p>
                  )}
                </Field>

                <Field className="w-32">
                  <FieldLabel>Start Time</FieldLabel>
                  <Input
                    type="time"
                    step="1"
                    value={field.value ? format(field.value, 'HH:mm:ss') : ''}
                    onChange={e => {
                      const [h, m, s] = e.target.value.split(':').map(Number)
                      const d = field.value ? new Date(field.value) : new Date()
                      d.setHours(h, m, s ?? 0)
                      field.onChange(d)

                      // 3. Reset the endDate when startDate time changes
                      setValue('endDate', undefined as unknown as Date, {
                        shouldValidate: true,
                      })
                    }}
                    className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden"
                  />
                </Field>
              </>
            )}
          />
        </FieldGroup>

        {/* End */}
        <FieldGroup className="max-w-xs max-w-xs max-md:flex-wrap flex-row">
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <>
                <Field>
                  <FieldLabel>End Date</FieldLabel>
                  <Popover open={endOpen} onOpenChange={setEndOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-32 justify-between font-normal">
                        {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={date => {
                          field.onChange(date)
                          setEndOpen(false)
                        }}
                        disabled={date => {
                          const today = new Date(new Date().setHours(0, 0, 0, 0))
                          const minSelectableDate = currentStartDate
                            ? new Date(new Date(currentStartDate).setHours(0, 0, 0, 0))
                            : today

                          return date < minSelectableDate
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && (
                    <p className="text-sm text-destructive">{errors.endDate.message}</p>
                  )}
                </Field>

                <Field className="w-32">
                  <FieldLabel>End Time</FieldLabel>
                  <Input
                    type="time"
                    step="1"
                    value={field.value ? format(field.value, 'HH:mm:ss') : ''}
                    onChange={e => {
                      const [h, m, s] = e.target.value.split(':').map(Number)
                      const d = field.value ? new Date(field.value) : new Date()
                      d.setHours(h, m, s ?? 0)
                      field.onChange(d)
                    }}
                    className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden"
                  />
                </Field>
              </>
            )}
          />
        </FieldGroup>
      </FieldGroup>
    </div>
  )
}
