import SurveyQ3 from './SurveyQ3'
import SurveyQ4 from './SurveyQ4'
import SurveyQ5 from './SurveyQ5'
import SurveyQ6 from './SurveyQ6'

type PropsT = {
  availableBrands: string[]
}

export default function SurveyStepTwo({ availableBrands }: PropsT) {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <SurveyQ3 />
      <SurveyQ4 />
      <SurveyQ5 />
      <SurveyQ6 availableBrands={availableBrands} />
    </div>
  )
}
