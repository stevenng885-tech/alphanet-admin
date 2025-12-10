import React from 'react'
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import SecondTable from '@/components/tables/SecondTable';
import AddNewContact from '@/components/dialog/AddNewContact';

export const metadata: Metadata = {
    title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
    description:
        "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};
const Home = () => {
    return (
        <div>
            <PageBreadcrumb pageTitle="Users" />

            <div className="space-y-6">
                <ComponentCard title="Quản Lý Khách Hàng" button={<AddNewContact />}>
                    <SecondTable />
                </ComponentCard>
            </div>
        </div>
    );
}

export default Home