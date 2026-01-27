import { useSurveyContext } from '@/lib/hooks/tenStackFormHooks'
import SurveyQuestionHeader from './SurveyQuestionHeader'
import SurveyQWrapper from './SurveyQWrapper'
import { useSurveyContent } from './SurveyContentProvider'

export default function SurveyQ7() {
  const form = useSurveyContext()
  const { questions, uiMessages } = useSurveyContent()

  return (
    <SurveyQWrapper>
      <SurveyQuestionHeader title={questions.q7.title} subtitle={questions.q7.subtitle} />
      <form.AppField name="missing_brands">
        {(field) => <field.Textarea placeholder={uiMessages.formLabels.yourAnswerPlaceholder} />}
      </form.AppField>
    </SurveyQWrapper>
  )
}
