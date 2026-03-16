"use client"

import * as React from "react"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const Form = FormProvider

const FormFieldContext = React.createContext<{ name: string }>({ name: "" })

// THIS IS THE FIXED COMPONENT
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  )
)
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label ref={ref} className={cn(className)} {...props} />
))
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => <div ref={ref} {...props} />
)
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { formState } = useFormContext()
    const { name } = React.useContext(FormFieldContext)
    const error = formState.errors[name]
    const body = error ? String(error?.message) : children

    if (!body) return null

    return (
      <p ref={ref} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}
      </p>
    )
  }
)
FormMessage.displayName = "FormMessage"

export { Form, FormItem, FormLabel, FormControl, FormMessage, FormField }





// "use client"

// import * as React from "react"
// import * as LabelPrimitive from "@radix-ui/react-label"
// import {
//   Controller,
//   FormProvider,
//   useFormContext,
// } from "react-hook-form"

// import { cn } from "@/lib/utils"

// const Form = FormProvider

// type FormFieldContextValue<
//   TFieldValues = any,
//   TName extends string = string
// > = {
//   name: TName
// }

// const FormFieldContext = React.createContext<FormFieldContextValue>(
//   {} as FormFieldContextValue
// )

// function FormField({
//   ...props
// }: React.ComponentProps<typeof Controller>) {
//   return (
//     <FormFieldContext.Provider value={{ name: props.name as string }}>
//       <Controller {...props} />
//     </FormFieldContext.Provider>
//   )
// }

// type FormItemContextValue = {
//   id: string
// }

// const FormItemContext = React.createContext<FormItemContextValue>(
//   {} as FormItemContextValue
// )

// function FormItem({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   const id = React.useId()
//   return (
//     <FormItemContext.Provider value={{ id }}>
//       <div className={cn("space-y-2", className)} {...props} />
//     </FormItemContext.Provider>
//   )
// }

// function useFormField() {
//   const fieldContext = React.useContext(FormFieldContext)
//   const itemContext = React.useContext(FormItemContext)
//   const { getFieldState, formState } = useFormContext()

//   if (!fieldContext) {
//     throw new Error("useFormField should be used within <FormField>")
//   }

//   const fieldState = getFieldState(fieldContext.name, formState)
//   const { id } = itemContext

//   return {
//     id,
//     name: fieldContext.name,
//     formItemId: `${id}-form-item`,
//     formDescriptionId: `${id}-form-item-description`,
//     formMessageId: `${id}-form-item-message`,
//     ...fieldState,
//   }
// }

// function FormLabel({
//   className,
//   ...props
// }: React.ComponentProps<typeof LabelPrimitive.Root>) {
//   const { error, formItemId } = useFormField()
//   return (
//     <LabelPrimitive.Root
//       className={cn(error && "text-destructive", className)}
//       htmlFor={formItemId}
//       {...props}
//     />
//   )
// }

// function FormControl({ ...props }: React.ComponentProps<"div">) {
//   const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
//   return (
//     <div
//       id={formItemId}
//       aria-describedby={
//         !error
//           ? `${formDescriptionId}`
//           : `${formDescriptionId} ${formMessageId}`
//       }
//       aria-invalid={!!error}
//       {...props}
//     />
//   )
// }

// function FormDescription({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLParagraphElement>) {
//   const { formDescriptionId } = useFormField()
//   return (
//     <p
//       id={formDescriptionId}
//       className={cn("text-sm text-muted-foreground", className)}
//       {...props}
//     />
//   )
// }

// function FormMessage({
//   className,
//   children,
//   ...props
// }: React.HTMLAttributes<HTMLParagraphElement>) {
//   const { error, formMessageId } = useFormField()
//   const body = error ? String(error?.message) : children

//   if (!body) return null

//   return (
//     <p
//       id={formMessageId}
//       className={cn("text-sm font-medium text-destructive", className)}
//       {...props}
//     >
//       {body}
//     </p>
//   )
// }

// export {
//   Form,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
//   FormMessage,
//   FormField,
// }
