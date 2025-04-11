import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";
import React, { FormEvent, useEffect } from "react";
import { TLogUser } from "../../redux/features/auth/authSlice";
import { useOrderMutation } from "../../redux/features/order/orderApi";

export interface TProductOrder {
    productName: string;
    productId: number;
    price: number;
    quantity: number;
    userInfo:TLogUser
}

interface TCheckOutFormProps {
    productName: string;
    productId: number;
    price: number;
    quantity: number;
    setOpenOnSeccess: (value: boolean) => void;
    setOpenFailed: (value: boolean) => void;
    setOpenResponsive: (value: boolean) => void;
    refetch: () => void; 
}

const CheckoutForm: React.FC<TCheckOutFormProps> = ({ 
    productName,
    productId, 
    price, 
    quantity,
    setOpenFailed,
    setOpenOnSeccess,
    setOpenResponsive,
    refetch
}) => {
    const stripe = useStripe();
    const user = useAppSelector((state) => state.auth.user);
    const elements = useElements();
    const [createOrder, { isLoading, error }] = useOrderMutation();
    
    useEffect(() => {
        if(error) {
          
            setOpenResponsive(false);
            setOpenFailed(true);
        }
    }, [error]);
  
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
         
        if (!stripe || !elements) {
            return toast.error('Please provide valid data');
        }

        if(!user) {
            setOpenResponsive(false);
            setOpenFailed(true);
            return toast.error("Please log in ");
        }

        const payDoc: TProductOrder = {
            productName,
            productId,
            price,
            quantity,
            userInfo: user
        };

        try {
            const res = await createOrder(payDoc);
            const clientSecret = res?.data?.data?.client_secret;
            
            if (!clientSecret) {
                setOpenResponsive(false);
                setOpenFailed(true);
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement)! },
            });

            if (result.error) {
                setOpenResponsive(false);
                setOpenFailed(true);
                console.error(result.error.message);
            } else {
                setOpenResponsive(false);
                setOpenOnSeccess(true);
            }
        } catch (err) {
            setOpenResponsive(false);
            setOpenFailed(true);
            console.error(err);
            refetch()
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="p-2 border rounded-md" />
            <button 
                type="submit" 
                disabled={isLoading} 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
                {isLoading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

export default CheckoutForm;
