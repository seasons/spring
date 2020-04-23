import React, { useState } from "react"
import { Form } from "react-final-form"
import { WizardBottomNavBar } from "./WizardBottomNavBar"

export interface WizardProps {
  children: any
  initialValues?: Object
  onSubmit: (any) => void
}

export interface WizardContextProps {
  values: any
}

export const Wizard: React.FC<WizardProps> = ({ children, initialValues = {}, onSubmit }) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [values, setValues] = useState(initialValues)

  const next = vals => {
    setPageIndex(Math.min(pageIndex + 1, children.length - 1))
    setValues(vals)
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
    <Form initialValues={values} onSubmit={handleSubmit}>
      {({ handleSubmit, submitting, values: formValues, errors }) => {
        return (
          <form onSubmit={handleSubmit}>
            {activePage}
            <WizardBottomNavBar onPrevious={previous} isFirstPage={pageIndex === 0} isLastPage={isLastPage} />
          </form>
        )
      }}
    </Form>
  )
}
