import React from "react";
import { Tabs } from "@mantine/core";
import InvoiceTable from "./InvoiceTable";

const PaymentTabs: React.FC = () => {
  return (
    <div className="py-4  flex-1">
      <Tabs
        defaultValue="invoice"
        variant="pills"
        styles={{ tab: { fontSize: 12 } }}
      >
        <Tabs.List>
          <Tabs.Tab value="invoice" className="shadow">
            Invoice
          </Tabs.Tab>
          <Tabs.Tab value="messages" className="shadow">
            Bills
          </Tabs.Tab>
          <Tabs.Tab value="settings" className="shadow">
            Payments
          </Tabs.Tab>
          <Tabs.Tab value="setting" className="shadow">
            Account Summary
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="invoice">
          <InvoiceTable />
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <p>Others</p>
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          <p>Others</p>
        </Tabs.Panel>

        <Tabs.Panel value="setting">
          <p>Others</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default PaymentTabs;
