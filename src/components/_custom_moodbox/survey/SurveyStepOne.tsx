import SurveyQ1 from './SurveyQ1'
import SurveyQ2 from './SurveyQ2'

type PropsT = {
  availableBrands: string[]
}

export default function SurveyStepOne({ availableBrands }: PropsT) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SurveyQ1 availableBrands={availableBrands} />
      <SurveyQ2 availableBrands={availableBrands} />
    </div>
  )
}
