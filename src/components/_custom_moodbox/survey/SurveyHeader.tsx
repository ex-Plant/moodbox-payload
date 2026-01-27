import { useSurveyContent } from './SurveyContentProvider'

type SurveyHeaderPropsT = {
  currentStep: number
  customerName: string | undefined
}

export default function SurveyHeader({ currentStep, customerName }: SurveyHeaderPropsT) {
  const { uiMessages } = useSurveyContent()
  const { header } = uiMessages

  return (
    <div>
      {customerName && (
        <p className={`text-3xl font-bold pb-8`}>
          {header.welcomeMessage} {customerName}!
        </p>
      )}
      <h1 className="text-3xl font-bold mb-2">{header.surveyTitle}</h1>
      <p className="text-foreground">{header.surveyDescription}</p>
      <div className="mt-4 text-sm font-semibold uppercase tracking-wider text-mood-dark-brown">
        {header.stepLabel} {currentStep} {header.stepSeparator} {header.totalSteps}
      </div>
    </div>
  )
}
