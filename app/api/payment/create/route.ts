import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { articleId, amount, method } = body

    // Validate input
    if (!articleId || !amount || !method) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (method !== "wechat" && method !== "alipay") {
      return NextResponse.json({ error: "Invalid payment method" }, { status: 400 })
    }

    // In a real application, this would:
    // 1. Create a payment record in the database
    // 2. Generate a QR code for WeChat/Alipay payment
    // 3. Return the payment URL or QR code data

    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Simulate payment creation
    const payment = {
      id: paymentId,
      articleId,
      amount,
      method,
      status: "pending",
      qrCodeUrl: method === "wechat" ? "/wechat-qr-placeholder.jpg" : "/alipay-qr-placeholder.jpg",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      payment,
    })
  } catch (error) {
    console.error("[v0] Payment creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
