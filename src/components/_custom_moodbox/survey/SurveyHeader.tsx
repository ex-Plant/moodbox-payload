import { UI_MESSAGES } from './survey_constants'

type SurveyHeaderProps = {
  currentStep: number
  customerName: string | undefined
}

export default function SurveyHeader({ currentStep, customerName }: SurveyHeaderProps) {
  return (
    <div>
      {customerName && (
        <p className={`text-3xl font-bold pb-8`}>
          {UI_MESSAGES.WELCOME_MESSAGE} {customerName}!
        </p>
      )}
      <h1 className="text-3xl font-bold mb-2">{UI_MESSAGES.SURVEY_TITLE}</h1>
      <p className="text-foreground">{UI_MESSAGES.SURVEY_DESCRIPTION}</p>
      <div className="mt-4 text-sm font-semibold uppercase tracking-wider text-mood-dark-brown">
        {UI_MESSAGES.STEP_LABEL} {currentStep} {UI_MESSAGES.STEP_SEPARATOR}{' '}
        {UI_MESSAGES.TOTAL_STEPS}
      </div>
    </div>
  )
}
