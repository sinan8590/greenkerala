import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, date, pickup, destination } = await request.json();

    if (!name || !date || !pickup || !destination) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'muhammedsinanu8590@gmail.com',
        pass: process.env.EMAIL_PASS || 'ufqu rqgv byak ydgy',
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'muhammedsinanu8590@gmail.com',
      to: process.env.RECEIVER_EMAIL || 'muhammedsinanu8590@gmail.com',
      subject: `New Booking Request: ${name}`,
      text: `
        New Booking Request from Green Kerala Website:

        Name: ${name}
        Travel Date: ${date}
        Pickup Location: ${pickup}
        Destination: ${destination}

        Please contact the customer to confirm.
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Booking request sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send booking request. Please try again.' }, { status: 500 });
  }
}