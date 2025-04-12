import { Input, Spin, Steps, Table } from 'antd';

import { useState } from 'react';
import { useCurrentUser } from '../../redux/features/auth/authSlice';
import DashboardTitle from '../LayOuts/DashboardTitle';
import { useAppSelector } from '../../redux/hooks';
import { useGetOrdersQuery, useGetsingleorderQuery } from '../../redux/features/order/orderApi';




const MyOrders = () => {

    const user = useAppSelector(useCurrentUser);
    const [search , setSearch] = useState('')
    const { data: allOrders, isLoading: orderTableLoading } = useGetOrdersQuery({ email: user?.email ||"" });
    const { data: orderSingleData, isLoading: singleOrderLoading } = useGetsingleorderQuery({ email: user?.email||'' ,search:search});
    
 
  
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Product Name',
            dataIndex: 'productName',

        },
        {
            title: 'Order No.',
            dataIndex: 'orderId',
        },
    ];
    const { Search } = Input;
    const dataSource = allOrders?.data?.map((order: any, _: any) => ({
        key: `${order._id}`,
        name: `${order?.userInfo?.name}`,
        productName: `${order?.productName}`,
        orderId: `${order?.orderId}`,
    }));
    const handleSearch = (values:string)=>{
        setSearch(values)
    }
    return (
        <div className="p-4 space-y-5">
            <DashboardTitle title="Orders " />
            <div className='flex md:flex-row flex-col h-full gap-4 justify-center md:items-start'>
                <div className='md:w-1/2 min-h-64  flex justify-items-start md:h-full flex-col items-center space-y-5 bg-white p-4 rounded-md '>
                    <div className='text-xl font-bold text-black text-center py-2'>
                        Track Order
                    </div>
                    <div>
                        <Search onSearch={handleSearch} placeholder="Track order by Order no." enterButton="Search" size="middle"  />
                    </div>
                   {orderSingleData?.data?.productName && <><div className='shadow  bg-gray-100 w-full p-4 rounded-md  flex justify-center '>
                        <div >
                            <div>
                                <span className='font-medium text-gray-500 text-sm'>Product Name:</span>
                                <span className='text-xs text-gray-400'>{orderSingleData?.data?.productName}</span>
                            </div>
                            <div>
                                <span className='font-medium text-gray-500 text-sm'>Order id:</span>
                                <span className='text-xs text-gray-400'>{orderSingleData?.data?.orderId}</span>
                            </div>
                        </div>

                    </div>
                    <Spin spinning={singleOrderLoading}>
                        <Steps

                            direction="vertical"
                            current={orderSingleData?.data?.orderActiveTrack}
                            items={orderSingleData?.data?.orderTrack}
                        />
                    </Spin></> }
                </div>
                <div className='md:w-1/2 flex justify-items-start bg-white rounded-md flex-col items-center'>
                    <div className='text-xl font-bold text-black text-center py-4'>
                        Order History
                    </div>
                    <Spin spinning={orderTableLoading}>
                        <Table
                            className='w-full'
                            columns={columns}
                            dataSource={dataSource}
                            pagination={{
                                pageSize: 10,
                            }}

                        />
                    </Spin>
                </div>

            </div>
        </div>
    );
};

export default MyOrders;
