import React from "react";
import { StatCard, RenderListItems } from "@features/shared";
import { BsPeople } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Button } from "@mantine/core";
import { useModal } from "@src/index";
import { useGetSchoolBankAccountsQuery } from "../services/api";
import { useAppSelector } from "@src/index";
import { bankLogoMap } from "../data/bankLogos";

import RegisterSchoolBankAccount from "../forms/RegisterSchoolBankAccount";

const statsData = [
  {
    id: 1,
    title: "Income",
    value: 0,
    description: "Completed invoice paid this session",
    icon: <BsPeople />,
  },
  {
    id: 2,
    title: "Bills",
    value: 0,
    description: "Invoice created",
    icon: <FaChalkboardTeacher />, // Icon for a teacher at a chalkboard
  },
];

const StatCards: React.FC = () => {
  const { showModal } = useModal();
  const schoolId = useAppSelector((state) => state?.school?.schoolId);
  const { data: accounts = [] } = schoolId
    ? useGetSchoolBankAccountsQuery({ schoolId })
    : { data: [] };

  const showAddSchoolBankAccountForm = () => {
    showModal(<RegisterSchoolBankAccount />, {});
  };

  // Prepare account data
  const accountList = Array(3)
    .fill(null)
    .map((_, index) => {
      const account = accounts[index];
      if (account) {
        return {
          label:
            account.main_account === true
              ? `${account.title} (Main Account)`
              : `${account.title}`,
          value: account.account_number || "-",
          logo: bankLogoMap[account.bank_code],
        };
      }
      return {
        label: `${index === 0 ? "Main Account" : `${index + 1}nd Account`}`,
        value: "-",
      };
    });

  return (
    <div className="bg-white p-2 rounded-lg grid md:grid-cols-3 gap-4">
      <RenderListItems
        data={statsData}
        renderItem={(item) => <StatCard {...item} key={item.id} />}
      />
      <div className="flex flex-col gap-2 justify-between rounded shadow p-3 bg-[var(--primary-lightest)]">
        <ul className="text-sm grid gap-1">
          {accountList.map((account, index) => (
            <li key={index} className="flex items-center justify-between">
              <p className="text-xs">{account.label}</p>
              <div className="flex items-center gap-2">
                {account.logo && (
                  <img src={account.logo} alt="logo" className="size-5" />
                )}
                <p>{account.value}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="xs"
            onClick={showAddSchoolBankAccountForm}
          >
            Add account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
