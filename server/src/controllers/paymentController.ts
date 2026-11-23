import {type Request, type Response } from 'express';
import axios from 'axios';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const CLIENT_URL = process.env.CLIENT_URL;

// 1. Initialize Payment
export const initializePayment = async (req: Request, res: Response) => {
  try {
    const { email, amount, reference } = req.body;

    // Paystack requires amount in kobo (multiply Naira by 100)
    // If using USD, ensure your Paystack account supports it, otherwise convert.
    const amountInKobo = Math.round(amount * 100); 

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amountInKobo,
        reference,
        callback_url: `${CLIENT_URL}/checkout/success`,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error: any) {
    console.error('Paystack Initialization Error:', error.response?.data || error.message);
    res.status(500).json({ 
      status: false, 
      message: 'Failed to initialize payment' 
    });
  }
};

// 2. Verify Payment (CRITICAL FOR ASSIGNMENT)
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    );

    const { data } = response.data;

    if (data.status === 'success') {
      // In a real app, you would update your database order status here.
      res.json({ 
        status: true, 
        message: 'Payment verified successfully',
        data: {
          reference: data.reference,
          amount: data.amount / 100,
          email: data.customer.email,
        }
      });
    } else {
      res.status(400).json({ status: false, message: 'Payment was not successful' });
    }
  } catch (error: any) {
    console.error('Paystack Verification Error:', error.response?.data || error.message);
    res.status(500).json({ status: false, message: 'Verification failed' });
  }
};