import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Link from 'next/link'
import LogoMoodboxSvg from '../common/LogoMoodboxSvg'
import { useSurveyContent } from './SurveyContentProvider'

type PropsT = {
  surveyDialogOpen: boolean
  setSurveyDialogOpen: (open: boolean) => void
  discountCode: string
}

export default function SurveyDialog({
  setSurveyDialogOpen,
  surveyDialogOpen,
  discountCode,
}: PropsT) {
  const { uiMessages } = useSurveyContent()
  const { dialog } = uiMessages

  return (
    <Dialog open={surveyDialogOpen} onOpenChange={setSurveyDialogOpen}>
      <DialogContent className={`min-h-[200px] max-w-[600px] w-fit content-center bg-white p-8 `}>
        <DialogHeader>
          <DialogTitle>
            <div className={`flex justify-center pb-4 `}>
              <LogoMoodboxSvg />
            </div>
            <p className={`text-center mt-4 mb-8`}>{dialog.thankYouSurvey}</p>
          </DialogTitle>
        </DialogHeader>
        <div className={`flex flex-col items-center justify-center text-lg  gap-2`}>
          <p className={`text-center`}>{dialog.yourCodeIs}</p>
          <p className={`text-center`}>{discountCode} </p>
          <p className={`text-center`}>{dialog.sameCodeInEmail}</p>

          <Button className={`mt-8`} asChild variant="mood">
            <Link href="/">{dialog.goToMoodbox}</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
