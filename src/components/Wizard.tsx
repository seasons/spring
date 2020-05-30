import React, { useState } from "react"
import { Form } from "react-final-form"
import { Mutator, MutableState } from "final-form"

import { ConfirmationDialog } from "components"
import { WizardBottomNavBar } from "./WizardBottomNavBar"

export interface WizardProps {
  children: any
  initialValues?: Object
  submitButtonTitle?: string
  onNext?: (values: any) => void
  onSubmit: (values: any) => void
}

export interface WizardContextProps {
  values: any
}

export const Wizard: React.FC<WizardProps> = ({
  children,
  initialValues = {},
  submitButtonTitle = "Submit",
  onNext,
  onSubmit,
}) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [values, setValues] = useState(initialValues)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const next = vals => {
    setPageIndex(Math.min(pageIndex + 1, children.length - 1))
    setValues(vals)
    onNext?.(vals)
  }

  const previous = () => setPageIndex(Math.max(pageIndex - 1, 0))

  const handleSubmit = values => {
    setValues(values)
    const isLastPage = pageIndex === React.Children.count(children) - 1
    if (isLastPage) {
      if (!isSubmitting) {
        // Prevent user from submitting multiple times
        setIsConfirmationDialogOpen(true)
      }
    } else {
      next(values)
    }
  }

  const onCloseConfirmationDialog = async (agreed: boolean) => {
    // Make sure user has confirmed submission
    if (!agreed) {
      return
    }
    // Show loading spinner
    setIsSubmitting(true)

    onSubmit(values)
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
