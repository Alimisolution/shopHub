import {type Request, type Response } from 'express';
import axios from 'axios';

export const initializePayment = async (req: Request, res: Response) => {
  // ✅ Read the key INSIDE the function — by this time, dotenv has already run
  const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY?.trim();

  if (!SECRET_KEY) {
    console.error('❌ PAYSTACK_SECRET_KEY is missing! Check server/.env');
    return res.status(500).json({ status: false, message: 'Server misconfigured' });
  }

  try {
    const { email, amount, reference } = req.body;
    const amountInKobo = Math.round(amount * 100);

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amountInKobo,
        reference,
        callback_url: 'http://localhost:5173/checkout/success',
      },
      {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error: any) {
    console.error('Initialization Error:', error.response?.data || error.message);
    res.status(500).json({ status: false, message: 'Failed to initialize payment' });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  // ✅ Read the key INSIDE the function
  const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY?.trim();

  if (!SECRET_KEY) {
    console.error('❌ PAYSTACK_SECRET_KEY is missing! Check server/.env');
    return res.status(500).json({ status: false, message: 'Server misconfigured' });
  }

  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      }
    );

    const { data } = response.data;

    if (data.status === 'success') {
      res.json({
        status: true,
        message: 'Payment verified successfully',
        data: data,
      });
    } else {
      res.status(400).json({ status: false, message: 'Payment was not successful' });
    }
  } catch (error: any) {
    console.error('Paystack Verification Error:', error.response?.data || error.message);
    res.status(500).json({ status: false, message: 'Verification failed' });
  }
};