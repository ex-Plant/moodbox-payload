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
          <p>Dziękujemy za wypełnienie ankiety!</p>
          <p>Twój kod to: </p>
          <p>{discountCode} </p>

          <Button className={`mt-8`} asChild variant="mood">
            <Link href="/">Przejdź do moodbox</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
