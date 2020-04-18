import React, { createContext, useContext, useState } from "react"
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

export const WizardContext = createContext<WizardContextProps>({ values: null })
export const useWizardContext = () => useContext(WizardContext)

export const Wizard: React.FC<WizardProps> = ({ children, initialValues = {}, onSubmit }) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [values, setValues] = useState(initialValues)

  const next = vals => {
    setPageIndex(Math.min(pageIndex + 1, children.length - 1))
    setValues(vals)
  }

  const previous = () => setPageIndex(Math.max(pageIndex - 1, 0))

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

  const wizardContextValues = { values }
  const activePage = React.Children.toArray(children)[pageIndex]
  const isLastPage = pageIndex === React.Children.count(children) - 1
  return (
    <Form initialValues={values} validate={validate} onSubmit={handleSubmit}>
      {({ handleSubmit, submitting, values: formValues }) => {
        return (
          <form onSubmit={handleSubmit}>
            <WizardContext.Provider value={wizardContextValues}>{activePage}</WizardContext.Provider>
            <WizardBottomNavBar onPrevious={previous} isFirstPage={pageIndex === 0} isLastPage={isLastPage} />
          </form>
        )
      }}
    </Form>
  )
}
