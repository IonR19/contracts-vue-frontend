import moment from 'moment'
import nF from 'number-formatter'
export default class Contract {
  id
  contractName
  contractNumber
  company
  startDate
  endDate
  payment
  percentage
  extendedAmount
  createdAt
  updatedAt
  Receipts

  static Attributes = {
    id: {
      titleAr: 'id',
      titleEn: 'id',
      dbFieldName: 'id',
      render(val) {
        return !val ? '' : val
      },
    },
    contractName: {
      titleAr: 'اسم العقد',
      titleEn: 'Contract Name',
      dbFieldName: 'contractName',
      render(val) {
        return !val ? '' : val
      },
    },
    contractNumber: {
      titleAr: 'رقم العقد',
      titleEn: 'Contract Number',
      dbFieldName: 'contractNumber',
      render(val) {
        return !val ? '' : val
      },
    },
    company: {
      titleAr: 'الشركة المنفذة',
      titleEn: 'Company',
      dbFieldName: 'company',
      render(val) {
        return !val ? '' : val
      },
    },
    startDate: {
      titleAr: 'تاريخ البداية',
      titleEn: 'Start Date',
      dbFieldName: 'startDate',
      render(val) {
        return !val ? '' : moment(val).format('yyyy-MM-DD')
      },
    },
    endDate: {
      titleAr: 'تاريخ الانتهاء',
      titleEn: 'End Date',
      dbFieldName: 'endDate',
      render(val) {
        return !val ? '' : moment(val).format('yyyy-MM-DD')
      },
    },
    payment: {
      titleAr: 'القيمة المالية',
      titleEn: 'Payment',
      dbFieldName: 'payment',
      render(val) {
        return !val ? '' : nF('#,###.###', val)
      }, //nf percenrage
    },
    percentage: {
      titleAr: 'نسبة الانجاز',
      titleEn: 'Completed Percentage',
      dbFieldName: 'percentage',
      render(val) {
        return val === undefined || val === null ? '' : nF('0.#%', val * 100)
      },
    },
    extendedAmount: {
      titleAr: '?????',
      titleEn: 'Extended Amount',
      dbFieldName: 'extendedAmount',
      render(val) {
        return !val ? '' : val
      },
    },
    createdAt: {
      titleAr: 'تاريخ الانشاء',
      titleEn: 'Created At',
      dbFieldName: 'createdAt',
      render(val) {
        return !val ? '' : moment(val).format('yyyy-MM-dd')
      },
    },
    remainingDuration: {
      titleAr: 'الفترة المتبقية',
      titleEn: 'Remaining Time',
      dbFieldName: 'endDate',
      render(val) {
        return !val ? '' : moment(val, true, 'ar').fromNow(false)
      },
    },
    remainingPayment: {
      titleAr: 'القيمة المصروفة',
      titleEn: 'Total Expenses',
      dbFieldName: 'paymentRem',
      render(val) {
        return !val ? '0' : nF('#,###.###', val)
      },
    },
    updatedAt: {
      titleAr: 'اخر تحدث',
      titleEn: 'last update',
      dbFieldName: 'updatedAt',
      render(val) {
        return !val ? '' : moment(val).format('yyyy-MM-dd')
      },
    },
    Receipts: {
      titleAr: 'الفواتير',
      titleEn: 'Receipts',
      dbFieldName: 'Receipts',
      render(val) {
        return !val ? '' : val
      },
    },
    totalReceipts: {
      titleAr: 'عدد الفواتير',
      titleEN: '',
      dbFieldName: 'totalReceipts',
      render(val) {
        return val ?? ''
      },
    },
  }
}
