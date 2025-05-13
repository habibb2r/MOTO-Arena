
import { TeamOutlined, ShoppingCartOutlined, DollarCircleOutlined, InboxOutlined } from "@ant-design/icons";
import { Card, Statistic } from "antd";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import { useGetAllUserQuery } from "../../redux/features/auth/authApi";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
import DashboardTitle from '../LayOuts/DashboardTitle';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface User {
  isActive: boolean;
}

interface Product {
  quantity: number;
}

interface Order {
  status: string;
  price: number;
  createdAt: string;
}

const Overview = () => {
  const { data: usersData } = useGetAllUserQuery(undefined);
  const { data: productsData } = useGetAllProductsQuery({});
  const { data: ordersData } = useGetAllOrdersQuery(undefined);

  // Calculate statistics
  const activeUsers = usersData?.data?.filter((user: User) => user.isActive === true)?.length || 0;
  const totalUsers = usersData?.data?.length || 0;
  const inactiveUsers = totalUsers - activeUsers;

  const inStockProducts = productsData?.data?.filter((product: Product) => product.quantity > 0)?.length || 0;
  const totalProducts = productsData?.data?.length || 0;
  const outOfStockProducts = totalProducts - inStockProducts;

  const totalEarned = ordersData?.data?.reduce((acc: number, order: Order) => acc + order.price, 0) || 0;
  
  // Calculate monthly revenue data for the last 6 months
  const getMonthlyRevenueData = () => {
    const data = [];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      
      const monthlyOrders = ordersData?.data?.filter((order: Order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === date.getMonth() && 
               orderDate.getFullYear() === date.getFullYear();
      }) || [];
      
      const revenue = monthlyOrders.reduce((acc: number, order: Order) => acc + order.price, 0);
      
      data.push({
        month: `${month} ${year}`,
        revenue: revenue,
      });
    }
    
    return data;
  };

  const monthlyRevenueData = getMonthlyRevenueData();
  const currentMonthRevenue = monthlyRevenueData[monthlyRevenueData.length - 1]?.revenue || 0;

  return (
    <div className="p-6">
      <DashboardTitle title="Dashboard Overview" subtitle="Check out some of statistics" />
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        {/* Users Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <TeamOutlined className="text-2xl text-blue-600" />
            </div>
            <Statistic title="Total Users" value={totalUsers} className="text-right" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Active</div>
              <div className="font-semibold text-green-600">{activeUsers}</div>
            </div>
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <div className="text-sm text-gray-600">Inactive</div>
              <div className="font-semibold text-red-600">{inactiveUsers}</div>
            </div>
          </div>
        </Card>

        {/* Products Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <InboxOutlined className="text-2xl text-orange-600" />
            </div>
            <Statistic title="Total Products" value={totalProducts} className="text-right" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">In Stock</div>
              <div className="font-semibold text-green-600">{inStockProducts}</div>
            </div>
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <div className="text-sm text-gray-600">Out of Stock</div>
              <div className="font-semibold text-red-600">{outOfStockProducts}</div>
            </div>
          </div>
        </Card>

        {/* Orders Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <ShoppingCartOutlined className="text-2xl text-purple-600" />
            </div>
            <Statistic title="Total Orders" value={ordersData?.data?.length || 0} className="text-right" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-2 bg-indigo-50 rounded-lg">
              <div className="text-sm text-gray-600">Pending</div>
              <div className="font-semibold text-indigo-600">
                {ordersData?.data?.filter((order: Order) => order.status === "pending")?.length || 0}
              </div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Delivered</div>
              <div className="font-semibold text-green-600">
                {ordersData?.data?.filter((order: Order) => order.status === "delivered")?.length || 0}
              </div>
            </div>
          </div>
        </Card>

        {/* Revenue Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarCircleOutlined className="text-2xl text-green-600" />
            </div>
            <Statistic title="Total Revenue" value={totalEarned} prefix="$" precision={2} className="text-right" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">This Month's Revenue</div>
              <div className="font-semibold text-green-600">${currentMonthRevenue.toFixed(2)}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Revenue']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#10B981" 
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Overview;