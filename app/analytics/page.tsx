"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, ShoppingCart, Users, DollarSign } from "lucide-react";
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart as RechartsLineChart,
} from "recharts";
import { useState } from "react";

interface RevenueData {
  name: string;
  revenue: number;
}

const Dashboard: React.FC = () => {
  const [data] = useState<RevenueData[]>([
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 7000 },
    { name: "May", revenue: 6000 },
  ]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <ShoppingCart className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">150</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Customers</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Users className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">80</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <DollarSign className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">$12,500</span>
        </CardContent>
      </Card>

      <Card className="col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
