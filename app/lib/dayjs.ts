import dayjs from "dayjs"
import "dayjs/locale/ja"
import relativeTime from "dayjs/plugin/relativeTime"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Tokyo")
dayjs.locale("ja")

/**
 * 日付を表す文字列を取得する
 * @param date 日時
 * @returns 日付 (YYYY年MM月DD日)
 */
export function getDateOnly(date: string | Date) {
  return dayjs(date).tz().format("YYYY年MM月DD日")
}

/**
 * 絶対日時を表す文字列を取得する
 * @param date 日時
 * @returns 絶対日時
 */
export function getAbsoluteDateTime(date: string | Date) {
  return dayjs(date).tz().format("YYYY年MM月DD日 HH時mm分ss秒")
}

/**
 * 相対日時を表す文字列を取得する
 * @param date 日時
 * @returns 相対日時
 */
export function getRelativeDateTime(date: string | Date) {
  return dayjs(date).tz().fromNow()
}

export default dayjs
