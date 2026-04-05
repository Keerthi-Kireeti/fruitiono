import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.error('GOOGLE_SCRIPT_URL is not set in environment variables');
      return NextResponse.json(
        { success: false, error: 'Script URL not configured' },
        { status: 500 }
      );
    }

    // Forward to Google Apps Script — includes transaction ID and screenshot
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: body.customerName,
        phone: body.phone,
        transactionId: body.transactionId,
        screenshot: body.screenshot, // base64 data URL
        items: body.items,
        orderType: body.orderType,
        subtotal: body.subtotal,
        deliveryCharge: body.deliveryCharge,
        grandTotal: body.grandTotal,
        timestamp: body.timestamp,
      }),
      redirect: 'follow',
    });

    const text = await response.text();
    try {
      const result = JSON.parse(text);
      return NextResponse.json(result);
    } catch {
      return NextResponse.json({ success: true, raw: text });
    }
  } catch (err) {
    console.error('Submit order error:', err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
