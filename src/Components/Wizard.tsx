import React, { useState } from "react"
import { Form } from "react-final-form"
import { WizardBottomNavBar } from "./WizardBottomNavBar"

export interface WizardProps {
  children: any
  initialValues?: Object
  onSubmit: (any) => void
}

export const Wizard: React.FC<WizardProps> = ({ children, initialValues = {}, onSubmit }) => {
  console.log("CHILDREN:", children)

  // static Page = ({ children }) => children
  const [pageIndex, setPageIndex] = useState(0)
  const [values, setValues] = useState(initialValues)
  const next = vals => {
    setPageIndex(Math.min(pageIndex + 1, children.length - 1))
    setValues(vals)
  }

  const previous = () => setPageIndex(Math.max(pageIndex - 1, 0))

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  const validate = values => {
    const activePage: any = React.Children.toArray(children)[pageIndex]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

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
    <Form initialValues={values} validate={validate} onSubmit={handleSubmit}>
      {({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          {activePage}
          <WizardBottomNavBar onPrevious={previous} isLastPage={isLastPage} />
        </form>
      )}
    </Form>
  )
}
