import React, { useState } from "react"
import { Form } from "react-final-form"
import { WizardBottomNavBar } from "./WizardBottomNavBar"

export interface WizardProps {
  children: any
  isSubmitting?: boolean
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
  isSubmitting = false,
  initialValues = {},
  submitButtonTitle = "Submit",
  onNext,
  onSubmit,
}) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [values, setValues] = useState(initialValues)

  const next = vals => {
    setPageIndex(Math.min(pageIndex + 1, children.length - 1))
    setValues(vals)
    onNext?.(vals)
  }

  const previous = () => setPageIndex(Math.max(pageIndex - 1, 0))

  const handleSubmit = values => {
    const isLastPage = pageIndex === React.Children.count(children) - 1
    if (isLastPage) {
      return onSubmit(values)
    } else {
      next(values)
    }
  }

  const activePage = React.Children.toArray(children)[pageIndex]
  const isLastPage = pageIndex === React.Children.count(children) - 1
  return (
    <Form initialValues={values} onSubmit={handleSubmit} subscription={{ submitting: true, pristine: true }}>
      {({ handleSubmit, values: formValues, errors }) => {
        return (
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
        )
      }}
    </Form>
  )
}
