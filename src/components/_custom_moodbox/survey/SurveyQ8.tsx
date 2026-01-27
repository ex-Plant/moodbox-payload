import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import SurveyQWrapper from './SurveyQWrapper'
import { useSurveyContent } from './SurveyContentProvider'

export default function SurveyQ8() {
  const form = useSurveyContext()
  const { questions, uiMessages } = useSurveyContent()

  return (
    <SurveyQWrapper>
      <SurveyQuestionHeader title={questions.q8.title} subtitle={questions.q8.subtitle} />
      <form.AppField name="improvement_suggestion">
        {(field) => <field.Textarea placeholder={uiMessages.formLabels.yourAnswerPlaceholder} />}
      </form.AppField>
    </SurveyQWrapper>
  )
}
