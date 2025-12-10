"use client";
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Select from '../Select';
import DatePicker from '@/components/form/date-picker';
import { FaChevronDown, FaEye } from 'react-icons/fa';
import { LuEyeClosed } from 'react-icons/lu';
import { IoTime } from 'react-icons/io5';
import { useForm, SubmitHandler } from "react-hook-form"
type Inputs = {
  name: string
  phone: string
  email: string
  source: string
}

export default function DefaultInputs() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <ComponentCard title="Thêm Khách Mới">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <Label>Tên</Label>
            <Input
              type="text"
              {...register("name")}
            />
          </div>
          <div>
            <Label>Số Điện Thoại</Label>
            <Input
              type="text"
              {...register("phone")}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="text"
              {...register("email")}
            />
          </div>
          <div>
            <Label>Nguồn Khách</Label>
            <Input
              type="text"
              {...register("source")}
            />
          </div>
        </div>
      </form>
    </ComponentCard >
  );
}
