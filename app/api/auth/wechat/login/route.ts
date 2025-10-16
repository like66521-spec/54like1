import { NextResponse } from "next/server"

export async function POST() {
  try {
    // 微信OAuth配置
    const appId = process.env.WECHAT_APP_ID
    const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/wechat/callback`)
    const state = Math.random().toString(36).substring(7)

    // 构建微信授权URL
    const authUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=${state}#wechat_redirect`

    return NextResponse.json({ authUrl })
  } catch (error) {
    console.error("微信登录错误:", error)
    return NextResponse.json({ error: "登录失败" }, { status: 500 })
  }
}
