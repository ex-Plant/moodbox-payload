import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Props } from '@payloadcms/ui/elements/CodeEditor'
import Link from 'next/link'
import { UI_MESSAGES } from './survey_constants'
import LogoMoodboxSvg from '../common/LogoMoodboxSvg'

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
  return (
    <Dialog open={surveyDialogOpen} onOpenChange={setSurveyDialogOpen}>
      <DialogContent className={` min-h-[200px] max-w-[600px] w-fit content-center bg-white p-8 `}>
        <DialogHeader>
          <DialogTitle>
            <div className={`flex justify-center pb-4 `}>
              <LogoMoodboxSvg />
            </div>
            <p className={`text-center mt-4 mb-8`}>{UI_MESSAGES.THANK_YOU_SURVEY}</p>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className={`flex flex-col items-center justify-center text-lg  gap-2`}>
          <p className={`text-center`}>{UI_MESSAGES.YOUR_CODE_IS}</p>
          <p className={`text-center`}>{discountCode} </p>
          <p className={`text-center`}>{UI_MESSAGES.SAME_CODE_IN_EMAIL}</p>

          <Button className={`mt-8`} asChild variant="mood">
            <Link href="/">{UI_MESSAGES.GO_TO_MOODBOX}</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
