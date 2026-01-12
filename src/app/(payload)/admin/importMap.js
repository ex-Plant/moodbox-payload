import { RscEntryLexicalCell as RscEntryLexicalCell_44fe37237e0ebf4470c9990d8cb7b07e } from '@payloadcms/richtext-lexical/rsc'
import { RscEntryLexicalField as RscEntryLexicalField_44fe37237e0ebf4470c9990d8cb7b07e } from '@payloadcms/richtext-lexical/rsc'
import { LexicalDiffComponent as LexicalDiffComponent_44fe37237e0ebf4470c9990d8cb7b07e } from '@payloadcms/richtext-lexical/rsc'
import { InlineToolbarFeatureClient as InlineToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { FixedToolbarFeatureClient as FixedToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { HeadingFeatureClient as HeadingFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { ParagraphFeatureClient as ParagraphFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { UnderlineFeatureClient as UnderlineFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { BoldFeatureClient as BoldFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { ItalicFeatureClient as ItalicFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { LinkFeatureClient as LinkFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { AlignFeatureClient as AlignFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { OverviewComponent as OverviewComponent_a8a977ebc872c5d5ea7ee689724c0860 } from '@payloadcms/plugin-seo/client'
import { MetaTitleComponent as MetaTitleComponent_a8a977ebc872c5d5ea7ee689724c0860 } from '@payloadcms/plugin-seo/client'
import { MetaImageComponent as MetaImageComponent_a8a977ebc872c5d5ea7ee689724c0860 } from '@payloadcms/plugin-seo/client'
import { MetaDescriptionComponent as MetaDescriptionComponent_a8a977ebc872c5d5ea7ee689724c0860 } from '@payloadcms/plugin-seo/client'
import { PreviewComponent as PreviewComponent_a8a977ebc872c5d5ea7ee689724c0860 } from '@payloadcms/plugin-seo/client'
import { SlugField as SlugField_3817bf644402e67bfe6577f60ef982de } from '@payloadcms/ui'
import { FolderTableCell as FolderTableCell_ab83ff7e88da8d3530831f296ec4756a } from '@payloadcms/ui/rsc'
import { FolderField as FolderField_ab83ff7e88da8d3530831f296ec4756a } from '@payloadcms/ui/rsc'
import { default as default_88d798bacc10e8afea43d170a96dfd12 } from '@/components/ExportCSV'
import { default as default_b2021dcc86319005b7460af4147f9795 } from '@/components/OrderLinkCell'
import { default as default_25fbd7e6c04c81a4651c82b23f2d2b8b } from '@/components/TriggerSendingScheduledEmails'
import { default as default_bc731314ef959acc737b594781404a73 } from '@/components/BooleanCell'
import { default as default_e700f4df825d9111186b12e60c4d1658 } from '@/components/ListCell'
import { default as default_877e155e2d6063e5f6db43d4a226e851 } from '@/components/RejectionSummaryCell'
import { default as default_aeb3e0b6e719066a300db88da56fc726 } from '@/components/BrandEvaluationsCell'
import { default as default_31a76da9e20b857278649dec3d26e5ff } from '@/components/LongTextCell'
import { FolderTypeField as FolderTypeField_3817bf644402e67bfe6577f60ef982de } from '@payloadcms/ui'
import { RowLabel as RowLabel_ec255a65fa6fa8d1faeb09cf35284224 } from '@/Header/RowLabel'
import { RowLabel as RowLabel_1f6ff6ff633e3695d348f4f3c58f1466 } from '@/Footer/RowLabel'
import { VercelBlobClientUploadHandler as VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e } from '@payloadcms/storage-vercel-blob/client'

export const importMap = {
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalCell": RscEntryLexicalCell_44fe37237e0ebf4470c9990d8cb7b07e,
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalField": RscEntryLexicalField_44fe37237e0ebf4470c9990d8cb7b07e,
  "@payloadcms/richtext-lexical/rsc#LexicalDiffComponent": LexicalDiffComponent_44fe37237e0ebf4470c9990d8cb7b07e,
  "@payloadcms/richtext-lexical/client#InlineToolbarFeatureClient": InlineToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#FixedToolbarFeatureClient": FixedToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#HeadingFeatureClient": HeadingFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#ParagraphFeatureClient": ParagraphFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#UnderlineFeatureClient": UnderlineFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#BoldFeatureClient": BoldFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#ItalicFeatureClient": ItalicFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#LinkFeatureClient": LinkFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#AlignFeatureClient": AlignFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/plugin-seo/client#OverviewComponent": OverviewComponent_a8a977ebc872c5d5ea7ee689724c0860,
  "@payloadcms/plugin-seo/client#MetaTitleComponent": MetaTitleComponent_a8a977ebc872c5d5ea7ee689724c0860,
  "@payloadcms/plugin-seo/client#MetaImageComponent": MetaImageComponent_a8a977ebc872c5d5ea7ee689724c0860,
  "@payloadcms/plugin-seo/client#MetaDescriptionComponent": MetaDescriptionComponent_a8a977ebc872c5d5ea7ee689724c0860,
  "@payloadcms/plugin-seo/client#PreviewComponent": PreviewComponent_a8a977ebc872c5d5ea7ee689724c0860,
  "@payloadcms/ui#SlugField": SlugField_3817bf644402e67bfe6577f60ef982de,
  "@payloadcms/ui/rsc#FolderTableCell": FolderTableCell_ab83ff7e88da8d3530831f296ec4756a,
  "@payloadcms/ui/rsc#FolderField": FolderField_ab83ff7e88da8d3530831f296ec4756a,
  "@/components/ExportCSV#default": default_88d798bacc10e8afea43d170a96dfd12,
  "@/components/OrderLinkCell#default": default_b2021dcc86319005b7460af4147f9795,
  "@/components/TriggerSendingScheduledEmails#default": default_25fbd7e6c04c81a4651c82b23f2d2b8b,
  "@/components/BooleanCell#default": default_bc731314ef959acc737b594781404a73,
  "@/components/ListCell#default": default_e700f4df825d9111186b12e60c4d1658,
  "@/components/RejectionSummaryCell#default": default_877e155e2d6063e5f6db43d4a226e851,
  "@/components/BrandEvaluationsCell#default": default_aeb3e0b6e719066a300db88da56fc726,
  "@/components/LongTextCell#default": default_31a76da9e20b857278649dec3d26e5ff,
  "@payloadcms/ui#FolderTypeField": FolderTypeField_3817bf644402e67bfe6577f60ef982de,
  "@/Header/RowLabel#RowLabel": RowLabel_ec255a65fa6fa8d1faeb09cf35284224,
  "@/Footer/RowLabel#RowLabel": RowLabel_1f6ff6ff633e3695d348f4f3c58f1466,
  "@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler": VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e
}
