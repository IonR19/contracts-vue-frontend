import moment from 'moment'
import nF from 'number-formatter'
export default class Receipt {
  id
  createdAt
  updatedAt
  enterDate
  payment
  monthlySerial
  percentage
  static Attributes = {
    percentage: {
      titleAr: 'النسبة',
      titleEn: 'percentage',
      dbFieldName: 'percentage',
      render(val) {
        return !val ? '' : nF('0.00#%', val * 100)
      },
    },
    id: {
      titleAr: 'id',
      titleEn: 'id',
      dbFieldName: 'id',
      render(val) {
        return !val ? '' : val
      },
    },
    createdAt: {
      titleAr: 'createdAt',
      titleEn: 'createdAt',
      dbFieldName: 'createdAt',
      render(val) {
        return !val ? '' : moment(val).format('yyyy-MM-DD')
      },
    },
    updatedAt: {
      titleAr: 'اخر تحديث',
      titleEn: 'updatedAt',
      dbFieldName: 'updatedAt',
      render(val) {
        return !val ? '' : moment(val).format('yyyy-MM-DD')
      },
    },
    enterDate: {
      titleAr: 'تاريخ التسجيل',
      titleEn: 'enterDate',
      dbFieldName: 'enterDate',
      render(val) {
        return !val ? '' : moment(val).format('yyyy-MM-DD')
      },
    },
    payment: {
      titleAr: 'الدفعة',
      titleEn: 'payment',
      dbFieldName: 'payment',
      render(val) {
        return !val ? '' : nF('#,###.00#', val)
      },
    },
    monthlySerial: {
      titleAr: 'التسلسل',
      titleEn: 'monthlySerial',
      dbFieldName: 'monthlySerial',
      render(val) {
        return !val ? '' : val
      },
    },
  }
}
