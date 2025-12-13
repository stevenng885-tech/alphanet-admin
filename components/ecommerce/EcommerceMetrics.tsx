"use client";
import { useUsers } from "@/hooks/useUsers";
import { selectUsersByRange, selectUserslasteUpdateByRange } from "@/utils/shared/array";
import { AiFillInteraction } from "react-icons/ai";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import Badge from "../ui/badge/Badge";

const Grow = ({ percent }: { percent: number }) => {

  if (percent > 0) {
    return (
      <Badge color="success">
        <FaLongArrowAltUp />
        {percent.toFixed(2)}%
      </Badge>
    )
  }
  return (
    <Badge color="error">
      <FaLongArrowAltDown className="text-error-500" />
      {percent.toFixed(2)}%
    </Badge>
  )
}

export const EcommerceMetrics = () => {
  const { users } = useUsers()
  const currentTimeStamp = new Date().getTime()
  const oneDayMilisecond = (60 * 60 * 24) * 1000
  const excessTime = currentTimeStamp % oneDayMilisecond

  const usersInteractToDay = selectUserslasteUpdateByRange(users, {
    start: currentTimeStamp - excessTime,
    end: currentTimeStamp
  })
  const usersInteractYesterDay = selectUserslasteUpdateByRange(users, {
    start: currentTimeStamp - excessTime - oneDayMilisecond,
    end: currentTimeStamp - excessTime
  })

  const newUsersToDay = selectUsersByRange(users, {
    start: currentTimeStamp - excessTime,
    end: currentTimeStamp
  })

  const newUsersYesterday = selectUsersByRange(users, {
    start: currentTimeStamp - excessTime - oneDayMilisecond,
    end: currentTimeStamp - excessTime
  })

  const percentChange = (oldValue: number, newValue: number): number => {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
  };

  const newUserComparison = percentChange(usersInteractYesterDay.length, usersInteractToDay.length)
  const interactUserComparison = percentChange(newUsersYesterday.length, newUsersToDay.length)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FaUserGroup className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Tổng Khách Hàng
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {users.length}
            </h4>
          </div>
          <Grow percent={newUserComparison} />
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <AiFillInteraction className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Được Tương Tác Hôm Nay
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {usersInteractToDay.length}
            </h4>
          </div>
          <Grow percent={interactUserComparison} />
        </div>
      </div>
    </div>
  );
};
