import React, { useState } from "react"
import { Form } from "react-final-form"
import { Mutator } from "final-form"

import { ConfirmationDialog } from "components"
import { WizardBottomNavBar } from "./WizardBottomNavBar"

export interface WizardProps {
  children: any
  initialValues?: Object
  submitButtonTitle?: string
  submitting?: boolean

  // Returns boolean representing whether or not to continue
  onNext?: (values: any) => Promise<boolean>
  onSubmit: (values: any) => Promise<void>
}

export interface WizardContextProps {
  values: any
}

export const Wizard: React.FC<WizardProps> = ({
  children,
  initialValues = {},
  submitButtonTitle = "Submit",
  submitting = false,
  onNext,
  onSubmit,
}) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [values, setValues] = useState(initialValues)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(submitting)

  const next = async vals => {
    setValues(vals)
    const shouldGoNext = onNext ? await onNext?.(vals) : true
    if (shouldGoNext) {
      setPageIndex(Math.min(pageIndex + 1, children.length - 1))
    }
  }

  const previous = () => setPageIndex(Math.max(pageIndex - 1, 0))

  const handleSubmit = async values => {
    setValues(values)
    const isLastPage = pageIndex === React.Children.count(children) - 1
    if (isLastPage) {
      if (!isSubmitting) {
        // Prevent user from submitting multiple times
        setIsConfirmationDialogOpen(true)
      }
    } else {
      await next(values)
    }
  }

  const onCloseConfirmationDialog = async (agreed: boolean) => {
    // Make sure user has confirmed submission
    if (!agreed) {
      return
    }
    // Show loading spinner, submit, and then stop loading spinner
    setIsSubmitting(true)
    await onSubmit(values)
    setIsSubmitting(false)
  }

  const setValue: Mutator = ([name, newValue], state, { changeValue }) => {
    changeValue(state, name, value => newValue)
  }

  const activePage = React.Children.toArray(children)[pageIndex]
  const isLastPage = pageIndex === React.Children.count(children) - 1
  return (
    <Form
      initialValues={values}
      onSubmit={handleSubmit}
      subscription={{ submitting: true, pristine: true }}
      mutators={{ setValue }}
    >
      {({
        handleSubmit,
        form: {
          mutators: { setValue },
        },
        values: formValues,
        errors,
      }) => {
        console.log(formValues)
        return (
          <>
            <form onSubmit={handleSubmit}>
              {activePage}
              <WizardBottomNavBar
                submitButtonTitle={submitButtonTitle}
                onPrevious={previous}
                isFirstPage={pageIndex === 0}
                isLastPage={isLastPage}
                isSubmitting={isSubmitting}
              />
            </form>
            <ConfirmationDialog
              title="Are you sure you want to submit?"
              body="Make sure all the values provided are correct before submitting."
              open={isConfirmationDialogOpen}
              setOpen={setIsConfirmationDialogOpen}
              onClose={onCloseConfirmationDialog}
            />
          </>
        )
      }}
    </Form>
  )
}
