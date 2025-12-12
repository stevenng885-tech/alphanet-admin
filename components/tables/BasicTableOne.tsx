"use client"
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FaUser } from "react-icons/fa";
import { firebaseFireStore } from "@/utils/shared/firebase";
import { TypeTimestamp } from "@/types/firebase";

type TypeOrder = {
  id: string,
  createdDate: TypeTimestamp,
  name: string,
  phone: string,
  email: string,
}

export default function BasicTableOne() {
  const [usersContact, setUserContact] = React.useState<Array<TypeOrder>>([])

  React.useEffect(() => {
    (async () => {
      try {
        const contactRef = collection(firebaseFireStore, "contacts")
        const queryContact = query(contactRef, orderBy("createdDate", "desc"))
        const querySnapshot = await getDocs(queryContact)
        if (!querySnapshot.empty) {
          const contacts = querySnapshot.docs.map((doc) => {
            return {
              ...doc.data() as TypeOrder,
              id: doc.id
            }
          });
          setUserContact(contacts)
        } else {
          console.log([])
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const getTime = (timeStamp: number) => {
    const time = new Date(timeStamp)
    return `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]" >
      <div className="max-w-full overflow-x-auto" >
        <div className="min-w-[1102px]" >
          <Table>
            {/* Table Header */}
            < TableHeader className="border-b border-gray-100 dark:border-white/[0.05]" >
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Ngày Đăng Ký
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tên
                </TableCell>
                < TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Số Điện Thọai
                </TableCell>
                < TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]" >
              {usersContact && usersContact.map((order: TypeOrder) => (
                <TableRow key={order.id} >
                  < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                    {getTime(order.createdDate)}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start" >
                    <div className="flex items-center gap-3" >
                      <div className="w-10 h-10 overflow-hidden rounded-full flex justify-center items-center" >
                        <FaUser
                          className="text-white"
                          width={40}
                          height={40}
                        />
                      </div>
                      < div >
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90" >
                          {order.name}
                        </span>
                        < span className="block text-gray-500 text-theme-xs dark:text-gray-400" >
                          Web Data
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                    {order.phone}
                  </TableCell>
                  < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                    {order.email}
                  </TableCell>

                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
