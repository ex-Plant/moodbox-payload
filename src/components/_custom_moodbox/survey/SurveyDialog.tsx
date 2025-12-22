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

type PropsT = {
  surveyDialoOpen: boolean
  setSurveyDialogOpen: (open: boolean) => void
  discountCode: string
}
export default function SurveyDialog({
  setSurveyDialogOpen,
  surveyDialoOpen,
  discountCode,
}: PropsT) {
  return (
    <Dialog open={surveyDialoOpen} onOpenChange={setSurveyDialogOpen}>
      <DialogContent
        className={` min-h-[200px] w-fit flex items-center justify-center bg-white p-8 `}
      >
        <DialogHeader className={`hidden`}>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className={`flex flex-col items-center justify-center text-xl p-8`}>
          <p>{UI_MESSAGES.THANK_YOU_SURVEY}</p>
          <p>{UI_MESSAGES.YOUR_CODE_IS}</p>
          <p>{discountCode} </p>

          <Button className={`mt-8`} asChild variant="mood">
            <Link href="/">{UI_MESSAGES.GO_TO_MOODBOX}</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
