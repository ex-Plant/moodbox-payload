import BrandEvaluation from './BrandEvaluation'
import RejectedBrandReason from './RejectedBrandReason'
import ContactRequest from './ContactRequest'

type PropsT = {
  availableBrands: string[]
}

export default function SurveyStepTwo({ availableBrands }: PropsT) {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <BrandEvaluation />
      <RejectedBrandReason />
      <ContactRequest availableBrands={availableBrands} />
    </div>
  )
}

