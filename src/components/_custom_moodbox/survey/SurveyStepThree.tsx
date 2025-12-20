import SurveyQ7 from './SurveyQ7'
import SurveyQ8 from './SurveyQ8'

export default function SurveyStepThree() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SurveyQ7 />
      <SurveyQ8 />
    </div>
  )
}
